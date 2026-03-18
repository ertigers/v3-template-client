<template>
  <div class="customer-header">
    <div class="header-content">
      <img class="login-icon" src="@/assets/images/logo-w.svg" alt="" @click="goToHome" />
      <div style="flex: 1"></div>

      <!-- 提醒 -->
      <div class="icon-item notification" :class="{ active: isActive('/notification/receiveList') }" @click="goToNotification">
        <svg-icon name="MenuHeaderRemind" :icon-style="{ width: '20px', height: '20px', color: '#fff' }" />
        <span class="notification-badge" v-if="hasTip"></span>
      </div>

      <!-- 帮助 -->
      <div class="icon-item" :class="{ active: isActive('/helpDocument/index') }" @click="goToHelp">
        <svg-icon name="MenuHeaderHelp" :icon-style="{ width: '20px', height: '20px', color: '#fff' }" />
      </div>

      <!-- 邮件 -->
      <div class="icon-item" :class="{ active: isActive('/feedback/index') }" @click="goToFeedback">
        <svg-icon name="MenuHeaderMail" :icon-style="{ width: '20px', height: '20px', color: '#fff' }" />
      </div>
      <div class="icon-item icon-item-language">
        <Language id="language" :text-color="true" />
      </div>
      <div class="icon-item icon-item-user">
        <UserMenu :placement="'bottom'" :text-color="true" />
      </div>
    </div>
  </div>
</template>

<script setup name="loginHeader">
import { computed } from "vue";

import Language from "@/layouts/components/Header/components/Language.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";
import UserMenu from "@/layouts/components/Header/components/UserMenu.vue";
const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

let hasTip = computed(() => {
  return authStore.redTipCountGet.notice > 0;
});

// 判断当前路由是否激活指定路径
const isActive = path => route.path.startsWith(path);

const props = defineProps({
  isWhite: {
    type: Boolean,
    default: true
  },
  onlyShowLanguage: {
    type: Boolean,
    default: false
  }
});

const goToHome = () => router.push("/home/customer");
const goToNotification = () => router.push("/notification/receiveList");
const goToHelp = () => router.push("/helpDocument/index");
const goToFeedback = () => router.push("/feedback/index");
</script>

<style scoped lang="scss">
.customer-header {
  box-sizing: border-box;
  width: 100vw;
  background-color: #1d1d1d;
  height: 55px;
  display: flex;
  align-items: center;
  .header-content {
    width: 1600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  img {
    margin-right: auto;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  .icon-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background-color: #313131;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #474747;
    }

    // 提醒图标特殊样式
    &.notification {
      .notification-badge {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 4px;
        height: 4px;
        background-color: #ff4757;
        border-radius: 50%;
      }
    }

    &.active {
      color: #e01d46 !important; // 让 svg-icon 继承 currentColor
      :deep(svg) {
        color: #e01d46 !important;
        fill: currentColor;
      }
    }

    // 添加按钮特殊样式
    &.add-btn {
      background-color: #e01d46;

      &:hover {
        background-color: #eb6455;
      }
    }
  }
  .icon-item-language {
    width: 110px;

    .language-text {
      color: #fff !important;
    }
  }

  .icon-item-user {
    width: auto;
  }
}
</style>
