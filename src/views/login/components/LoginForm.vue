<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form-container">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" clearable :placeholder="$t('login.accountPlaceholder')" class="login-input">
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        :placeholder="$t('login.passwordPlaceholder')"
        show-password
        clearable
        autocomplete="new-password"
        class="login-input"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 记住密码和忘记密码 -->
    <div class="form-options">
      <div class="remember-me">
        <el-switch v-model="rememberMe" size="small" active-color="#ff4d4f" @change="handleRememberChange" />
        <span class="remember-text">{{ $t("login.remember") }}</span>
      </div>
      <!-- <el-link underline="never" @click="goForgotPassword" class="forgot-password">{{ $t("login.forgotPassword") }}</el-link> -->
    </div>

    <!-- 登录按钮 -->
    <el-form-item class="login-btn">
      <el-button type="primary" size="large" :loading="loading" @click="login(loginFormRef)" class="login-button">
        {{ $t("login.title") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config";
import { ElNotification, ElMessageBox } from "element-plus";
import authApi from "@/api/modules/auth";
import { useUserStore } from "@/stores/modules/user";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { CircleClose, Lock, User, UserFilled } from "@element-plus/icons-vue";
import md5 from "md5";
import { getTimeState } from "@/utils/index.js";
import { saveLoginInfo, loadLoginInfo, clearLoginInfo, isRememberTipShown, markRememberTipShown } from "@/utils/auth.js";
import { $t } from "@/plugins/i18n.js";

const router = useRouter();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();

const loginFormRef = ref();
const rememberMe = ref(false); // 记住密码状态

const loginRules = reactive({
  username: [{ required: true, message: $t("login.usernameRequired"), trigger: "blur" }],
  password: [{ required: true, message: $t("login.passwordRequired"), trigger: "blur" }]
});

const loading = ref(false);
const loginForm = reactive({
  username: "",
  password: "",
  authType: "password"
});

// 初始化登录信息
const initLoginInfo = () => {
  const savedInfo = loadLoginInfo();
  if (savedInfo) {
    loginForm.username = savedInfo.username;
    loginForm.password = savedInfo.password;
    rememberMe.value = savedInfo.remember;
  }
};

// 监听记住密码状态变化
const handleRememberChange = () => {
  if (!rememberMe.value) {
    // 如果取消记住密码，立即清除存储的信息
    clearLoginInfo();
  } else {
    // 首次选择记住密码时的安全提醒
    if (!isRememberTipShown()) {
      ElNotification({
        title: $t("login.securityTip"),
        message: $t("login.securityTipMessage"),
        type: "info",
        duration: 6000
      });
      markRememberTipShown();
    }
  }
};

const goForgotPassword = () => {
  router.push("/public/forgot-password");
};

// login
const login = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      const { data } = await authApi.login({ ...loginForm });
      userStore.setToken(data);

      // 登录成功后保存登录信息（如果勾选了记住密码）
      saveLoginInfo(
        {
          username: loginForm.username,
          password: loginForm.password
        },
        rememberMe.value
      );

      await initDynamicRouter();
      await tabsStore.setTabs([]);
      await keepAliveStore.setKeepAliveName([]);

      router.push(HOME_URL);
      // ElNotification({
      //   title: getTimeState(),
      //   message: `${$t("login.welcomeLogin")} ${loginForm.username}`,
      //   type: "success",
      //   duration: 3000
      // });
    } catch (error) {
      console.error("Login failed:", error);
      // 登录失败不保存密码信息
    } finally {
      loading.value = false;
    }
  });
};

onMounted(() => {
  // 页面加载时读取记住的登录信息
  initLoginInfo();

  document.onkeydown = e => {
    if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
      if (loading.value) return;
      login(loginFormRef.value);
    }
  };
});

onBeforeUnmount(() => {
  document.onkeydown = null;
});
</script>

<style scoped lang="scss">
:deep(.el-form-item__error) {
  padding-left: 40px;
  top: 80%;
}

.login-form-container {
  width: 100%;

  .login-input {
    margin-bottom: 20px;

    :deep(.el-input__wrapper) {
      padding: 10px 20px;
      border-radius: 40px;
      border: 1px solid #e0e0e0;
      box-shadow: none;

      &:hover {
        border-color: #ccc;
      }

      &.is-focus {
        border-color: #409eff;
        box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
      }
    }

    :deep(.el-input__inner) {
      font-size: 16px;
      color: #333;

      &::placeholder {
        color: #ccc;
      }
    }
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;

    .remember-me {
      display: flex;
      align-items: center;
      gap: 8px;

      .remember-text {
        font-size: 14px;
        color: #666;
      }
    }

    .forgot-password {
      color: var(--theme-color-red);
      font-size: 14px;
      text-decoration: none;
    }
  }

  .login-btn {
    margin-bottom: 24px;

    .login-button {
      width: 100%;
      height: 48px;
      background: #000;
      border: none;
      border-radius: 24px;
      font-size: 16px;
      font-weight: 500;

      &:hover {
        background: #333;
      }
    }
  }

  .form-links {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;

    .register-link,
    .demo-link {
      font-size: 14px;
      color: #666;
      text-decoration: none;

      &:hover {
        color: var(--theme-color-red);
        text-decoration: none;
      }
    }
  }
}
</style>
