/**
 * v-permission
 * 权限集控制指令
 */
import { useAuthStore } from "@/stores/modules/auth";

const permission = {
  mounted(el, binding) {
    const { value, modifiers } = binding;
    const authStore = useAuthStore();
    const userPermissions = authStore.userPermissionsGet ?? [];

    let hasPermission = false;

    if (value instanceof Array && value.length) {
      if (modifiers.all) {
        // 需要拥有所有权限 v-permission.all="['perm1', 'perm2']"
        hasPermission = value.every(permission => userPermissions.includes(permission));
      } else {
        // 默认：拥有任意一个权限即可 v-permission="['perm1', 'perm2']"
        hasPermission = value.some(permission => userPermissions.includes(permission));
      }
    } else if (typeof value === "string") {
      // 单个权限 v-permission="'perm1'"
      hasPermission = userPermissions.includes(value);
    }

    if (!hasPermission) {
      el.remove();
    }
  },

  updated(el, binding) {
    // 权限更新时重新检查
    const { value, modifiers } = binding;
    const authStore = useAuthStore();
    const userPermissions = authStore.userPermissionsGet ?? [];

    let hasPermission = false;

    if (value instanceof Array && value.length) {
      if (modifiers.all) {
        hasPermission = value.every(permission => userPermissions.includes(permission));
      } else {
        hasPermission = value.some(permission => userPermissions.includes(permission));
      }
    } else if (typeof value === "string") {
      hasPermission = userPermissions.includes(value);
    }

    // 动态显示/隐藏元素
    if (hasPermission) {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  }
};

export default permission;
