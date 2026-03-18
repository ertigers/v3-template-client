import router from "@/routers/index";
import { LOGIN_URL } from "@/config";
import { ElNotification } from "element-plus";
import { useUserStore } from "@/stores/modules/user";
import { useAuthStore } from "@/stores/modules/auth";
import { $t } from "@/plugins/i18n";

// lazy load all vue files under views directory
const modules = import.meta.glob("@/views/**/*.vue");

const transformAsyncRoutes = routes =>
  routes.map(route => {
    const currentRoute = { ...route };

    if (currentRoute.component && typeof currentRoute.component === "string") {
      const viewComponent = modules[`/src/views${currentRoute.component}.vue`];
      if (!viewComponent) {
        console.warn(`dynamicRouter: component not found -> ${currentRoute.component}`);
      } else {
        currentRoute.component = viewComponent;
      }
    }

    if (currentRoute.children?.length) {
      currentRoute.children = transformAsyncRoutes(currentRoute.children);
    }

    return currentRoute;
  });

/**
 * Initialize dynamic routes based on menu data
 */
export const initDynamicRouter = async () => {
  const userStore = useUserStore();
  const authStore = useAuthStore();

  try {
    // 1. load menu && button permissions
    await authStore.getAuthMenuList();
    await authStore.getAuthButtonList();

    // 2. ensure current user has menu data
    if (!authStore.authMenuListGet.length) {
      ElNotification({
        title: $t("routers.noPermission"),
        message: $t("routers.noPermissionMessage"),
        type: "warning",
        duration: 3000
      });
      userStore.setToken("");
      router.replace(LOGIN_URL);
      return Promise.reject("No permission");
    }

    const asyncRoutes = transformAsyncRoutes(authStore.authMenuListGet);

    // 3. register dynamic routes
    asyncRoutes.forEach(routeRecord => {
      if (routeRecord.meta?.isFull) {
        router.addRoute(routeRecord);
      } else {
        router.addRoute("layout", routeRecord);
      }
    });

    console.log(router.getRoutes());
  } catch (error) {
    userStore.setToken("");
    router.replace(LOGIN_URL);
    return Promise.reject(error);
  }
};
