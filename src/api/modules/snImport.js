import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const SnImportApi = {
  // 查询列表
  getSnDeviceList: params => {
    return http.get(`${PORT2}/device/import/list`, params, { loading: false });
  },
  // 下载模板
  getSnDeviceTemplate: `${import.meta.env.VITE_API_URL}${PORT2}/device/import/excel-template`,
  // 单个添加
  addSnDevice: params => {
    return http.post(PORT2 + `/device/import/add`, params);
  },
  // 删除设备
  deleteSnDevice: params => {
    return http.post(PORT2 + `/device/import/delete`, params);
  },
  // 批量处理
  // 获取批次id
  getDeviceImportBatchId: params => {
    return http.get(`${PORT2}/device/import/get-batch-id`, params);
  },
  // 批量导入
  batchImportDeviceImport: data => {
    return http.post(`${PORT2}/device/import/batch-import`, data);
  },
  // 查询导入批次列表数据
  getDeviceImportBatchList: params => {
    return http.get(`${PORT2}/device/import/batch-list`, params, { loading: false });
  },
  // 删除批次中的一条记录
  deleteDeviceImportBatchItem: data => {
    return http.post(`${PORT2}/device/import/batch-item-del`, data);
  },
  // 编辑批次中的一条记录
  editDeviceImportBatchItem: data => {
    return http.post(`${PORT2}/device/import/batch-item-edit`, data);
  },
  // 提交批次升级
  submitDeviceImportBatch: data => {
    return http.post(`${PORT2}/device/import/batch-submit`, data);
  }
};

export default SnImportApi;
