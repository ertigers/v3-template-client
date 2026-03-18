<template>
  <div class="tool-bar-right">
    <div class="header-icons">
      <!-- 投屏 -->
      <!-- <div class="icon-item" @click="goToScreen">
        <svg-icon name="MenuHeaderScreen" :icon-style="{ width: '20px', height: '20px' }" />
      </div> -->

      <!-- 提醒 -->
      <div class="icon-item notification" :class="{ active: isActive('/notification/receiveList') }" @click="goToNotification">
        <svg-icon name="MenuHeaderRemind" :icon-style="{ width: '20px', height: '20px' }" />
        <span class="notification-badge" v-if="hasTip"></span>
      </div>

      <!-- 帮助 -->
      <div class="icon-item" :class="{ active: isActive('/helpDocument/index') }" @click="goToHelp">
        <svg-icon name="MenuHeaderHelp" :icon-style="{ width: '20px', height: '20px' }" />
      </div>

      <!-- 邮件 -->
      <div class="icon-item" :class="{ active: isActive('/feedback/index') }" @click="goToFeedback">
        <svg-icon name="MenuHeaderMail" :icon-style="{ width: '20px', height: '20px' }" />
      </div>

      <!-- 添加 -->
      <div class="icon-item add-btn" @click="goToCreate">
        <svg-icon name="MenuHeaderAdd" :icon-style="{ width: '20px', height: '20px', color: '#ffffff' }" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useStationStore } from "@/stores/modules/station";
import { useAuthStore } from "@/stores/modules/auth";
import { computed } from "vue";
const stationStore = useStationStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

let hasTip = computed(() => {
  return authStore.redTipCountGet.notice > 0;
});

// 判断当前路由是否激活指定路径
const isActive = path => route.path.startsWith(path);

// 投屏
const goToScreen = () => {
  router.push("/homeScreen/index");
};

// 通知提醒
const goToNotification = () => {
  router.push("/notification/receiveList");
};

// 帮助文档
const goToHelp = () => {
  router.push("/helpDocument/index");
};

// 意见反馈
const goToFeedback = () => {
  router.push("/feedback/index");
};

const goToCreate = async () => {
  // 清空pina中的数据
  await stationStore.createStationFn({}, true);
  router.push({
    path: "/station/create",
    query: {
      step: 0
    }
  });
};
</script>

<style scoped lang="scss">
.tool-bar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;

  .header-icons {
    display: flex;
    align-items: center;
    gap: 12px;

    .icon-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background-color: #f5f5f5;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: #e9e9e9;
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
          border: 2px solid #ffffff;
        }
      }

      &.active {
        color: #e01d46; // 让 svg-icon 继承 currentColor
        :deep(svg) {
          color: currentColor;
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
  }
}
</style>
