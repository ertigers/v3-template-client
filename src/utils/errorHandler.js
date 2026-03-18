import { ElNotification } from "element-plus";
import { t } from "@/plugins/i18n.js";

/**
 * @description 全局代码错误捕捉
 * */
const errorHandler = error => {
  console.log({ error });
  // 过滤 HTTP 请求错误
  if (error.status || error.status === 0) return false;

  // 使用国际化的错误消息
  let errorName = error.name ? t(`hooks.errorHandler.${error.name}`) : t("hooks.errorHandler.undefined");

  ElNotification({
    title: errorName,
    message: error.msg,
    type: "error",
    duration: 3000
  });
};

export default errorHandler;
