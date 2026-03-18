// Device maintenance shared data
import { t } from "@/plugins/i18n.js";

/**
 * @description: 生产指令
 */
export const productCommandList = [
  {
    code: "00",
    name: "DEFAULT"
  },
  {
    code: "01",
    name: "EVT300/EVT600/EVT1200"
  },
  {
    code: "02",
    name: "EVT360/EVT720/EVT1440"
  },
  {
    code: "03",
    name: "EVT400/EVT800"
  },
  {
    code: "04",
    name: "EVT500/EVT1000/EVT2000"
  },
  {
    code: "05",
    name: "EVT2000SE"
  },
  {
    code: "06",
    name: "EVT1600SE"
  },
  {
    code: "07",
    name: "EVT1800SE"
  },
  {
    code: "08",
    name: "EVT2400"
  },
  {
    code: "09",
    name: "EVT150/EVT300/EVT600"
  },
  {
    code: "0A",
    name: "EVT200/EVT400/EVT800"
  },
  {
    code: "0B",
    name: "EVT350/EVT700/EVT1400"
  },
  {
    code: "0C",
    name: "EVT410/EVT810/EVT1620"
  },
  {
    code: "0D",
    name: "EVT450/EVT900/EVT1800"
  }
];

/**
 * @description: 防逆流
 */
export const antiBackflowOptions = [
  { value: true, label: t("global.yes") },
  { value: false, label: t("global.no") }
];

/**
 * @description: 相位
 */
export const phaseOptions = [
  { value: 1, label: "A相" },
  { value: 2, label: "B相" },
  { value: 3, label: "C相" }
];

/**
 * @description: 功率限制
 */
export const powerList = [
  {
    code: 1,
    name: "10%"
  },
  {
    code: 2,
    name: "20%"
  },
  {
    code: 3,
    name: "30%"
  },
  {
    code: 4,
    name: "40%"
  },
  {
    code: 5,
    name: "50%"
  },
  {
    code: 6,
    name: "60%"
  },
  {
    code: 7,
    name: "70%"
  },
  {
    code: 8,
    name: "80%"
  },
  {
    code: 9,
    name: "90%"
  },
  {
    code: 10,
    name: "100%"
  }
];

/**
 * @description: 升级类型
 */
export const upgradeTypeList = [
  {
    code: 0,
    name: "EVB"
  },
  {
    code: 1,
    name: "EVT"
  },
  {
    code: 4,
    name: t("device.label.originalSideUpgrade")
  },
  {
    code: 5,
    name: t("device.label.subSideUpgrade")
  }
];

/**
 * @description: 升级类型
 */
export const EvtUpgradeTypeList = [
  {
    code: 4,
    name: t("device.label.originalSideUpgrade")
  },
  {
    code: 5,
    name: t("device.label.subSideUpgrade")
  }
];
