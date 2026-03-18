<template>
  <div class="theme-setting">
    <i :class="'iconfont icon-zhuti'" class="toolBar-icon" @click="openDrawer" :title="$t('layouts.header.theme')"></i>
  </div>
</template>

<script setup>
import mittBus from "@/utils/mittBus";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const openDrawer = () => {
  mittBus.emit("openThemeDrawer");
};
</script>
