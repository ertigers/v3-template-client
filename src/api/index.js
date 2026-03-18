import axios from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/components/Loading/fullScreen";
import { LOGIN_URL } from "@/config";
import { ElMessage } from "element-plus";
import { checkStatus } from "./helper/checkStatus";
import { AxiosCanceler } from "./helper/axiosCancel";
import { useUserStore } from "@/stores/modules/user";
import { getBrowserLang } from "@/utils";
import { useGlobalStore } from "@/stores/modules/global";
import router from "@/routers";
import { $t } from "@/plugins/i18n";

const config = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL,
  // 设置超时时间
  timeout: 30000,
  // 跨域时候允许携带凭证
  withCredentials: true
};

const axiosCanceler = new AxiosCanceler();

class RequestHttp {
  constructor(config) {
    // instantiation
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      config => {
        const userStore = useUserStore();
        const globalStore = useGlobalStore();

        // 重复请求不需要取消，在 api 服务中通过指定的第三个参数: { cancel: false } 来控制
        config.cancel = config.cancel === undefined ? true : config.cancel;
        config.cancel && axiosCanceler.addPending(config);
        // 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: { loading: false } 来控制
        config.loading = config.loading === undefined ? true : config.loading;
        config.loading && showFullScreenLoading();
        if (config.headers && typeof config.headers.set === "function") {
          config.headers.set("Authorization", "Bearer " + userStore.token);
          config.headers.set("Accept-Language", globalStore.language);

          // 附带时区的差值
          const offsetMin = new Date().getTimezoneOffset(); // 负数表示东区，正数表示西区
          config.headers.set("Utc-Number", -offsetMin);
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      response => {
        const { data, config } = response;

        const userStore = useUserStore();
        axiosCanceler.removePending(config);
        config.loading && tryHideFullScreenLoading();
        // 登录失效
        if (["401", "4", 401, 4].includes(data.code)) {
          userStore.setToken("");
          router.replace(LOGIN_URL);
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        if (data.code && data.code != 200) {
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data;
      },
      async error => {
        const { response } = error;
        tryHideFullScreenLoading();
        // 请求超时 && 网络错误单独判断，没有 response
        if (error.message.indexOf("timeout") !== -1) ElMessage.error($t("routers.timeout"));
        if (error.message.indexOf("Network Error") !== -1) ElMessage.error($t("routers.NetworkError"));
        // 根据服务器响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status);
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) router.replace("/500");
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description 常用请求方法封装
   */
  get(url, params, _object = {}) {
    return this.service.get(url, { params, ..._object });
  }
  post(url, params, _object = {}) {
    return this.service.post(url, params, _object);
  }
  put(url, params, _object = {}) {
    return this.service.put(url, params, _object);
  }
  delete(url, params, _object = {}) {
    return this.service.delete(url, { params, ..._object });
  }
  download(url, params, _object = {}) {
    return this.service.post(url, params, { ..._object, responseType: "blob" });
  }
  /**
   * @description 上传文件
   * @param {String} url 上传地址
   * @param {File} file 要上传的文件
   * @param {Object} params 额外的参数
   * @param {Function} onProgress 上传进度回调
   * @returns {Promise} 返回上传结果的 Promise
   */
  upload(url, file, params = {}, onProgress) {
    if (!file) return Promise.reject($t("routers.NoneFile"));

    const formData = new FormData();
    formData.append("file", file);

    // 添加其他参数到 formData
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });

    return this.service.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: onProgress
        ? e => {
            if (e.total > 0) {
              const percent = Math.floor((e.loaded / e.total) * 100);
              onProgress(percent, e);
            }
          }
        : undefined
    });
  }
}

export default new RequestHttp(config);
