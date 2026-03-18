import { defineStore } from "pinia";
import piniaPersistConfig from "@/stores/helper/persist";
import CommonApi from "@/api/modules/common";

export const useCommonStore = defineStore({
  id: "envertech-common",
  state: () => ({
    // 国家地区
    addressList: [],
    // 机构类型类别
    orgTypeList: [],
    orgTypeMap: {},
    // 机构树
    orgTreeList: [],
    orgList: [],
    orgListMap: {},
    // 经销商的列表
    dealerOrgList: [],
    // SN设备类型
    deviceTypeList: [],
    deviceTypeMap: {},
    // 设备状态
    deviceStatusList: [],
    deviceStatusMap: {},
    // 时区
    dictTimezoneList: [],
    // 货币
    dictCurrnecyList: [],
    // 所属电站
    selectStationList: [],

    // 告警类型
    alarmTypeList: []
  }),
  getters: {},
  actions: {
    async getAddress() {
      const { data } = await CommonApi.getAddress();
      this.addressList = data;
    },
    async getOrgType() {
      const { data } = await CommonApi.getOrgType();
      this.orgTypeList = data;
      this.orgTypeMap = data.reduce((acc, item) => {
        acc[item.code] = item;
        return acc;
      }, {});
    },
    async getOrgTree() {
      const res = await CommonApi.getOrgTree();
      this.orgTreeList = res.data;
      return res;
    },
    async getOrgList() {
      const { data } = await CommonApi.getOrgList();
      this.orgList = data;
      this.orgListMap = data.reduce((acc, item) => {
        acc[item.id] = item;
      }, {});
    },
    // 查询经销商的树形结构
    async getDealerOrgList() {
      const { data } = await CommonApi.getOrgSelectList({ type: "DEALER" });
      this.dealerOrgList = data;
      return data;
    },
    async getDeviceTypeList() {
      const { data } = await CommonApi.getDeviceTypeList();
      this.deviceTypeList = data;
      let deviceTypeMap = {};
      data.map(item => {
        deviceTypeMap[item.deviceType] = item.name;
      });
      this.deviceTypeMap = deviceTypeMap;
    },
    // 设备状态列表
    async getDeviceStatusList() {
      let deviceStatusMap = {};
      const { data } = await CommonApi.getDeviceStatusList();
      data.forEach(item => {
        item.label = item.name;
        item.value = item.deviceStatus;
        deviceStatusMap[item.deviceStatus] = item.name;
      });
      this.deviceStatusList = data;
      this.deviceStatusMap = deviceStatusMap;
    },
    async getDictTimezone() {
      console.log("getDictTimezone");
      const { data } = await CommonApi.getDictTimezone();
      this.dictTimezoneList = data;
      return this.dictTimezoneList;
    },
    async getDictCurrnecy() {
      const { data } = await CommonApi.getDictCurrnecy();
      this.dictCurrnecyList = data;
      return this.dictCurrnecyList;
    },
    async getSelectStationList(params = {}) {
      const { stationName = "", pageNumber = 1, pageSize = 20, append = false } = params;
      const query = { pageNumber, pageSize };
      if (stationName) query.stationName = stationName;

      const { data } = await CommonApi.getSelectStationList(query);
      const list = Array.isArray(data?.content) ? data.content : Array.isArray(data) ? data : [];

      this.selectStationList = append ? this.selectStationList.concat(list) : list;
      const currentPage = data?.page ?? data?.pageNumber ?? pageNumber;
      const currentSize = data?.size ?? data?.pageSize ?? pageSize;
      return {
        list,
        page: currentPage,
        size: currentSize,
        pageNumber: currentPage,
        pageSize: currentSize,
        totalPages: data?.totalPages || 1,
        totalElements: data?.totalElements || list.length
      };
    },
    async getAlarmTypeList() {
      const { data } = await CommonApi.getAlarmTypeList();
      this.alarmTypeList = data;
      return this.alarmTypeList;
    }
  },

  persist: piniaPersistConfig("envertech-common")
});
