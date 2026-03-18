<template>
  <el-dropdown trigger="click" @command="changeLanguage" :teleported="false">
    <i class="toolBar-icon" :title="$t('layouts.header.language')">
      <svg-icon
        name="MenuLanguage"
        :icon-style="{
          width: '20px',
          height: '20px',
          color: textColor ? '#fff' : '#AEAEAE'
        }"
      />
      <span :class="['language-text', textColor ? 'language-text-color' : '']">{{ languageLabel }}</span>
      <el-icon :class="['arrow-icon', textColor ? 'arrow-icon-color' : '']"><ArrowDown /></el-icon>
    </i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languageList"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { ArrowDown } from "@element-plus/icons-vue";

const i18n = useI18n();
const globalStore = useGlobalStore();
const language = computed(() => globalStore.language);
const languageLabel = computed(() => languageList.find(item => item.value === language.value).label);

const languageList = [
  { label: "简体中文", value: "zh" },
  { label: "English", value: "en" }
];

const changeLanguage = lang => {
  i18n.locale.value = lang;
  globalStore.setGlobalState("language", lang);
};

const props = defineProps({
  textColor: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.toolBar-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  .language-text {
    margin-left: 5px;
    font-size: 14px;
  }
}
.language-text-color {
  color: #fff;
}
.arrow-icon-color {
  color: #fff;
}
</style>
