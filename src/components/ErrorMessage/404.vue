<template>
  <div class="not-container">
    <img src="@/assets/images/404.png" class="not-img" alt="404" />
    <div class="not-detail">
      <h2>404</h2>
      <h4>{{ $t("components.ErrorMessage.pageNotFound") }}</h4>
      <el-button type="primary" @click="router.back"> {{ $t("components.ErrorMessage.goBack") }} </el-button>
    </div>
  </div>
</template>

<script setup name="404">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const router = useRouter();
</script>

<style scoped lang="scss">
@use "./index.scss" as *;
</style>
