import { computed } from "vue";
import { useAuthStore } from "@/stores/modules/auth";
import { hasPermission, hasAllPermissions, hasAnyPermission } from "@/utils";

/**
 * @description 权限管理组合式函数
 * @returns {Object} 权限检查相关方法
 */
export function usePermissions() {
  const authStore = useAuthStore();

  // 用户权限集
  const userPermissions = computed(() => authStore.userPermissionsGet);

  /**
   * @description 检查是否拥有指定权限
   * @param {String} permission 权限码
   * @returns {Boolean} 是否拥有权限
   */
  const checkPermission = permission => {
    if (!permission) return true;
    return userPermissions.value.includes(permission);
  };

  /**
   * @description 检查是否拥有指定权限中的任意一个
   * @param {Array} permissions 权限码数组
   * @returns {Boolean} 是否拥有任意一个权限
   */
  const checkAnyPermission = permissions => {
    if (!permissions || permissions.length === 0) return true;
    return hasAnyPermission(userPermissions.value, permissions);
  };

  /**
   * @description 检查是否拥有指定的所有权限
   * @param {Array} permissions 权限码数组
   * @returns {Boolean} 是否拥有所有权限
   */
  const checkAllPermissions = permissions => {
    if (!permissions || permissions.length === 0) return true;
    return hasAllPermissions(userPermissions.value, permissions);
  };

  /**
   * @description 检查路由权限
   * @param {Object} route 路由对象
   * @returns {Boolean} 是否有权限访问
   */
  const checkRoutePermission = route => {
    return hasPermission(userPermissions.value, route);
  };

  /**
   * @description 权限过滤器 - 用于v-if等条件渲染
   * @param {String|Array} permissions 权限码或权限码数组
   * @param {String} mode 检查模式：'any'(任意一个) | 'all'(全部)
   * @returns {Boolean} 是否通过权限检查
   */
  const permissionFilter = (permissions, mode = "any") => {
    if (!permissions) return true;

    if (typeof permissions === "string") {
      return checkPermission(permissions);
    }

    if (Array.isArray(permissions)) {
      return mode === "all" ? checkAllPermissions(permissions) : checkAnyPermission(permissions);
    }

    return false;
  };

  return {
    // 响应式数据
    userPermissions,

    // 权限检查方法
    checkPermission,
    checkAnyPermission,
    checkAllPermissions,
    checkRoutePermission,
    permissionFilter,

    // 别名方法（更简洁的命名）
    hasPermission: checkPermission,
    hasAnyPermission: checkAnyPermission,
    hasAllPermissions: checkAllPermissions,
    can: checkPermission,
    canAny: checkAnyPermission,
    canAll: checkAllPermissions
  };
}
