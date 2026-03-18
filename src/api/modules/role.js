import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const RoleApi = {
  // 获取所有角色-附带操作集的
  getRoleList: params => {
    return http.get(`${PORT2}/role/list`, params);
  },
  addRole: params => {
    return http.post(`${PORT2}/role/add`, params);
  },
  editRole: params => {
    return http.post(`${PORT2}/role/edit`, params);
  },
  delRole: params => {
    return http.post(`${PORT2}/role/del`, params);
  },
  // 设置角色权限
  setRoleOperations: params => {
    return http.post(`${PORT2}/role/set-operation`, params);
  },
  // 查询所有操作集
  getOperationList: params => {
    return http.get(`${PORT2}/role/operation-list`, params);
  }
};

export default RoleApi;
