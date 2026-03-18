// ? 全局默认配置项

// 首页地址（默认，支持运行时切换）
export let HOME_URL = "/home/index";

// 设置首页地址（用于根据用户角色动态切换，例如业主切到 /home/customer）
export const setHomeUrl = url => {
  HOME_URL = url || "/home/index";
};

// 登录页地址（默认）
export const LOGIN_URL = "/public/login";

// 默认主题颜色
// export const DEFAULT_PRIMARY = "#539A9C";
// export const DEFAULT_PRIMARY = "#004345";
// export const DEFAULT_PRIMARY = "#000000";
export const DEFAULT_PRIMARY = "#E01D46";

// 路由白名单地址（本地存在的路由 staticRouter.js 中）
export const ROUTER_WHITE_LIST = [
  "/500",
  "/public/login",
  "/public/download-app",
  "/public/warranty-query",
  "/public/warranty-register",
  "/public/privacy-policy",
  "/public/register",
  "/public/forgot-password",
  "/common/privacy-policy-Envertrack-app",
  "/h5/pv-layout"
];

// 不需要调用pina里面一系列初始化接口的白名单---暂时不考虑与上面的白名单合并
export const ROUTER_WHITE_LIST2 = ["/h5/pv-layout"];

// 谷歌地图 key
export const GOOGLE_MAP_KEY = "AIzaSyBp3GneBzaepqg2f6NRjMlUZoyAc3EPUyU";
// 高德地图 key
// export const AMAP_MAP_KEY = "a877c9cacb7eb2c1c38eeb1ebbfad920";
// export const AMAP_MAP_KEY = "cc723fe7db7752c87598e77c608c58ac";
export const AMAP_MAP_KEY = "c2b807ecbbffabba8f852cab0d812f6d";

// 百度地图 key
export const BAIDU_MAP_KEY = "";
