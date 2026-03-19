import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const AccessControlApi = {
  // Permission management
  getPermissionModules: params => http.get(`${PORT2}/iam/permission/modules`, params, { loading: false }),
  getPermissionList: params => http.get(`${PORT2}/iam/permission/list`, params, { loading: false }),
  getPermissionDetail: params => http.get(`${PORT2}/iam/permission/detail`, params, { loading: false }),
  createPermission: data => http.post(`${PORT2}/iam/permission/create`, data),
  updatePermission: data => http.post(`${PORT2}/iam/permission/update`, data),
  deletePermission: data => http.post(`${PORT2}/iam/permission/delete`, data),
  batchUpdatePermissionStatus: data => http.post(`${PORT2}/iam/permission/batch-status`, data),

  // Role management
  getRoleList: params => http.get(`${PORT2}/iam/role/list`, params, { loading: false }),
  getRoleDetail: params => http.get(`${PORT2}/iam/role/detail`, params, { loading: false }),
  createRole: data => http.post(`${PORT2}/iam/role/create`, data),
  updateRole: data => http.post(`${PORT2}/iam/role/update`, data),
  deleteRole: data => http.post(`${PORT2}/iam/role/delete`, data),
  assignRolePermissions: data => http.post(`${PORT2}/iam/role/assign-permissions`, data),
  getRoleUsers: params => http.get(`${PORT2}/iam/role/users`, params, { loading: false }),
  assignUsersToRole: data => http.post(`${PORT2}/iam/role/assign-users`, data),
  removeUsersFromRole: data => http.post(`${PORT2}/iam/role/remove-users`, data)
};

export default AccessControlApi;
