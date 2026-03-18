<template>
  <el-dialog
    v-model="visible"
    :title="dialogTitle"
    :width="dialogWidth"
    :before-close="handleClose"
    class="custom-show-dialog"
    destroy-on-close
  >
    <div class="dialog-content">
      <slot></slot>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleClose" class="close-btn">
          {{ $t("global.close") }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from "vue";
import { $t } from "@/plugins/i18n.js";

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ""
  },
  dialogWidth: {
    type: String,
    default: "480px"
  }
});

// 计算标题
const dialogTitle = computed(() => props.title);

// Emits
const emit = defineEmits(["update:modelValue"]);

// 控制弹窗显示
const visible = computed({
  get: () => props.modelValue,
  set: value => emit("update:modelValue", value)
});

// 关闭弹窗
const handleClose = () => {
  visible.value = false;
};
</script>

<style lang="scss" scoped>
// 通用展示弹窗样式
.custom-show-dialog {
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    padding: 0px 10px;

    .close-btn {
      min-width: 120px;
      height: 36px;
      border-radius: 40px;
      background: var(--theme-color-red);
      border-color: var(--theme-color-red);
      color: white;
      font-size: 13px;

      &:hover {
        background: var(--theme-color-red-hover);
        border-color: var(--theme-color-red-hover);
      }
    }
  }
}
</style>
