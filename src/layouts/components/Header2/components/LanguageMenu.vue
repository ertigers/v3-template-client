<template>
  <el-popover placement="right" :width="120" popper-class="language-popover">
    <template #reference>
      <div class="toolBar-icon language-trigger" :title="$t('layouts.header.language')">
        <svg-icon
          name="MenuLanguage"
          :icon-style="{
            width: '20px',
            height: '20px',
            color: '#AEAEAE'
          }"
        />
        <!-- <span class="language-text">{{ languageLabel }}</span> -->
        <span v-if="!collapse" class="language-text">{{ $t("layouts.menu.language") }}</span>
        <el-icon v-if="!collapse" class="arrow-icon"><ArrowRight /></el-icon>
      </div>
    </template>

    <div class="language-menu">
      <div
        v-for="item in languageList"
        :key="item.value"
        class="language-item"
        :class="{ active: language === item.value }"
        @click="changeLanguage(item.value)"
      >
        <span class="language-name">{{ item.label }}</span>
        <el-icon v-if="language === item.value" class="check-icon">
          <Check />
        </el-icon>
      </div>
    </div>
  </el-popover>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { ArrowRight, Check } from "@element-plus/icons-vue";
import { useGlobalStore } from "@/stores/modules/global";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { color } from "echarts";

const i18n = useI18n();
const globalStore = useGlobalStore();
const language = computed(() => globalStore.language);
const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
});
const languageList = [
  { label: "简体中文", value: "zh" },
  { label: "English", value: "en" }
];

const changeLanguage = lang => {
  i18n.locale.value = lang;
  globalStore.setGlobalState("language", lang);
};
</script>

<style lang="scss" scoped>
.language-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .language-text {
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
}

.language-menu {
  padding: 8px 0;

  .language-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 4px;
    margin: 2px 0;

    &:hover {
      background-color: var(--el-fill-color-light);
    }

    &.active {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);

      .language-name {
        font-weight: 500;
      }
    }

    .language-name {
      font-size: 14px;
      line-height: 1.4;
    }

    .check-icon {
      font-size: 16px;
      color: var(--el-color-primary);
    }
  }
}
</style>

<style lang="scss">
.language-popover {
  padding: 0 !important;
  border-radius: 8px !important;
  border: 1px solid var(--el-border-color-light) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;

  .el-popper__arrow::before {
    border-bottom-color: var(--el-border-color-light) !important;
  }
}
</style>
