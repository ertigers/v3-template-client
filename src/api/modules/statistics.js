import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const StatisticApi = {
  // 查询电站汇总数据
  getStationSummary: params => {
    return http.get(`${PORT2}/statistic/station/summary`, params);
  },
  // 查询站点装机容量
  getStationCapacity: params => {
    return http.get(`${PORT2}/statistic/station/capacity`, params);
  },
  // 查询历史发电量
  getStationEnergys: params => {
    return http.get(`${PORT2}/statistic/station/energys`, params);
  },
  // 查询电站历史功率
  getStationPowers: params => {
    return http.get(`${PORT2}/statistic/station/powers`, params);
  },
  // 查询站点历史发电量
  getStationEnergy: params => {
    return http.get(`${PORT2}/statistic/station/energy`, params, { loading: false });
  },
  // 查询电站历史功率
  getStationPower: params => {
    return http.get(`${PORT2}/statistic/station/power`, params, { loading: false });
  },
  // 数据报表导出
  getStationPowerExcel: `${import.meta.env.VITE_API_URL}${PORT2}/statistic/station/power/download`,
  getStationEnergyExcel: `${import.meta.env.VITE_API_URL}${PORT2}/statistic/station/energy/download`,

  // 统计电站月度新增数量
  getStationIncrement: params => {
    return http.get(`${PORT2}/statistic/station/increment`, params);
  },
  // 统计设备月度新增数量
  getDeviceIncrement: params => {
    return http.get(`${PORT2}/statistic/device/increment`, params);
  }
};

export default StatisticApi;
