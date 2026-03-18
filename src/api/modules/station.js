import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const StationApi = {
  // 电站
  getStationList: params => {
    return http.get(`${PORT2}/station/list`, params, { loading: false });
  },
  // 查询电子详情: 基础信息+统计信息
  getStationDetail: params => {
    return http.get(`${PORT2}/statistic/station/detail`, params, { loading: false });
  },
  addStation: params => {
    return http.post(`${PORT2}/station/add`, params);
  },
  // 收藏电站和取消收藏
  collectStation: params => {
    return http.post(`${PORT2}/station/favorite`, params);
  },
  cancelCollectStation: params => {
    return http.post(`${PORT2}/station/favorite/cancel`, params);
  },
  // 全量参数修改
  setStation: params => {
    return http.post(`${PORT2}/station/set`, params);
  },
  // 只传修改的参数
  partialSetStation: params => {
    return http.post(`${PORT2}/station/partial/set`, params);
  },
  // 绑定设备--首次添加设备
  bindDevice: params => {
    return http.post(`${PORT2}/station/device/bind`, params);
  },
  // 查询绑定设备列表 -- 仅仅是展示关系
  getBindDevice: params => {
    return http.get(`${PORT2}/station/device`, params);
  },
  // 添加编辑删除--设备
  bindDeviceAdd: params => {
    return http.post(`${PORT2}/station/device-add`, params);
  },
  bindDeviceEdit: params => {
    return http.post(`${PORT2}/station/device-set`, params);
  },
  // 重新计算设备关系--兼容本地模式的
  recalculateDeviceRelation: params => {
    return http.post(`${PORT2}/station/device-refresh`, params);
  },
  // 给采集器下添加一个evt
  bindDeviceAddInverter: params => {
    return http.post(`${PORT2}/station/gateway-add-inverter`, params);
  },
  bindDeviceDelete: params => {
    return http.post(`${PORT2}/station/device-del`, params);
  },
  // 获取电站设备列表 -- 数据分析使用的
  getStationDeviceList: params => {
    return http.get(`${PORT2}/station/device-list`, params);
  },
  // 获取电站的PV列表
  getStationPVList: params => {
    return http.get(`${PORT2}/station/component-list`, params);
  },

  // 获取电站组件功率
  getStationPVPower: params => {
    return http.get(`${PORT2}/device/station/component-power`, params);
  },
  // 获取电站组件发电量
  getStationPVEnergy: params => {
    return http.get(`${PORT2}/device/station/component-electricity-generation`, params);
  },
  // 查询当前时刻电站组件信息-功率和发电量
  getStationPVBaseInfo: params => {
    return http.get(`${PORT2}/device/station/real-data`, params);
  },
  getStationPVInfo: params => {
    return http.get(`${PORT2}/device/station/component-electricity-generation`, params);
  },

  // 电站运维的操作-功率控制和重启
  powerControlStation: params => {
    return http.post(`${PORT2}/station/operate/power-control`, params);
  },
  restartStation: params => {
    return http.post(`${PORT2}/station/operate/reboot`, params);
  },
  // 逻辑删除
  removeStation: params => {
    return http.post(`${PORT2}/station/del`, params);
  },
  // 查询是否可以删除电站
  getRemoveStationStatus: params => {
    return http.get(`${PORT2}/station/del`, params);
  },
  // 光伏板
  getStationLayout: params => {
    return http.get(`${PORT2}/station/layout/list`, params);
  },
  setStationLayout: params => {
    return http.post(`${PORT2}/station/layout/set`, params);
  },
  removeStationLayout: params => {
    return http.post(`${PORT2}/station/layout/remove`, params);
  },
  // 验证微逆序列号
  validateInverterSn: params => {
    return http.get(`${PORT2}/common/check-sn`, params, { loading: false, cancel: false });
  }
};

export default StationApi;
