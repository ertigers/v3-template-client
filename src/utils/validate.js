import { $t } from "@/plugins/i18n";

// 验证序列号
export const validateSn = async (sn, callback, isNotice = false) => {
  if (!sn) {
    callback();
    return;
  }

  if (sn.length !== 8) {
    callback(new Error($t("device.rules.sn.length")));
    return;
  }

  try {
    const res = await StationApi.validateInverterSn({ sn });
    if (!res.data.valid) {
      let message = res.data.errors.join(",");
      callback(new Error(message));
      isNotice && ElMessage.error(message);
    } else {
      callback();
    }
  } catch (error) {
    console.error("验证序列号失败:", error);
    callback(new Error($t("device.rules.sn.validateFail")));
  }
};

// SN 校验规则-只校验常规数字
export const validateSn2 = (rule, value, callback) => {
  if (!value) {
    callback(new Error($t("snImport.rules.sn")));
    return;
  }

  // 只允许数字
  const numericPattern = /^[0-9]+$/;
  if (!numericPattern.test(value)) {
    callback(new Error($t("snImport.rules.snFormat")));
    return;
  }

  // 长度必须是 8 位
  if (value.length !== 8) {
    callback(new Error($t("snImport.rules.snLength")));
    return;
  }

  callback();
};
