import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const UpgradeApi = {
  // 设备升级
  // 升级记录查询
  getDeviceUpgradeList: params => {
    return http.get(`${PORT2}/device/upgrade/list`, params, { loading: false });
  },
  // 删除记录
  deleteDeviceUpgradeItem: data => {
    return http.post(`${PORT2}/device/upgrade/delete-item`, data);
  },
  // 重新升级
  reupgradeDevice: params => {
    return http.post(`${PORT2}/device/upgrade/reupgrade`, params);
  },
  getTemplate: `${import.meta.env.VITE_API_URL}${PORT2}/device/upgrade/batch-excel-template`,

  // 批量处理
  // 获取批次id
  getUpgradeBatchId: params => {
    return http.get(`${PORT2}/device/upgrade/get-batch-id`, params);
  },
  // 批量导入
  batchImportUpgrade: data => {
    return http.post(`${PORT2}/device/upgrade/batch-import`, data);
  },
  // 查询导入批次列表数据
  getUpgradeBatchList: params => {
    return http.get(`${PORT2}/device/upgrade/batch-list`, params, { loading: false });
  },
  // 删除批次中的一条记录
  deleteUpgradeBatchItem: data => {
    return http.post(`${PORT2}/device/upgrade/batch-item-del`, data);
  },
  // 编辑批次中的一条记录
  editUpgradeBatchItem: data => {
    return http.post(`${PORT2}/device/upgrade/batch-item-edit`, data);
  },
  // 提交批次升级
  submitUpgradeBatch: data => {
    return http.post(`${PORT2}/device/upgrade/batch-submit`, data);
  }
};
export default UpgradeApi;
