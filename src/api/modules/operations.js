import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const OperationApi = {
  // 采集器列表
  getDeviceGatewayList: params => {
    return http.get(`${PORT2}/device/gateway-list`, params, { loading: false });
  },
  // 采集器详情基础数据
  getGatewayDetails: params => {
    return http.get(`${PORT2}/device/gateway-details`, params);
  },
  // 电站下的设备关系-采集器-微逆
  getGatewayInverterTree: params => {
    return http.get(`${PORT2}/device/station/gateway-inverter`, params);
  },

  // 逆变器列表
  getDeviceInverterList: params => {
    return http.get(`${PORT2}/device/inverter-list`, params, { loading: false });
  },
  // 逆变器详情基础数据
  getInverterDetails: params => {
    return http.get(`${PORT2}/device/inverter-details`, params);
  },
  // 电站下的设备关系-微逆-组件
  getInverterComponentTree: params => {
    return http.get(`${PORT2}/device/station/inverter-component`, params);
  },
  // 查询设备的历史数据
  getDeviceHistoryData: params => {
    return http.get(`${PORT2}/device/history-data`, params);
  },
  // 导出-查询设备的历史数据
  exportDeviceHistoryData: params => {
    return http.get(`${PORT2}/device/history-data-export-excel`, params);
  },
  // 获取电池板的详情数据
  getDeviceComponentDetails: params => {
    return http.get(`${PORT2}/device/component-details`, params);
  },

  // 设备替换记录
  getReplaceRecordList: params => {
    return http.get(`${PORT2}/device/replacement-record-list`, params, { loading: false });
  },

  // 采集器设备指令
  // 设备重启
  deviceReboot: data => {
    return http.post(`${PORT2}/device/operate/reboot`, data);
  },
  // 查看--升级安规代码
  getSecurityCode: data => {
    return http.get(`${PORT2}/device/operate/update-angui`, data);
  },
  // 升级安规代码
  updateSecurityCode: data => {
    return http.post(`${PORT2}/device/operate/update-angui`, data);
  },
  // 查看--密码
  getModifyPassword: data => {
    return http.get(`${PORT2}/device/operate/modify-password`, data);
  },
  // 修改密码
  modifyPassword: data => {
    return http.post(`${PORT2}/device/operate/modify-password`, data);
  },
  // 功率控制
  powerControl: data => {
    return http.post(`${PORT2}/device/operate/power-control`, data);
  },
  // WiFi升级
  wifiUpgrade: data => {
    return http.post(`${PORT2}/device/operate/wifi-upgrade`, data);
  },
  // 查看--产品指令
  getProductCommand: data => {
    return http.get(`${PORT2}/device/operate/set-product-command`, data);
  },
  // 设置产品指令
  setProductCommand: data => {
    return http.post(`${PORT2}/device/operate/set-product-command`, data);
  },
  // 查看--设置负电价
  getNegativePrice: data => {
    return http.get(`${PORT2}/device/operate/switch-value`, data);
  },
  // 设置负电价
  setNegativePrice: data => {
    return http.post(`${PORT2}/device/operate/switch-value`, data);
  },
  // 查看防逆流设置
  getAntiBackflow: data => {
    return http.get(`${PORT2}/device/operate/anti-backflow`, data);
  },
  // 防逆流
  antiBackflow: data => {
    return http.post(`${PORT2}/device/operate/anti-backflow`, data);
  },
  // 相位控制
  getPhaseSetting: data => {
    return http.get(`${PORT2}/device/operate/phase-setting`, data);
  },
  phaseSetting: data => {
    return http.post(`${PORT2}/device/operate/phase-setting`, data);
  },
  // 通用控制
  commonControl: data => {
    return http.post(`${PORT2}/device/operate/common-control`, data);
  },
  // 报警屏蔽
  alarmShield: data => {
    return http.post(`${PORT2}/device/operate/alarm-shield`, data);
  },

  // 平台级别操作
  // 替换设备
  replaceDevice: data => {
    return http.post(`${PORT2}/device/operate/replace`, data);
  },
  // 设备升级
  upgradeDevice: data => {
    return http.post(`${PORT2}/device/operate/upgrade`, data);
  },
  // 设备删除
  delDevice: data => {
    return http.post(`${PORT2}/device/operate/del`, data);
  },
  // 设置别名
  getDeviceAlias: data => {
    return http.get(`${PORT2}/device/operate/set-alias`, data);
  },
  setDeviceAlias: data => {
    return http.post(`${PORT2}/device/operate/set-alias`, data);
  },

  // 查询设备控制的历史记录
  getDeviceControlHistoryList: params => {
    return http.get(`${PORT2}/device/operate/history`, params, { loading: false });
  },
  // 取消控制
  cancelDeviceControl: data => {
    return http.post(`${PORT2}/device/operate/cancel-control`, data);
  },
  // 批量删除控制历史
  deleteDeviceControl: data => {
    return http.post(`${PORT2}/device/operate/del-control`, data);
  },

  // 批量删除控制历史
  deleteDeviceControlHistory: data => {
    return http.post(`${PORT2}/device/operate/history/delete`, data);
  },

  // 电网文件管理
  getGridFileList: params => {
    return http.get(`${PORT2}/grid-file/list`, params);
  },
  deleteGridFile: data => {
    return http.post(`${PORT2}/grid-file/delete`, data);
  },
  updateGridFileAlias: data => {
    return http.post(`${PORT2}/grid-file/alias`, data);
  },
  downloadGridFile: params => {
    return http.download(`${PORT2}/grid-file/download`, params);
  }
};

export default OperationApi;
