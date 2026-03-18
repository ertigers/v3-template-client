import { ElNotification, ElMessage } from "element-plus";
import { useUserStore } from "@/stores/modules/user";
import { $t } from "@/plugins/i18n";

/**
 * @description 接收数据流生成 blob，创建链接，下载文件
 * @param {Function} api 导出表格的api方法 (必传)
 * @param {String} tempName 导出的文件名 (必传)
 * @param {Object} params 导出的参数 (默认{})
 * @param {Boolean} isNotify 是否有导出消息提示 (默认为 true)
 * @param {String} fileType 导出的文件格式 (默认为.xlsx)
 * */
export const useDownload = async (api, tempName, params = {}, isNotify = false, fileType = ".xlsx") => {
  if (isNotify) {
    ElNotification({
      title: $t("global.notifyTitle"),
      message: $t("hooks.waitMessage"),
      type: "info",
      duration: 3000
    });
  }
  try {
    if (typeof api === "function") {
      const res = await api(params);
      const blob = new Blob([res]);
      // 兼容 edge 不支持 createObjectURL 方法
      if ("msSaveOrOpenBlob" in navigator) return window.navigator.msSaveOrOpenBlob(blob, tempName + fileType);
      const blobUrl = window.URL.createObjectURL(blob);
      const exportFile = document.createElement("a");
      exportFile.style.display = "none";
      if (tempName) {
        exportFile.download = `${tempName}${fileType}`;
      }
      exportFile.href = blobUrl;
      document.body.appendChild(exportFile);
      exportFile.click();
      // 去除下载对 url 的影响
      document.body.removeChild(exportFile);
      window.URL.revokeObjectURL(blobUrl);
    } else {
      const a = document.createElement("a");
      a.style.display = "none";
      // 在pina中取到token
      const userStore = useUserStore();

      params.token = userStore.token;
      if (params && JSON.stringify(params) !== "{}") {
        // 把params 转换为 url 参数
        const urlParams = new URLSearchParams(params);
        api = `${api}?${urlParams.toString()}`;
      }
      a.href = api;
      if (tempName) {
        a.download = `${tempName}${fileType}`; // 设置下载的文件名
      }
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description 接收数据流生成 blob，创建链接，下载文件
 * @param {Function} api 导出表格的api方法 (必传)
 * @param {String} tempName 导出的文件名 (必传)
 * @param {Object} params 导出的参数 (默认{})
 * @param {Boolean} isNotify 是否有导出消息提示 (默认为 true)
 * @param {String} fileType 导出的文件格式 (默认为.xlsx)
 * */
export const useDownloadFile = async (url, tempName = "fileName", params = {}) => {
  try {
    const a = document.createElement("a");
    a.style.display = "none";
    if (params && JSON.stringify(params) !== "{}") {
      const urlParams = new URLSearchParams(params);
      url = `${url}?${urlParams.toString()}`;
    }
    console.log(url);
    a.href = url;
    a.download = `${tempName}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.log(error);
  }
};
