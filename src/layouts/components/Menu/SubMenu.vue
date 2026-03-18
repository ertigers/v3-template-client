<template>
  <div>
    <div v-for="subItem in menuList" :key="subItem.path">
      <el-sub-menu v-if="subItem.children && subItem.children.length" :index="subItem.path">
        <template #title>
          <!-- <el-icon v-if="subItem.meta.icon">
            <component :is="subItem.meta.icon"></component>
          </el-icon> -->
          <svg-icon
            v-if="subItem.meta.icon"
            :name="subItem.meta.icon"
            :icon-style="{
              width: '20px',
              height: '20px'
            }"
          />
          <span class="sle">{{ $t(subItem.meta.title) }}</span>
          <span class="notification-badge" v-if="subItem.path === '/operations' && redTipCount.alarm > 0"></span>
        </template>
        <SubMenu :menu-list="subItem.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
        <!-- <el-icon v-if="subItem.meta.icon">
          <component :is="subItem.meta.icon"></component>
        </el-icon> -->
        <svg-icon
          v-if="subItem.meta.icon"
          :name="subItem.meta.icon"
          :icon-style="{
            width: '20px',
            height: '20px'
          }"
        />
        <template #title>
          <div style="display: flex; justify-content: space-between">
            <span class="sle">{{ $t(subItem.meta.title) }}</span>
            <span class="notification-text" v-if="subItem.path === '/operations/warning' && redTipCount.alarm > 0">{{
              redTipCount.alarm
            }}</span>
          </div>
        </template>
      </el-menu-item>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";
import { computed } from "vue";
const authStore = useAuthStore();

const redTipCount = computed(() => authStore.redTipCountGet);

const props = defineProps({
  menuList: {
    type: Array,
    required: true,
    default: () => []
  }
});

const router = useRouter();
const handleClickMenu = subItem => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  router.push(subItem.path);
};
</script>

<style lang="scss" scoped>
.sle {
  margin-left: 10px;
}
</style>

<style lang="scss">
.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color) !important;
  background-color: transparent !important;
}

.el-menu-item.is-active {
  color: var(--el-menu-hover-text-color);
}
.el-menu-item {
  height: 44px;
  &:hover {
    color: var(--el-menu-hover-text-color);
  }
}
.el-sub-menu .el-menu-item {
  height: 50px;
}

// 修复折叠状态下子菜单一级图标不显示的问题
.el-menu--collapse {
  .el-menu-item .el-menu-tooltip__trigger {
    display: flex;
    justify-content: center;
  }
  .el-sub-menu > .el-sub-menu__title {
    padding: 0 20px !important;
    justify-content: center !important;

    .svg-icon {
      margin-right: 0 !important;
      margin-left: 0 !important;
    }
    .sle {
      display: none !important;
    }
  }

  .el-sub-menu .el-sub-menu__icon-arrow {
    display: none !important;
  }

  .el-menu-item {
    padding: 0 20px !important;
    justify-content: center !important;

    .svg-icon {
      margin-right: 0 !important;
      margin-left: 0 !important;
    }
    .sle {
      display: none !important;
    }
  }
}

.el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title {
  color: var(--el-menu-hover-text-color) !important;
}

.notification-badge {
  width: 4px;
  height: 4px;
  background-color: #ff4757;
  border-radius: 50%;
  margin-left: 4px;
}

.notification-text {
  font-size: 10px;
  color: #ff4757;
  margin-left: 4px;
}
</style>
