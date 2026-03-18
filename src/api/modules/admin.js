import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const AdminApi = {
  // 查询超管控制页面列表数据
  getSuperControlDeviceList: params => {
    return http.get(`${PORT2}/super-control/list`, params, { loading: false });
  },
  getTemplate: `${import.meta.env.VITE_API_URL}${PORT2}/super-control/batch-excel-template`,
  // 批量处理
  // 获取批次id
  getSuperControlBatchId: params => {
    return http.get(`${PORT2}/super-control/get-batch-id`, params);
  },
  // 批量导入
  batchImportSuperControl: data => {
    return http.post(`${PORT2}/super-control/batch-import`, data);
  },
  // 查询导入批次列表数据
  getSuperControlBatchList: params => {
    return http.get(`${PORT2}/super-control/batch-list`, params, { loading: false });
  },
  // 删除批次中的一条记录
  deleteSuperControlBatchItem: data => {
    return http.post(`${PORT2}/super-control/batch-item-del`, data);
  },
  // 编辑批次中的一条记录
  editSuperControlBatchItem: data => {
    return http.post(`${PORT2}/super-control/batch-item-edit`, data);
  },
  // 提交批次升级
  submitSuperControlBatch: data => {
    return http.post(`${PORT2}/super-control/batch-submit`, data);
  }
};
export default AdminApi;
