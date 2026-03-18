import { PORT2 } from "@/api/config/servicePort";
import http from "@/api";

const WarrantyApi = {
  // 这是未登录使用使用的
  // 质保查询
  querySn: params => {
    return http.get(`${PORT2}/warranty/query-sn`, params);
  },
  // 产品注册
  register: params => {
    return http.post(`${PORT2}/warranty/register`, params);
  },
  // 下载excel模板
  getWarrantyBatchExcelTemplate: `${import.meta.env.VITE_API_URL}${PORT2}/warranty/batch-excel-template`,

  // 质保管理
  // 查询质保列表
  getWarrantyList: params => {
    return http.get(`${PORT2}/warranty/mana-list`, params, { loading: false });
  },
  // 添加单个质保记录
  addWarranty: params => {
    return http.post(`${PORT2}/warranty/add`, params);
  },
  // 管理员使用的质保产品-编辑
  editWarranty: params => {
    return http.post(`${PORT2}/warranty/mana-edit`, params);
  },
  // 管理员使用的质保删除
  delWarranty: params => {
    return http.post(`${PORT2}/warranty/mana-del`, params);
  },
  // 延长质保时间
  extendWarranty: params => {
    return http.post(`${PORT2}/warranty/mana-extend-warranty`, params);
  },

  // 批量导入质保记录(模板,临时库)
  // 获取批次id
  getWarrantyBatchId: params => {
    return http.get(`${PORT2}/warranty/get-batch-id`, params);
  },
  // excel批量导入
  batchExcelImport: params => {
    return http.post(`${PORT2}/warranty/batch-excel-import`, params);
  },
  // 查询设备导入列表
  getWarrantyBatchList: params => {
    return http.get(`${PORT2}/warranty/batch-list`, params);
  },
  // 删除批次中的一条记录
  deleteWarrantyBatchItem: data => {
    return http.post(`${PORT2}/warranty/batch-item-del`, data);
  },
  // 编辑批次中的一条记录
  editWarrantyBatchItem: data => {
    return http.post(`${PORT2}/warranty/batch-item-edit`, data);
  },
  // 提交指定的所有提交质保记录
  submitWarranty: params => {
    return http.post(`${PORT2}/warranty/batch-submit`, params);
  }
};

export default WarrantyApi;
