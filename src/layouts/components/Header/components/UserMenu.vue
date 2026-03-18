<template>
  <div>
    <el-popover :placement="placement" :width="160" popper-class="user-popover">
      <template #reference>
        <div class="toolBar-icon user-trigger">
          <svg-icon
            name="MenuUser"
            :icon-style="{
              width: '20px',
              height: '20px',
              color: textColor ? '#fff' : '#AEAEAE'
            }"
          />
          <span v-if="!collapse" :class="['user-text', textColor ? 'user-text-color' : '']">{{ username }}</span>
          <el-icon v-if="!collapse" :class="['arrow-icon', textColor ? 'arrow-icon-color' : '']"><ArrowDown /></el-icon>
        </div>
      </template>

      <div class="user-menu">
        <div class="user-menu-item-title">
          <div>{{ username }}</div>
          <div>{{ userType }}</div>
        </div>
        <div class="user-menu-item" @click="openUserInfoPage">
          <svg-icon
            class="menu-icon"
            name="MenuUser"
            :icon-style="{
              width: '16px',
              height: '16px'
            }"
          />
          <span class="menu-text">{{ $t("layouts.header.personalData") }}</span>
        </div>
        <!-- <div class="user-menu-item" @click="openDialog('passwordRef')">
          <svg-icon
            class="menu-icon"
            name="MenuMailEdit"
            :icon-style="{
              width: '16px',
              height: '16px'
            }"
          />
          <span class="menu-text">{{ $t("layouts.header.changePassword") }}</span>
        </div> -->
        <div class="user-menu-item logout-item" @click="logout">
          <svg-icon
            class="menu-icon"
            name="MenuLogout"
            :icon-style="{
              width: '16px',
              height: '16px'
            }"
          />
          <span class="menu-text">{{ $t("layouts.header.logout") }}</span>
        </div>
      </div>
    </el-popover>

    <!-- infoDialog -->
    <InfoDialog ref="infoRef"></InfoDialog>
    <!-- passwordDialog -->
    <PasswordDialog ref="passwordRef"></PasswordDialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ElMessageBox, ElMessage } from "element-plus";
import { ArrowRight } from "@element-plus/icons-vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useUserStore } from "@/stores/modules/user";
import authApi from "@/api/modules/auth";
import { LOGIN_URL } from "@/config";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";

const i18n = useI18n();
const router = useRouter();
const userStore = useUserStore();
const username = computed(() => userStore.userInfo.username);
const userType = computed(() => {
  if (userStore.userInfo.roles.includes("admin")) {
    return "admin";
  } else if (userStore.userInfo.roles.includes("admin-factory")) {
    return "admin-factory";
  } else if (userStore.userInfo.roles.includes("dealer")) {
    return "dealer";
  } else if (userStore.userInfo.roles.includes("installer")) {
    return "installer";
  } else if (userStore.userInfo.roles.includes("terminal")) {
    return "terminal";
  } else {
    return "-";
  }
});

// 退出登录
const logout = () => {
  ElMessageBox.confirm(i18n.t("layouts.header.logoutConfirm"), i18n.t("layouts.header.tip"), {
    confirmButtonText: i18n.t("layouts.header.confirm"),
    cancelButtonText: i18n.t("layouts.header.cancel"),
    type: "warning"
  }).then(async () => {
    // 1.执行退出登录接口
    await authApi.logout();

    // 2.清除 Token
    userStore.setToken("");

    // 3.重定向到登陆页
    await router.replace(LOGIN_URL);
    ElMessage.success(i18n.t("layouts.header.logoutSuccess"));
  });
};

// 打开修改密码和个人信息弹窗
const infoRef = ref(null);
const passwordRef = ref(null);
const openUserInfoPage = () => {
  router.push("/userInfo/index");
};
const openDialog = ref => {
  if (ref === "infoRef") infoRef.value?.openDialog();
  if (ref === "passwordRef") passwordRef.value?.openDialog();
};

const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String,
    default: "right"
  },
  textColor: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.user-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 6px;
  transition: all 0.3s ease;

  /* &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  } */

  .user-text {
    margin: 0 8px 0 6px;
    font-size: 15px;
    color: var(--el-menu-text-color);
    margin-right: auto;
    margin-left: 10px;
  }

  .arrow-icon {
    font-size: 18px;
    transition: transform 0.3s ease;
    color: var(--el-menu-text-color);
  }

  .user-text-color,
  .arrow-icon-color {
    color: #fff;
  }
}

.user-menu {
  padding: 6px 0;
  .user-menu-item-title {
    padding: 10px 16px;
    border-bottom: 1px solid var(--el-border-color-lighter);

    > div:first-child {
      font-size: 16px;
      color: rgb(0, 0, 0);
    }

    > div:last-child {
      font-size: 12px;
      color: rgb(203, 203, 203);
    }
  }

  .user-menu-item {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 4px;
    margin: 2px 0;

    &:hover {
      background-color: var(--el-fill-color-light);
    }

    &.logout-item {
      margin-top: 8px;
      padding-top: 12px;

      &:hover {
        background-color: #fef0f0;
        color: var(--el-color-danger);

        .menu-icon {
          color: var(--el-color-danger);
        }
        .menu-text {
          color: var(--el-color-danger);
        }
      }
    }

    .menu-icon {
      font-size: 16px;
      color: var(--el-text-color-regular);
      margin-right: 8px;
      min-width: 16px;
    }

    .menu-text {
      font-size: 14px;
      line-height: 1.4;
      color: var(--el-text-color-primary);
    }
  }
}
</style>

<style lang="scss">
.user-popover {
  padding: 0 !important;
  border-radius: 8px !important;
  border: 1px solid var(--el-border-color-light) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;

  .el-popper__arrow::before {
    border-bottom-color: var(--el-border-color-light) !important;
  }
}
</style>
