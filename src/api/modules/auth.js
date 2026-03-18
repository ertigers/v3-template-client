import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const AuthApi = {
  login: params => {
    return http.post(`${PORT2}/login`, params, { loading: false });
  },
  logout: () => {
    return http.post(`${PORT2}/logout`);
  },
  getUserInfo: () => {
    return http.get(`${PORT2}/get-info`, {}, { loading: false });
  },
  setUserInfo: params => {
    return http.post(`${PORT2}/user/edit-me`, params);
  },
  checkDeleteUser: () => {
    return http.get(`${PORT2}/user/check-delete-me`, {});
  },
  deleteUser: () => {
    return http.post(`${PORT2}/user/delete-me`, {});
  },
  changePassword: params => {
    return http.post(`${PORT2}/change-password`, params);
  },
  signUp: params => {
    return http.post(`${PORT2}/org/sign-up`, params);
  },
  sendMailCode: params => {
    return http.post(`${PORT2}/user/send-mail-code`, params);
  },
  changePwdByEmailCode: params => {
    return http.post(`${PORT2}/user/change-pwd-by-email-code`, params);
  },
  // 查询未读消息
  getUnreadMessage: () => {
    return http.get(`${PORT2}/notice/unread-count`, {}, { loading: false });
  }
};

export default AuthApi;
