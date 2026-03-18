import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const FeedbackApi = {
  // 反馈
  feedback: params => {
    return http.post(`${PORT2}/feedback/save`, params);
  },
  // 删除反馈
  remove: params => {
    return http.post(`${PORT2}/feedback/remove`, params);
  },
  // 查询所有反馈
  query: params => {
    return http.get(`${PORT2}/feedback/all`, params);
  },
  // 查询单个反馈详情
  detail: params => {
    return http.get(`${PORT2}/feedback/id`, params);
  }
};

export default FeedbackApi;
