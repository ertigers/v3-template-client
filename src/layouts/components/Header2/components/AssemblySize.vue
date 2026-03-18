<template>
  <el-dropdown trigger="click" @command="setAssemblySize">
    <i :class="'iconfont icon-contentright'" class="toolBar-icon"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in assemblySizeList"
          :key="item.value"
          :command="item.value"
          :disabled="assemblySize === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const globalStore = useGlobalStore();
const assemblySize = computed(() => globalStore.assemblySize);

const assemblySizeList = computed(() => [
  { label: i18n.t("layouts.header.default"), value: "default" },
  { label: i18n.t("layouts.header.large"), value: "large" },
  { label: i18n.t("layouts.header.small"), value: "small" }
]);

const setAssemblySize = item => {
  if (assemblySize.value === item) return;
  globalStore.setGlobalState("assemblySize", item);
};
</script>
