<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <LoginHeader />
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_bg.png" alt="login" />
      </div>
      <div class="login-right">
        <div class="login-form">
          <h2 class="logo-text">{{ $t("login.welcome") }}</h2>
          <LoginForm />
        </div>
      </div>
      <div class="login-bottom">
        <div class="bottom-content">
          <div class="bottom-links">
            <span @click="goPrivacyPolicy" class="link">{{ $t("login.privacyPolicy") }}</span>
            <span class="divider">|</span>
            <span class="copyright">{{ $t("login.copyright") }}</span>
          </div>
          <!-- <div class="browser-tip">
            {{ $t("login.browserTip") }}
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="login">
import LoginForm from "./components/LoginForm.vue";
import LoginHeader from "./components/LoginHeader.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goPrivacyPolicy = () => {
  router.push("/public/privacy-policy");
};
</script>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #e5e5e5;
  position: relative;
}

.login-left {
  flex: 1.2;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 600px;

  .login-left-img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
  }
}

.login-right {
  flex: 1;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 480px;

  .login-form {
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: 90%;
    position: relative;
    margin-top: -100px;
  }

  .logo-text {
    font-size: 40px;
    font-weight: 600;
    margin: 0;
    color: #000000;
    margin-bottom: 20px;
    text-align: left;
  }
}

.login-bottom {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 45.5%;
  background: transparent;
  padding: 32px 0;
  z-index: 10;

  .bottom-content {
    text-align: center;

    .bottom-links {
      margin-bottom: 16px;

      .link {
        font-size: 14px;
        color: #666;
        cursor: pointer;

        &:hover {
          color: var(--theme-color-red);
        }
      }

      .divider {
        margin: 0 16px;
        color: #ccc;
      }

      .copyright {
        font-size: 14px;
        color: #666;
      }
    }

    .browser-tip {
      font-size: 12px;
      color: #999;
      line-height: 1.5;
    }
  }
}

@media screen and (max-width: 1250px) {
  .login-left {
    display: none;
  }

  .login-bottom {
    width: 100%;
  }
}

@media screen and (max-width: 600px) {
  .login-form {
    width: 97% !important;
  }

  .login-bottom {
    .bottom-content {
      padding: 0 20px;
    }
  }
}
</style>
