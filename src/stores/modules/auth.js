import { defineStore } from "pinia";
import authApi from "@/api/modules/auth";
import authMenuListObject from "@/assets/json/authMenuList.json";
import authButtonListObject from "@/assets/json/authButtonList.json";

import { getFlatMenuList, getShowMenuList, getAllBreadcrumbList, filterAsyncRoutes } from "@/utils";
import { setHomeUrl } from "@/config";
import { useUserStore } from "@/stores/modules/user";
import { useCommonStore } from "@/stores/modules/common";

export const useAuthStore = defineStore({
  id: "envertech-auth",
  state: () => ({
    // 鎸夐挳鏉冮檺鍒楄〃
    authButtonList: {},
    // 鑿滃崟鏉冮檺鍒楄〃
    authMenuList: [],
    // 鐢ㄦ埛鏉冮檺闆?
    userPermissions: [],
    // 褰撳墠椤甸潰鐨?router name锛岀敤鏉ュ仛鎸夐挳鏉冮檺绛涢€?
    routeName: "",
    // 鏈娑堟伅鏁伴噺
    redTipCount: {
      notice: 1,
      alarm: 0
    },
    // 鏄惁鏄笟涓?
    isCustomer: false
  }),
  getters: {
    // 鏄惁鏄笟涓?
    isCustomerGet: state => state.isCustomer,
    // 鎸夐挳鏉冮檺鍒楄〃
    authButtonListGet: state => state.authButtonList,
    // 鑿滃崟鏉冮檺鍒楄〃 ==> 杩欓噷鐨勮彍鍗曟病鏈夌粡杩囦换浣曞鐞?
    authMenuListGet: state => state.authMenuList,
    // 鐢ㄦ埛鏉冮檺闆?
    userPermissionsGet: state => state.userPermissions,
    // 鑿滃崟鏉冮檺鍒楄〃 ==> 宸︿晶鑿滃崟鏍忔覆鏌擄紝闇€瑕佸墧闄?isHide == true
    showMenuListGet: state => getShowMenuList(state.authMenuList),
    // 鑿滃崟鏉冮檺鍒楄〃 ==> 鎵佸钩鍖栦箣鍚庣殑涓€缁存暟缁勮彍鍗曪紝涓昏鐢ㄦ潵娣诲姞鍔ㄦ€佽矾鐢?
    flatMenuListGet: state => getFlatMenuList(state.authMenuList),
    // 閫掑綊澶勭悊鍚庣殑鎵€鏈夐潰鍖呭睉瀵艰埅鍒楄〃
    breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList),
    // 鏈娑堟伅鏁伴噺
    redTipCountGet: state => state.redTipCount
  },
  actions: {
    // 璁剧疆鏈娑堟伅鏁伴噺
    async setRedTipCount() {
      const { data } = await authApi.getUnreadMessage();
      this.redTipCount.notice = data.notice || 0;
      this.redTipCount.alarm = data.alarm || 0;
    },
    // 娴嬭瘯鐢ㄧ殑*---鍏ㄩ儴宸茶
    setRedTipCount2() {
      this.redTipCount.notice = 0;
      this.redTipCount.alarm = 0;
    },
    // Get AuthButtonList
    async getAuthButtonList() {
      const { data } = authButtonListObject;
      this.authButtonList = data;
    },
    // Get AuthMenuList
    async getAuthMenuList() {
      const { data: authMenuList } = authMenuListObject;
      const { data: userInfo } = await authApi.getUserInfo();

      console.log("userInfo", userInfo);

      const roles = userInfo.roles || [];
      // 鏍规嵁瑙掕壊鏍囪鏄惁涓轰笟涓伙紝骞跺姩鎬佽缃椤靛湴鍧€
      if (roles.includes("terminal")) {
        this.isCustomer = false;
        setHomeUrl("/home/index");
      } else {
        this.isCustomer = false;
        setHomeUrl("/home/index");
      }
      console.log("isCustomer", this.isCustomer);

      // 鎶妘serInfo瀛樺湪stores/modules/user.js涓?
      useUserStore().setUserInfo(userInfo);

      // 澶勭悊鐢ㄦ埛鏉冮檺闆?
      let userPermissions = userInfo.permissions || [];

      // 瀛樺偍鐢ㄦ埛鏉冮檺闆?
      this.userPermissions = userPermissions;
      console.log("userPermissions", userPermissions);

      // 浣跨敤鏉冮檺闆嗚繃婊よ彍鍗?
      const authMenuFilterList = filterAsyncRoutes(authMenuList, userPermissions);
      console.log("authMenuFilterList", authMenuFilterList);
      this.authMenuList = authMenuFilterList;

      console.log("--------------------------------鍒濆鍖栧叏灞€鏁版嵁--------");
      // 杩欓噷鏈€濂藉湪鍒囨崲鍥介檯鍖栬瑷€鐨勬椂鍊欎篃璋冪敤涓€涓?
      // 浣跨敤寮傛鍔犺浇鐨勬柟寮?濡傛灉鏈夐渶瑕佸悓姝? 浣跨敤await绛夊緟
      const commonStore = useCommonStore();
      commonStore.getOrgType();
      commonStore.getDeviceTypeList();
      commonStore.getDeviceStatusList();
      commonStore.getOrgTree();
    },
    // Set RouteName
    async setRouteName(name) {
      this.routeName = name;
    }
  }
});
