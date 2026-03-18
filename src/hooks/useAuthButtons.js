import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";

/**
 * @description 页面按钮权限（兼容权限集和旧版本按钮权限）
 * */
export const useAuthButtons = () => {
  const route = useRoute();
  const authStore = useAuthStore();

  // 获取旧版本的按钮权限（兼容）
  const authButtons = authStore.authButtonListGet[route.name] || [];

  // 获取用户权限集
  const userPermissions = authStore.userPermissionsGet || [];

  const BUTTONS = computed(() => {
    let currentPageAuthButton = {};

    // 兼容旧版本按钮权限
    authButtons.forEach(item => (currentPageAuthButton[item] = true));

    // 添加权限集支持
    userPermissions.forEach(permission => (currentPageAuthButton[permission] = true));

    return currentPageAuthButton;
  });

  return {
    BUTTONS
  };
};
