<template>
  <div class="login-top">
    <img v-if="isWhite" class="login-icon" src="@/assets/images/logo-w.png" alt="" @click="goToLogin" />
    <img v-else class="login-icon" src="@/assets/images/logo-b.svg" alt="" @click="goToLogin" />
    <el-popover v-if="!onlyShowLanguage" placement="bottom" :width="320" trigger="hover" popper-class="download-app-popover">
      <template #reference>
        <div class="router">{{ $t("login.downloadApp") }}</div>
      </template>
      <div class="download-app-content">
        <div class="qr-codes">
          <div class="qr-item">
            <div class="qr-code">
              <!-- iOS二维码 -->
              <img src="@/assets/images/iosApp.png" alt="iOS App" class="qr-image" />
            </div>
            <div class="qr-label">iOS App {{ $t("global.download") }}</div>
          </div>
          <div class="qr-item">
            <div class="qr-code">
              <!-- Android二维码 -->
              <img src="@/assets/images/androidApp.png" alt="Android App" class="qr-image" />
            </div>
            <div class="qr-label">Android App {{ $t("global.download") }}</div>
          </div>
        </div>
      </div>
    </el-popover>
    <div v-if="!onlyShowLanguage" class="router" @click="goWarrantyQuery">{{ $t("login.warrantyQuery") }}</div>
    <div v-if="!onlyShowLanguage" class="router" @click="goWarrantyRegister">{{ $t("login.warrantyRegister") }}</div>
    <Language id="language" style="margin-left: 20px" />
  </div>
</template>

<script setup name="loginHeader">
import Language from "@/layouts/components/Header/components/Language.vue";
import { useRouter } from "vue-router";
const router = useRouter();

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

const goToLogin = () => router.push("/public/login");
const goWarrantyQuery = () => router.push("/public/warranty-query");
const goWarrantyRegister = () => router.push("/public/warranty-register");
</script>

<style scoped lang="scss">
.login-top {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  background-color: transparent;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  z-index: 999;

  img {
    margin-right: auto;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  .router {
    color: #666666;
    padding: 0 20px;
    font-size: 14px;
    cursor: pointer;

    border-right: 2px solid #e0e0e0;

    &:hover {
      color: var(--theme-color-red);
    }
  }
}

// 下载APP弹窗样式
:deep(.download-app-popover) {
  padding: 20px !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
}

.download-app-content {
  text-align: center;

  .qr-codes {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    gap: 20px;

    .qr-item {
      flex: 1;

      .qr-code {
        width: 120px;
        height: 120px;
        background-color: #f5f5f5;
        border-radius: 8px;
        margin: 0 auto 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #e0e0e0;

        .qr-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }
      }

      .qr-label {
        font-size: 14px;
        color: #333;
        font-weight: 500;
      }
    }
  }
}
</style>
