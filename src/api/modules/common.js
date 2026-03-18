import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const CommonApi = {
  getAddress: parentId => {
    return http.get(`${PORT2}/common/address/${parentId || 0}`, {}, { loading: false });
  },
  // 获取角色列表-暂时没用上
  getRoleList: params => {
    return http.get(`${PORT2}/common/role`, params, { loading: false });
  },
  // 机构类型
  getOrgType: () => {
    return http.get(`${PORT2}/common/org-type`, {}, { loading: false });
  },
  // 获取机构树--全部
  getOrgTree: () => {
    return http.get(`${PORT2}/org/list`, { resultType: 2 }, { loading: false });
  },
  // 获取机构树--页面用的
  getOrgTreeList: params => {
    return http.get(`${PORT2}/org/list`, params, { loading: false });
  },
  // 获取机构列表
  getOrgList: () => {
    return http.get(`${PORT2}/org/list`, { resultType: 1 }, { loading: false });
  },
  // 查询登录账号可以看到的所有机构*(支持机构类型)
  getOrgSelectList: params => {
    return http.get(`${PORT2}/org/org-select`, params, { loading: false });
  },
  // 获取SN设备类型列表
  getDeviceTypeList: () => {
    return http.get(`${PORT2}/device/device-type`, {}, { loading: false });
  },
  // 获取设备状态列表
  getDeviceStatusList: () => {
    return http.get(`${PORT2}/common/device-status`, {}, { loading: false });
  },
  // 获取时区列表
  getDictTimezone: () => {
    return http.get(`${PORT2}/dict/timezone`, {}, { loading: false });
  },
  // 获取货币列表
  getDictCurrnecy: () => {
    return http.get(`${PORT2}/dict/currnecy`, {}, { loading: false });
  },
  // 查询登录用户能看到的电站集合
  getSelectStationList: params => {
    return http.get(`${PORT2}/station/select`, params, { loading: false });
  },
  // 获取所有安规代码
  getAllAngui: () => {
    return http.get(`${PORT2}/common/all-angui`, {}, { loading: false });
  },
  // 获取告警类型列表
  getAlarmTypeList: () => {
    return http.get(`${PORT2}/alarm/alarm-type`, {}, { loading: false });
  },

  // 国家和时区的关系
  getCountryTimezoneMap: params => {
    return http.get(`${PORT2}/common/county-timezone-map`, params, { loading: false });
  }
};

export default CommonApi;
