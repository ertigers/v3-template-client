import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const BaseApi = {
  // 获取机构列表-移到common.js
  // getOrgList: params => {
  //   return http.get(`${PORT2}/org/list`, params);
  // },
  addOrg: params => {
    return http.post(`${PORT2}/org/add`, params);
  },
  editOrg: params => {
    return http.post(`${PORT2}/org/edit`, params);
  },
  delOrg: params => {
    return http.post(`${PORT2}/org/del`, params);
  },
  // 迁移机构
  migrationOrg: params => {
    return http.post(`${PORT2}/org/migration-org`, params);
  },

  // 查询机构下（用户，业主）数量
  getOrgUserCount: params => {
    return http.post(`${PORT2}/org/user`, params);
  },
  // 查询用户/业主详情
  getUserInfo: params => {
    return http.get(`${PORT2}/org/user/get`, params);
  },
  // 查询机构下（电站数量，装机容量）数量
  getOrgStationCount: params => {
    return http.post(`${PORT2}/org/station`, params);
  },

  // 机构用户/业主
  getOrgUserList: params => {
    return http.get(`${PORT2}/org/user/list`, params, { loading: false });
  },
  addOrgUser: params => {
    return http.post(`${PORT2}/org/user/add`, params);
  },
  editOrgUser: params => {
    return http.post(`${PORT2}/org/user/edit`, params);
  },
  getRemoveUserStatus: params => {
    return http.get(`${PORT2}/org/user/check-del`, params, { loading: false });
  },
  delOrgUser: params => {
    return http.post(`${PORT2}/org/user/del`, params);
  },

  // 重置密码
  resetOrgUserPassword: params => {
    return http.post(`${PORT2}/org/user/reset-password`, params);
  },
  // 随机生成一个密码
  randomPassword: params => {
    return http.get(`${PORT2}/common/gen-k`, params);
  }
};

export default BaseApi;
