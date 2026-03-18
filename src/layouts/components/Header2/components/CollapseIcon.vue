<template>
  <el-icon
    class="collapse-icon"
    @click="changeCollapse"
    :title="i18n.t(globalStore.isCollapse ? 'layouts.header.expand' : 'layouts.header.collapse')"
  >
    <component :is="globalStore.isCollapse ? 'ArrowRightBold' : 'ArrowLeftBold'"></component>
  </el-icon>
</template>

<script setup>
import { useGlobalStore } from "@/stores/modules/global";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const globalStore = useGlobalStore();
const changeCollapse = () => globalStore.setGlobalState("isCollapse", !globalStore.isCollapse);
</script>

<style scoped lang="scss">
.collapse-icon {
  padding: 2px;
  font-size: 14px;
  color: #1d1d1d;
  cursor: pointer;
  border-radius: 50%;
  background-color: #666666;
}
</style>
