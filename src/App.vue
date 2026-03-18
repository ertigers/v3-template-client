<template>
  <el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import { getBrowserLang } from "@/utils";
import { useTheme } from "@/hooks/useTheme";
import { ElConfigProvider } from "element-plus";
import { useGlobalStore } from "@/stores/modules/global";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const globalStore = useGlobalStore();
const BASE_SCREEN_WIDTH = 1920;

// 原比例缩放：S：基础上缩小一些，L：基础上放大一些
const updateScreenScale = () => {
  console.log(window.screen.width);
  const currentWidth = window.screen.width || BASE_SCREEN_WIDTH;
  const scale = currentWidth / BASE_SCREEN_WIDTH;
  const scaleS = currentWidth === BASE_SCREEN_WIDTH ? 1 : currentWidth / (BASE_SCREEN_WIDTH * 1.1);
  const scaleL = currentWidth === BASE_SCREEN_WIDTH ? 1 : currentWidth / (BASE_SCREEN_WIDTH * 0.9);
  globalStore.setGlobalState("screenScale", scale);
  document.documentElement.style.setProperty("--screen-scale", String(scale));
  document.documentElement.style.setProperty("--screen-scale-s", String(scaleS));
  document.documentElement.style.setProperty("--screen-scale-l", String(scaleL));
};

// init theme
const { initTheme } = useTheme();
initTheme();

// init language
const i18n = useI18n();
onMounted(() => {
  updateScreenScale();
  window.addEventListener("resize", updateScreenScale);
  const language = globalStore.language ?? getBrowserLang();
  i18n.locale.value = language;
  globalStore.setGlobalState("language", language);
  // 定制化方案颜色-防止local影响---lv-Doing
  globalStore.setGlobalState("primary", "#E01D46");
  globalStore.setGlobalState("layout", "vertical");
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenScale);
});

// element language
const locale = computed(() => {
  if (globalStore.language === "zh") return zhCn;
  if (globalStore.language === "en") return en;
  return getBrowserLang() === "zh" ? zhCn : en;
});

// element assemblySize
const assemblySize = computed(() => globalStore.assemblySize);

// element button config
const buttonConfig = reactive({ autoInsertSpace: false });
</script>
