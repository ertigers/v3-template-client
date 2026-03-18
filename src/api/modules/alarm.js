import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const AlarmApi = {
  // 告警列表查询
  getAlarmList: params => {
    return http.get(`${PORT2}/alarm/real-list`, params, { loading: false });
  },
  // 查询告警详情
  getAlarmDetail: params => {
    return http.get(`${PORT2}/alarm/real-alarm`, params);
  },
  // 标记告警为已处理
  markHandled: data => {
    return http.post(`${PORT2}/alarm/mark-handled`, data);
  },
  // 删除告警
  deleteAlarm: data => {
    return http.post(`${PORT2}/alarm/del`, data);
  }
};

export default AlarmApi;
