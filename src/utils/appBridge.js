// 消息处理器注册表: type -> Set<handler>
const handlers = new Map();

// 统一解析不同来源的消息（string/object/event）
const parseMessage = raw => {
  if (!raw) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return { type: raw };
    }
  }
  if (raw?.data) return parseMessage(raw.data);
  return raw;
};

/**
 * 注册来自 App 的消息处理器
 * @param {string} type 消息类型
 * @param {(payload: any, message: {type: string, payload?: any}) => void} handler 处理函数
 * @returns {() => void} 取消订阅
 */
export const onAppMessage = (type, handler) => {
  if (!handlers.has(type)) handlers.set(type, new Set());
  handlers.get(type).add(handler);
  return () => handlers.get(type)?.delete(handler);
};

/**
 * 分发消息给已注册的处理器
 * @param {any} message 原始消息（string/object/event）
 * @returns {boolean} 是否被处理
 */
export const dispatchAppMessage = message => {
  const payload = parseMessage(message);
  if (!payload?.type) return false;
  const set = handlers.get(payload.type);
  if (!set || set.size === 0) return false;
  set.forEach(fn => {
    try {
      fn(payload.payload, payload);
    } catch (error) {
      console.error("appBridge handler error:", error);
    }
  });
  return true;
};

/**
 * 监听 window.postMessage 并转发到处理器
 * @returns {() => void} 取消订阅
 */
export const initAppBridgeListener = () => {
  const listener = event => dispatchAppMessage(event);
  window.addEventListener("message", listener);
  return () => window.removeEventListener("message", listener);
};

// 尝试原生 WebView 桥接（iOS/Android/ReactNative）
const postMessageToWebView = (type, payload) => {
  const message = { type, payload };
  if (window?.webkit?.messageHandlers?.[type]) {
    window.webkit.messageHandlers[type].postMessage(payload);
    return true;
  }
  if (window?.ReactNativeWebView?.postMessage) {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
    return true;
  }
  if (window?.Android?.[type]) {
    window.Android[type](JSON.stringify(payload));
    return true;
  }
  return false;
};

/**
 * 向 App 发送消息（iOS/Android/RN WebView 或 iframe）
 * @param {string} type 消息类型
 * @param {any} payload 消息体
 * @returns {boolean} 是否发送成功
 */
export const postToApp = (type, payload) => {
  if (postMessageToWebView(type, payload)) return true;
  if (window?.parent && window.parent !== window) {
    window.parent.postMessage({ type, payload }, "*");
    return true;
  }
  return false;
};

/**
 * 使用示例:
 *   import { postToApp, initAppBridgeListener, onAppMessage } from "@/utils/appBridge";
 *
 *   // 发送给 App
 *   postToApp("webInitFinish", { stationId: "xxx", powerType: "power" });
 *
 *   // 接收来自 App 的消息
 *   const stop = initAppBridgeListener();
 *   const off = onAppMessage("refreshLayout", payload => {
 *     console.log("refreshLayout payload:", payload);
 *   });
 *
 *   // 后续清理:
 *   off();
 *   stop();
 */
