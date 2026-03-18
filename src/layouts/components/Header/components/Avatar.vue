<template>
  <div>
    <el-dropdown trigger="click">
      <div class="avatar">
        <el-image
          v-if="userInfo2?.img"
          :src="getImageUrl(userInfo2?.img, 'user')"
          :preview-src-list="[]"
          fit="cover"
          @error="handleImageError"
        >
          <template #error>
            <div class="image-error">
              <img src="@/assets/images/avatar.svg" alt="avatar" />
            </div>
          </template>
        </el-image>
        <img v-else src="@/assets/images/avatar.svg" alt="avatar" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="openDialog('infoRef')">
            <el-icon> <User /> </el-icon>{{ $t("layouts.header.personalData") }}
          </el-dropdown-item>
          <el-dropdown-item @click="openDialog('passwordRef')">
            <el-icon> <Edit /> </el-icon>{{ $t("layouts.header.changePassword") }}
          </el-dropdown-item>
          <el-dropdown-item divided @click="logout">
            <el-icon> <SwitchButton /> </el-icon>{{ $t("layouts.header.logout") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- infoDialog -->
    <InfoDialog ref="infoRef"></InfoDialog>
    <!-- passwordDialog -->
    <PasswordDialog ref="passwordRef"></PasswordDialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { LOGIN_URL } from "@/config";
import { useRouter } from "vue-router";
import authApi from "@/api/modules/auth";
import { useUserStore } from "@/stores/modules/user";
import { ElMessageBox, ElMessage } from "element-plus";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";
import { getImageUrl } from "@/api/modules/upload";
import { Edit, SwitchButton, User } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const router = useRouter();
const userStore = useUserStore();
const userInfo2 = computed(() => userStore.userInfo.user || {});

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
const openDialog = ref => {
  if (ref === "infoRef") infoRef.value?.openDialog();
  if (ref === "passwordRef") passwordRef.value?.openDialog();
};

// 处理图片加载失败
const handleImageError = () => {
  // ElMessage.warning(i18n.t("layouts.header.avatarLoadFailed"));
};
</script>

<style scoped lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;

  :deep(.el-image) {
    width: 100%;
    height: 100%;
  }

  .image-error {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;

    img {
      width: 24px;
      height: 24px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
