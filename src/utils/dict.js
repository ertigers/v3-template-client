// ? 系统全局字典
import { t } from "@/plugins/i18n.js";

/**
 * @description：用户性别
 */
export const genderType = [
  { label: t("dict.gender.male"), value: 1 },
  { label: t("dict.gender.female"), value: 2 }
];

/**
 * @description：用户状态
 */
export const userStatus = [
  { label: t("dict.userStatus.enabled"), value: 1, tagType: "success" },
  { label: t("dict.userStatus.disabled"), value: 0, tagType: "danger" }
];

/**
 * @description：是否展示下级用户
 */
export const showSubordinateUsersType = [
  { label: t("dict.showSubordinateUsers.show"), value: true },
  { label: t("dict.showSubordinateUsers.hide"), value: false }
];

/**
 * @description：SN导入状态
 */
export const snDeviceStatus = [
  { label: t("dict.snDeviceStatus.unused"), value: 0 },
  { label: t("dict.snDeviceStatus.using"), value: 1 }
];

/**
 * @description：el-tag的type属性值
 */
export const tagTypeMap = {
  ONLINE: "success",
  ALARM: "warning",
  OFFLINE: "info"
};

/**
 * @description：电站状态
 */
export const stationStatus = [
  { label: t("dict.stationStatus.normal"), value: 1 },
  { label: t("dict.stationStatus.offline"), value: 0 },
  { label: t("dict.stationStatus.building"), value: 3 },
  { label: t("dict.stationStatus.alarm"), value: 2 }
];

/**
 * @description：设备类型
 */
export const deviceTypes = [
  { label: t("dict.deviceType.gateway"), value: "GATEWAY" },
  { label: t("dict.deviceType.inverter"), value: "INVERTER" }
];
export const deviceTypesMap = {
  GATEWAY: t("dict.deviceType.gateway"),
  INVERTER: t("dict.deviceType.inverter")
};

// 控制记录 - 控制类型与状态映射（中文）
// 控制类型（用于筛选/展示）- 后端返回代码 0~9
export const controlTypes = [
  { label: t("record.control.controlType[0]"), value: "0" },
  { label: t("record.control.controlType[1]"), value: "1" },
  { label: t("record.control.controlType[2]"), value: "2" },
  { label: t("record.control.controlType[3]"), value: "3" },
  { label: t("record.control.controlType[4]"), value: "4" },
  { label: t("record.control.controlType[5]"), value: "5" },
  { label: t("record.control.controlType[6]"), value: "6" },
  { label: t("record.control.controlType[7]"), value: "7" },
  { label: t("record.control.controlType[8]"), value: "8" },
  { label: t("record.control.controlType[9]"), value: "9" }
];
export const controlTypesMap = {
  0: t("record.control.controlType[0]"),
  1: t("record.control.controlType[1]"),
  2: t("record.control.controlType[2]"),
  3: t("record.control.controlType[3]"),
  4: t("record.control.controlType[4]"),
  5: t("record.control.controlType[5]"),
  6: t("record.control.controlType[6]"),
  7: t("record.control.controlType[7]"),
  8: t("record.control.controlType[8]"),
  9: t("record.control.controlType[9]")
};

// 控制状态
export const controlStatus = [
  { label: t("record.control.status[0]"), value: "0" },
  { label: t("record.control.status[1]"), value: "1" },
  { label: t("record.control.status[2]"), value: "2" },
  { label: t("record.control.status[3]"), value: "3" },
  { label: t("record.control.status[4]"), value: "4" }
];
export const controlStatusMap = {
  0: t("record.control.status[0]"),
  1: t("record.control.status[1]"),
  2: t("record.control.status[2]"),
  3: t("record.control.status[3]"),
  4: t("record.control.status[4]")
};

export const controlStatusColors = {
  3: "#67C23A",
  4: "#F56C6C",
  0: "#E6A23C",
  1: "#409EFF",
  2: "#909399"
};
