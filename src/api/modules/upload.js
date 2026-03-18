import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 文件上传模块
 */
// 图片上传
export const uploadImg = params => {
  return http.post(PORT2 + `/common/upload-file`, params, { cancel: false });
};

// 视频上传
export const uploadVideo = params => {
  return http.post(PORT2 + `/common/upload-file`, params, { cancel: false });
};

// 图片预览地址url
export const getImageUrl = (file_id, storeName = "") => {
  return `${import.meta.env.VITE_API_URL}${PORT2}/common/image/${file_id}?store=${storeName}`;
};

// 图片预览地址url
export const getImageUrl2 = file_url => {
  return `${import.meta.env.VITE_API_URL}${file_url}`;
};

// 文件下载的地址url
export const getFileUrl = file_id => {
  return `${import.meta.env.VITE_API_URL}${PORT2}/common/down-file/${file_id}`;
};

export const uploadUrl = `${import.meta.env.VITE_API_URL}${PORT2}/common/upload-file`;
