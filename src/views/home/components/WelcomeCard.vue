<template>
  <div class="welcome-card">
    <div class="welcome-content">
      <div class="welcome-text">
        <h2 class="welcome-title">{{ $t("home.welcome.title") }}</h2>
        <div class="user-greeting">
          <span class="username">{{ userInfo.username }}</span>
          <span class="wave-emoji"><img src="@/assets/images/welcome-head.png" alt="" srcset="" /></span>
        </div>
      </div>
      <div class="welcome-action">
        <el-button type="primary" class="create-station-btn" @click="createStation">{{
          $t("home.welcome.createStation")
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStationStore } from "@/stores/modules/station";
import { useUserStore } from "@/stores/modules/user";

const stationStore = useStationStore();
const userInfo = useUserStore().userInfo;

// 路由跳转--创建电站
const router = useRouter();
const createStation = async () => {
  // 清空pina中的数据
  stationStore.createStationFn({}, true);
  router.push({
    path: "/station/create",
    query: {
      step: 0
    }
  });
};
</script>

<style lang="scss" scoped>
.welcome-card {
  background-color: #eaeaea;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  .welcome-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .welcome-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      .welcome-title {
        font-size: 24px;
        font-weight: 500;
        color: #000000;
        margin: 0;
        line-height: 1.2;
      }

      .user-greeting {
        display: flex;
        align-items: center;
        gap: 8px;

        .username {
          font-size: 24px;
          font-weight: 500;
          color: #000000;
        }

        .wave-emoji {
          img {
            width: 24px;
            height: 24px;
          }
        }
      }
    }

    .welcome-action {
      .create-station-btn {
        background-color: #000000;
        border-color: #000000;
        color: #fff;
        border-radius: 24px;
        padding: 18px 24px;
        font-size: 14px;
        font-weight: 500;
        width: 240px;

        &:hover {
          background-color: #555;
          border-color: #555;
        }

        &:active {
          background-color: #222;
          border-color: #222;
        }
      }
    }
  }
}
</style>
