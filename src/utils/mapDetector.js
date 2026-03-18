/**
 * 检测网络环境，判断是否能访问 Google 服务
 * @returns {Promise<boolean>} true 表示可以访问 Google（使用 Google 地图），false 表示不能访问（使用高德地图）
 */
export const detectMapProvider = async () => {
  // 方法1：通过图片加载检测（更可靠）
  const checkByImage = () => {
    return new Promise(resolve => {
      const img = new Image();
      const timeout = setTimeout(() => {
        img.onload = null;
        img.onerror = null;
        resolve(false); // 超时，使用高德地图
      }, 2000);

      img.onload = () => {
        clearTimeout(timeout);
        resolve(true); // 能加载，使用 Google 地图
      };

      img.onerror = () => {
        clearTimeout(timeout);
        resolve(false); // 加载失败，使用高德地图
      };

      // 使用 Google 的 favicon，添加时间戳避免缓存
      img.src = `https://www.google.com/favicon.ico?t=${Date.now()}`;
    });
  };

  // 方法2：结合时区/语言判断作为辅助
  // const localeCheck = detectNetworkByLocale();

  // // 如果时区/语言显示在国内，直接使用高德地图（避免不必要的检测）
  // if (localeCheck) {
  //   console.log("根据时区/语言判断，使用高德地图");
  //   return false;
  // }

  // 否则尝试检测是否能访问 Google
  try {
    const canAccess = await checkByImage();
    console.log(`网络环境检测: ${canAccess ? "可以访问 Google，使用 Google 地图" : "无法访问 Google，使用高德地图"}`);
    return canAccess;
  } catch (error) {
    console.log("网络环境检测失败，默认使用高德地图:", error);
    return false;
  }
};

/**
 * 检测网络环境的简化版本（通过检查时区或语言）
 * @returns {boolean} true 表示可能在国内（使用高德地图），false 表示可能在国外（使用 Google 地图）
 */
export const detectNetworkByLocale = () => {
  // 检查时区
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isChinaTimezone = timezone.includes("Shanghai") || timezone.includes("Beijing") || timezone.includes("Chongqing");

  // 检查语言
  const language = navigator.language || navigator.userLanguage;
  const isChinese = language.toLowerCase().includes("zh");

  // 如果时区或语言是中国相关，优先使用高德地图
  // 否则尝试使用 Google 地图
  return isChinaTimezone || isChinese;
};
