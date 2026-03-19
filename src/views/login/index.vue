<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-form">
        <h2 class="logo-text">{{ $t("login.welcome") }}</h2>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup name="login">
import LoginForm from "./components/LoginForm.vue";
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
  width: 440px;
  max-width: calc(100vw - 40px);
  background: #fff;
  border-radius: 12px;
  padding: 48px 32px 36px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.logo-text {
  font-size: 40px;
  font-weight: 600;
  margin: 0 0 20px;
  color: #000000;
  text-align: left;
}

@media screen and (max-width: 600px) {
  .login-box {
    padding: 32px 20px 24px;
  }
}
</style>
