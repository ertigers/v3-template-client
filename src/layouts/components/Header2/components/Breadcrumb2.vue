<template>
  <div class="breadcrumb-box">
    <!-- 如果当前路由 meta.isHide 为 true，显示返回箭头 -->
    <div v-if="route.meta.isHide && !route.meta.isNotBack" class="back-arrow" @click="goToHome">
      <el-icon class="arrow-icon">
        <ArrowLeft />
      </el-icon>
    </div>

    <!-- 显示当前路由的 title -->
    <div class="current-title">
      <span>{{ $t(route.meta.title) }}</span>
    </div>
  </div>
</template>

<script setup>
import { HOME_URL } from "@/config";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();

// 返回首页
const goToHome = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push(HOME_URL);
  }
};
</script>

<style scoped lang="scss">
.breadcrumb-box {
  display: flex;
  align-items: center;
  gap: 12px;

  .back-arrow {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--el-color-primary-light-9);
    }

    .arrow-icon {
      font-size: 16px;
      color: var(--el-header-text-color);

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  .current-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--el-header-text-color);

    span {
      line-height: 1.4;
    }
  }
}
</style>
