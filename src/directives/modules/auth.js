/**
 * v-auth
 * 按钮权限指令
 */
import { useAuthStore } from "@/stores/modules/auth";

const auth = {
  mounted(el, binding) {
    const { value } = binding;
    const authStore = useAuthStore();

    // 获取当前页面的按钮权限列表（兼容旧版本）
    const currentPageRoles = authStore.authButtonListGet[authStore.routeName] ?? [];
    // 获取用户权限集
    const userPermissions = authStore.userPermissionsGet ?? [];

    let hasPermission = false;

    if (value instanceof Array && value.length) {
      // 如果传入的是数组，检查是否拥有其中任意一个权限
      hasPermission = value.some(item => {
        // 优先检查权限集，再检查按钮权限（兼容）
        return userPermissions.includes(item) || currentPageRoles.includes(item);
      });
    } else {
      // 如果传入的是单个权限
      hasPermission = userPermissions.includes(value) || currentPageRoles.includes(value);
    }

    if (!hasPermission) {
      el.remove();
    }
  }
};

export default auth;
