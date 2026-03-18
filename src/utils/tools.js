import { $t } from "@/plugins/i18n.js";

export const formatNumber = num => {
  const result = (num / 1000).toFixed(2); // 保留两位小数
  const trimmedResult = result.replace(/\.?0+$/, ""); // 去除尾随零
  // 如果结果以小数点结尾，也去除小数点
  const finalResult = trimmedResult.endsWith(".") ? trimmedResult.slice(0, -1) : trimmedResult;
  // 如果结果是整数，则转换为整数，否则保留两位小数
  return Number.isInteger(parseFloat(finalResult)) ? parseInt(finalResult, 10) : finalResult;
};

export const formatPercentageNumber = (num1, num2) => {
  if (num1 === 0 || num1 === "0") {
    return "0%";
  } else if (!num1) {
    return "-";
  } else if (!num2) {
    return "-";
  }
  const result = ((num1 * 100) / num2).toFixed(2); // 保留两位小数
  const trimmedResult = result.replace(/\.?0+$/, ""); // 去除尾随零
  // 如果结果以小数点结尾，也去除小数点
  const finalResult = trimmedResult.endsWith(".") ? trimmedResult.slice(0, -1) : trimmedResult;
  // 如果结果是整数，则转换为整数，否则保留两位小数
  const finalResult2 = Number.isInteger(parseFloat(finalResult)) ? parseInt(finalResult, 10) : finalResult;
  return `${finalResult2}%`;
};

// 写一个W换算成GW的函数，保留两位小数, 如果超过3位, 6位 需要逗号分隔
export const formatW = (num, unit, fixedNumber = 2) => {
  if (!num && num !== 0) return "-";
  if (isNaN(Number(num))) return "-";

  let convertedValue = num;

  // 根据指定单位进行转换
  if (unit === "K") {
    // 1kW = 1,000W
    convertedValue = num / 1000;
  } else if (unit === "G") {
    // 1GW = 1,000,000,000W
    convertedValue = num / 1000000000;
  }

  // 保留指定位数小数
  let result = convertedValue.toFixed(fixedNumber);

  // 如果结果为0.00，直接返回0
  if (parseFloat(result) === 0) return "0";

  // 只有当有小数点时，才去除小数部分的尾随零
  if (result.includes(".")) {
    // 去除小数部分的尾随零和可能的小数点
    result = result.replace(/\.?0+$/, "");
  }

  // 添加千位分隔符
  const parts = result.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
};

// 自动根据数值大小换算功率，返回两位有效数字的数值和单位
// 发电量单位: Wh-kWh-MWh-GWh  千晋级
// 装机容量单位: Wp-kWp-MWp-GWp  千晋级
const typeUnit = {
  energy: ["Wh", "kWh", "MWh", "GWh", "TWh"],
  capacitor: ["Wp", "kWp", "MWp", "GWp", "TWp"],
  capacity: ["Wp", "kWp", "MWp", "GWp", "TWp"]
};

export const formatAuto = (num, type = "energy") => {
  if (num === undefined || num === null || num === "") {
    return { value: "-", unit: "-" };
  }

  const parsed = Number(num);
  if (!Number.isFinite(parsed)) {
    return { value: "-", unit: "-" };
  }

  let riseLevel = 0;

  let convertedValue = parsed;
  if (Math.abs(parsed) >= 1000000000000) {
    riseLevel = 4;
    convertedValue = parsed / 1000000000000;
  } else if (Math.abs(parsed) >= 1000000000) {
    riseLevel = 3;
    convertedValue = parsed / 1000000000;
  } else if (Math.abs(parsed) >= 1000000) {
    riseLevel = 2;
    convertedValue = parsed / 1000000;
  } else if (Math.abs(parsed) >= 1000) {
    riseLevel = 1;
    convertedValue = parsed / 1000;
  }

  // 换算单位
  const unitList = typeUnit[type] || typeUnit.energy;
  const unit = unitList[riseLevel] || unitList[0];
  // 保留小数点后两位
  const value = Number(convertedValue.toFixed(2));

  const completeValue = `${value} ${unit}`;

  return { value, unit, completeValue };
};

// 验证电话号码
export const validateTel = (rule, value, callback) => {
  if (!value) {
    callback();
    return;
  }
  // 只要不是中文字符都算合法
  const hasChinese = /[\u4e00-\u9fa5]/.test(value);
  if (!hasChinese) {
    callback();
  } else {
    callback(new Error($t("userInfo.rules.telFormat")));
  }
};

// 设备状态名称,和对应的颜色处理
const deviceStatusColorMap = {
  online: "#52C41A",
  abnormal: "#F5A623",
  offline: "#D9D9D9",
  alarm: "#F5A623"
};

export const getDeviceStatusMeta = (status, deviceStatusMap = {}) => {
  // 兼容后端枚举/数字/字符串
  // 优先从国际化 map 取展示文案
  const label = deviceStatusMap[status] ?? status;
  let color = deviceStatusColorMap.offline;
  if ([1, "1", "ONLINE", "online", true].includes(status)) color = deviceStatusColorMap.online;
  else if ([2, "2", "OFFLINE"].includes(status)) color = deviceStatusColorMap.offline;
  else if ([3, "3", "ALARM", "alarm"].includes(status)) color = deviceStatusColorMap.alarm;
  else color = deviceStatusColorMap.abnormal;
  return { label, color };
};

/**
 * 根据数据最大值动态计算 ECharts Y 轴的 splitNumber
 * 规则：值少时设置为1，值多时分布均匀，但最小步进为1
 * @param {number} maxValue - 数据的最大值
 * @returns {number} 计算得出的 splitNumber
 */
export const calculateSplitNumber = maxValue => {
  if (!maxValue || maxValue <= 0) {
    return 1;
  }

  // 如果最大值很小（<= 5），设置为 1
  if (maxValue <= 1) {
    return 1;
  }

  // 对于较大的值，我们希望 splitNumber 在 2-5 之间
  // 但要确保每个分割段的步进至少为 1
  // 即：maxValue / splitNumber >= 1，所以 splitNumber <= maxValue
  const maxSplitNumber = Math.min(5, Math.floor(maxValue));

  // 从最大可能的分割数开始，向下查找满足步进 >= 1 的最大值
  for (let splitNum = maxSplitNumber; splitNum >= 2; splitNum--) {
    const step = maxValue / splitNum;
    if (step >= 1) {
      return splitNum;
    }
  }

  // 如果都不满足，返回 1
  return 1;
};
