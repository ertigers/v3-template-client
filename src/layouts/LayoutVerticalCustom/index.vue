<!-- 纵向布局 -->
<template>
  <div v-if="isCustomer">
    <HeaderCustomer />
    <Main />
  </div>
  <el-container v-else class="layout">
    <el-aside>
      <div class="aside-box global-screen-scale" :style="{ width: isCollapse ? '65px' : '240px' }">
        <div class="logo flx-center">
          <img v-show="!isCollapse" class="logo-icon" src="@/assets/images/logo-w.svg" alt="logo" />
          <CollapseIcon id="collapseIcon" />
        </div>
        <!-- 通用菜单 -->
        <div style="flex: 1">
          <span v-if="!isCollapse" class="menu-title">{{ $t("layouts.menu.common") }}</span>
          <el-scrollbar>
            <el-menu
              :router="false"
              :default-active="activeMenu"
              :collapse="isCollapse"
              :unique-opened="accordion"
              :collapse-transition="false"
              style="height: 100%"
            >
              <SubMenu :menu-list="menuList" />
            </el-menu>
          </el-scrollbar>
        </div>
        <!-- 个人信息 -->
        <div style="margin-bottom: 0px">
          <span v-if="!isCollapse" class="menu-title">{{ $t("layouts.menu.personalInfo") }}</span>
          <UserMenu :collapse="isCollapse"></UserMenu>
          <Language id="language" style="margin-left: 20px" :collapse="isCollapse" />
        </div>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<script setup name="layoutVertical">
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";
import { useGlobalStore } from "@/stores/modules/global";
import SvgIcon from "@/components/SvgIcon/index.vue";
import Main from "@/layouts/components/Main/index.vue";
import ToolBarLeft from "@/layouts/components/Header2/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header2/ToolBarRight.vue";
import HeaderCustomer from "@/layouts/components/HeaderCustomer/index.vue";

import SubMenu from "@/layouts/components/Menu/SubMenu.vue";
import Language from "@/layouts/components/Header/components/LanguageMenu.vue";
import UserMenu from "@/layouts/components/Header/components/UserMenu.vue";
import CollapseIcon from "../components/Header2/components/CollapseIcon.vue";

const title = import.meta.env.VITE_GLOB_APP_TITLE;
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();
const accordion = computed(() => globalStore.accordion);
const isCollapse = computed(() => globalStore.isCollapse);
const menuList = computed(() => authStore.showMenuListGet);
const isCustomer = computed(() => authStore.isCustomerGet);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));

const handleNotification = () => {
  router.push("/notification/index");
};

onMounted(async () => {
  await authStore.setRedTipCount();
  console.log(authStore.redTipCountGet);
});
</script>

<style scoped lang="scss">
@use "./index.scss" as *;

.menu-title {
  font-size: 13px;
  color: var(--el-menu-text-color);
  margin-left: 10px;
}

:deep(.el-scrollbar__view) {
  height: 100%;
}

.menu-item-notify {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  margin: 2px 0;
  font-size: 15px;
  color: var(--el-menu-text-color);

  &:hover {
    background-color: #343434;
  }

  .menu-icon {
    font-size: 16px;
    margin-right: 10px;
    min-width: 16px;
  }

  .menu-text {
    font-size: 14px;
    line-height: 1.4;
    margin: 0 auto 0 10px;
  }
}
</style>
