/**
 * 登录信息本地存储工具
 */

const REMEMBER_ME_KEY = "login_remember_me";
const LOGIN_INFO_KEY = "login_info";
const REMEMBER_TIP_SHOWN_KEY = "remember_tip_shown";
const EXPIRE_DAYS = 30; // 过期天数

/**
 * 简单的字符串加密（base64 + 简单偏移）
 * @param {string} str 要加密的字符串
 * @returns {string} 加密后的字符串
 */
const encrypt = str => {
  try {
    // 简单的字符偏移 + base64编码
    const shifted = str
      .split("")
      .map(char => String.fromCharCode(char.charCodeAt(0) + 3))
      .join("");
    return btoa(shifted);
  } catch (error) {
    console.warn("Encryption failed:", error);
    return btoa(str);
  }
};

/**
 * 简单的字符串解密
 * @param {string} str 要解密的字符串
 * @returns {string} 解密后的字符串
 */
const decrypt = str => {
  try {
    const decoded = atob(str);
    // 恢复字符偏移
    return decoded
      .split("")
      .map(char => String.fromCharCode(char.charCodeAt(0) - 3))
      .join("");
  } catch (error) {
    console.warn("Decryption failed:", error);
    return atob(str);
  }
};

/**
 * 保存登录信息
 * @param {Object} loginInfo 登录信息 { username, password }
 * @param {boolean} remember 是否记住密码
 */
export const saveLoginInfo = (loginInfo, remember) => {
  if (remember) {
    localStorage.setItem(REMEMBER_ME_KEY, "true");

    const expireTime = Date.now() + EXPIRE_DAYS * 24 * 60 * 60 * 1000;

    localStorage.setItem(
      LOGIN_INFO_KEY,
      JSON.stringify({
        username: loginInfo.username,
        password: encrypt(loginInfo.password),
        expireTime
      })
    );
  } else {
    clearLoginInfo();
  }
};

/**
 * 读取保存的登录信息
 * @returns {Object|null} 登录信息或null
 */
export const loadLoginInfo = () => {
  const isRemembered = localStorage.getItem(REMEMBER_ME_KEY) === "true";

  if (!isRemembered) {
    return null;
  }

  const loginInfo = localStorage.getItem(LOGIN_INFO_KEY);

  if (!loginInfo) {
    return null;
  }

  try {
    const { username, password, expireTime } = JSON.parse(loginInfo);

    // 检查是否过期
    if (expireTime && Date.now() > expireTime) {
      console.log("记住的登录信息已过期");
      clearLoginInfo();
      return null;
    }

    return {
      username: username || "",
      password: password ? decrypt(password) : "",
      remember: true
    };
  } catch (error) {
    console.warn("Failed to parse saved login info:", error);
    clearLoginInfo();
    return null;
  }
};

/**
 * 清除保存的登录信息
 */
export const clearLoginInfo = () => {
  localStorage.removeItem(REMEMBER_ME_KEY);
  localStorage.removeItem(LOGIN_INFO_KEY);
};

/**
 * 清除所有认证相关的本地存储数据
 */
export const clearAllAuthData = () => {
  localStorage.removeItem(REMEMBER_ME_KEY);
  localStorage.removeItem(LOGIN_INFO_KEY);
  localStorage.removeItem(REMEMBER_TIP_SHOWN_KEY);
};

/**
 * 检查是否记住了密码
 * @returns {boolean}
 */
export const isRememberEnabled = () => {
  return localStorage.getItem(REMEMBER_ME_KEY) === "true";
};

/**
 * 检查是否已显示过记住密码提示
 * @returns {boolean}
 */
export const isRememberTipShown = () => {
  return localStorage.getItem(REMEMBER_TIP_SHOWN_KEY) === "true";
};

/**
 * 标记已显示过记住密码提示
 */
export const markRememberTipShown = () => {
  localStorage.setItem(REMEMBER_TIP_SHOWN_KEY, "true");
};
