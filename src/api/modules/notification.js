import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const NotificationApi = {
  // 添加通知
  addNotice: params => {
    return http.post(`${PORT2}/notice/add`, params);
  },
  // 查询发送的所有通知
  query: params => {
    return http.get(`${PORT2}/notice/list`, params);
  },
  // 删除发送的通知
  remove: params => {
    return http.post(`${PORT2}/notice/del`, params);
  },
  // 查询所有接收的通知
  queryReceiveNotice: params => {
    return http.get(`${PORT2}/notice/system`, params);
  },
  // 阅读通知
  readNotice: params => {
    return http.post(`${PORT2}/notice/read-system`, params);
  }
};

export default NotificationApi;
