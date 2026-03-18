<template>
  <div class="not-container">
    <img src="@/assets/images/500.png" class="not-img" alt="500" />
    <div class="not-detail">
      <h2>500</h2>
      <h4>{{ $t("components.ErrorMessage.networkError") }}</h4>
      <el-button type="primary" @click="router.back"> {{ $t("components.ErrorMessage.goBack") }} </el-button>
    </div>
  </div>
</template>

<script setup name="500">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const router = useRouter();
</script>

<style scoped lang="scss">
@use "./index.scss" as *;
</style>
