<template>
  <el-dialog
    class="custom-dialog-element-css"
    v-model="dialogVisible"
    :title="$t('layouts.header.passwordDialogTitle')"
    width="800px"
    draggable
    :close-on-click-modal="true"
    @closed="handleClose"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px" class="password-form">
      <el-form-item :label="$t('layouts.header.oldPassword')" prop="oldPassword">
        <el-input
          v-model="formData.oldPassword"
          type="password"
          :placeholder="$t('layouts.header.pleaseInputOldPassword')"
          show-password
        />
      </el-form-item>

      <el-form-item :label="$t('layouts.header.newPassword')" prop="newPassword">
        <el-input
          v-model="formData.newPassword"
          type="password"
          :placeholder="$t('layouts.header.pleaseInputNewPassword')"
          show-password
        />
        <div class="password-strength" v-if="formData.newPassword">
          <div class="strength-label">{{ $t("layouts.header.passwordStrength") }}:</div>
          <div class="strength-bars">
            <div v-for="i in 3" :key="i" class="strength-bar" :class="{ active: passwordStrength >= i }"></div>
          </div>
          <span class="strength-text">{{ strengthText }}</span>
        </div>
      </el-form-item>

      <el-form-item :label="$t('layouts.header.confirmPassword')" prop="confirmPassword">
        <el-input
          v-model="formData.confirmPassword"
          type="password"
          :placeholder="$t('layouts.header.pleaseConfirmPassword')"
          show-password
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button class="cancel-btn" @click="dialogVisible = false">{{ $t("global.cancel") }}</el-button>
        <el-button class="submit-btn" type="primary" :loading="loading" @click="handleSubmit">
          {{ $t("global.confirm") }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import AuthApi from "@/api/modules/auth";
const i18n = useI18n();
const dialogVisible = ref(false);
const loading = ref(false);
const formRef = ref(null);

// 表单数据
const formData = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
});

// 密码强度计算
const passwordStrength = computed(() => {
  const password = formData.value.newPassword;
  if (!password) return 0;

  let strength = 0;
  // 长度检查
  if (password.length >= 6) strength++;
  // 复杂度检查
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
  // 特殊字符检查
  if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength++;

  return strength;
});

// 密码强度文本
const strengthText = computed(() => {
  const strength = passwordStrength.value;
  const texts = [i18n.t("layouts.header.weak"), i18n.t("layouts.header.medium"), i18n.t("layouts.header.strong")];
  return texts[strength - 1] || "";
});

// 表单验证规则
const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error(i18n.t("layouts.header.passwordRequired")));
  } else {
    if (formData.value.confirmPassword !== "") {
      formRef.value?.validateField("confirmPassword");
    }
    callback();
  }
};

const validateConfirmPass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error(i18n.t("layouts.header.confirmPasswordRequired")));
  } else if (value !== formData.value.newPassword) {
    callback(new Error(i18n.t("layouts.header.passwordNotMatch")));
  } else {
    callback();
  }
};

const rules = {
  oldPassword: [{ required: true, message: i18n.t("layouts.header.oldPasswordRequired"), trigger: "blur" }],
  newPassword: [
    { required: true, validator: validatePass, trigger: "blur" },
    { min: 6, max: 16, message: i18n.t("layouts.header.passwordMinLength"), trigger: "blur" }
  ],
  confirmPassword: [{ required: true, validator: validateConfirmPass, trigger: "blur" }]
};

// 打开对话框
const openDialog = () => {
  dialogVisible.value = true;
};

// 关闭对话框
const handleClose = () => {
  formRef.value?.resetFields();
  formData.value = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  };
};

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();

    // 检查密码强度
    // if (passwordStrength.value < 1) {
    //   ElMessage.warning(i18n.t("layouts.header.passwordTooWeak"));
    //   return;
    // }

    loading.value = true;

    const res = await AuthApi.changePassword({
      oldPassword: formData.value.oldPassword,
      newPassword: formData.value.newPassword
    });

    if (res?.code === 0) {
      ElMessage.success(i18n.t("layouts.header.passwordChangeSuccess"));
      dialogVisible.value = false;
    }
  } catch (error) {
    console.error("Password change failed:", error);
  } finally {
    loading.value = false;
  }
};

defineExpose({ openDialog });
</script>

<style scoped lang="scss">
.password-form {
  padding: 20px 0;
}

.password-strength {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  .strength-label {
    font-size: 12px;
    color: #606266;
  }

  .strength-bars {
    display: flex;
    gap: 4px;

    .strength-bar {
      width: 40px;
      height: 4px;
      background-color: #e4e7ed;
      border-radius: 2px;

      &.active {
        &:nth-child(1) {
          background-color: #f56c6c;
        }
        &:nth-child(2) {
          background-color: #e6a23c;
        }
        &:nth-child(3) {
          background-color: #67c23a;
        }
      }
    }
  }

  .strength-text {
    font-size: 12px;
    color: #606266;
  }
}
</style>
