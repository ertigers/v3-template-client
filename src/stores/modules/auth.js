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
    // 按钮权限列表
    authButtonList: {},
    // 菜单权限列表
    authMenuList: [],
    // 用户权限集
    userPermissions: [],
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: "",
    // 未读消息数量
    redTipCount: {
      notice: 1,
      alarm: 0
    },
    // 是否是业主
    isCustomer: false
  }),
  getters: {
    // 是否是业主
    isCustomerGet: state => state.isCustomer,
    // 按钮权限列表
    authButtonListGet: state => state.authButtonList,
    // 菜单权限列表 ==> 这里的菜单没有经过任何处理
    authMenuListGet: state => state.authMenuList,
    // 用户权限集
    userPermissionsGet: state => state.userPermissions,
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
    showMenuListGet: state => getShowMenuList(state.authMenuList),
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: state => getFlatMenuList(state.authMenuList),
    // 递归处理后的所有面包屑导航列表
    breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList),
    // 未读消息数量
    redTipCountGet: state => state.redTipCount
  },
  actions: {
    // 设置未读消息数量
    async setRedTipCount() {
      const { data } = await authApi.getUnreadMessage();
      this.redTipCount.notice = data.notice || 0;
      this.redTipCount.alarm = data.alarm || 0;
    },
    // 测试用的*---全部已读
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
      // 根据角色标记是否为业主，并动态设置首页地址
      if (roles.includes("terminal")) {
        this.isCustomer = true;
        setHomeUrl("/home/customer");
      } else {
        this.isCustomer = false;
        setHomeUrl("/home/index");
      }
      console.log("isCustomer", this.isCustomer);

      // 把userInfo存在stores/modules/user.js中
      useUserStore().setUserInfo(userInfo);

      // 处理用户权限集
      let userPermissions = userInfo.permissions || [];

      // 存储用户权限集
      this.userPermissions = userPermissions;
      console.log("userPermissions", userPermissions);

      // 使用权限集过滤菜单
      const authMenuFilterList = filterAsyncRoutes(authMenuList, userPermissions);
      console.log("authMenuFilterList", authMenuFilterList);
      this.authMenuList = authMenuFilterList;

      console.log("--------------------------------初始化全局数据--------");
      // 这里最好在切换国际化语言的时候也调用一下
      // 使用异步加载的方式,如果有需要同步  使用await等待
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
