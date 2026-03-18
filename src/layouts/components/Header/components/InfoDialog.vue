<template>
  <el-dialog
    class="custom-dialog-element-css"
    v-model="dialogVisible"
    :title="$t('layouts.header.personalInfo')"
    width="800px"
    draggable
  >
    <div>
      <el-descriptions :title="$t('layouts.header.accountInfo')" :column="2">
        <el-descriptions-item :label="$t('layouts.header.loginAccount')">{{ userInfo.username }}</el-descriptions-item>
        <el-descriptions-item :label="$t('layouts.header.role')">
          <el-tag size="small" v-for="role in userInfo.roles" :key="role" class="role-tag">{{ role }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('layouts.header.lastLoginTime')">{{
          dayjs(userInfo.loginTime).format("YYYY-MM-DD HH:mm:ss") || $t("layouts.header.noRecord")
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('layouts.header.accountStatus')">
          <el-tag :type="userInfo.enabled ? 'success' : 'danger'">
            {{ userInfo.enabled ? $t("layouts.header.normal") : $t("layouts.header.disabled") }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :title="$t('layouts.header.userInfo')" :column="2">
        <el-descriptions-item :label="$t('layouts.header.username')">{{ userInfo2.nickname }}</el-descriptions-item>
        <el-descriptions-item :label="$t('layouts.header.phoneNumber')">{{
          userInfo2.tel || userInfo2.mobile
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('layouts.header.email')">{{ userInfo2.email }}</el-descriptions-item>
        <el-descriptions-item :label="$t('layouts.header.organization')">{{ userInfo.orgName }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button class="submit-btn" type="primary" @click="dialogVisible = false">{{ $t("global.confirm") }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/modules/user";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const dialogVisible = ref(false);
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo || {});
const userInfo2 = computed(() => userStore.userInfo.user || {});

const openDialog = () => {
  dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>

<style lang="scss" scoped>
.role-tag {
  margin-right: 5px;
}
</style>
