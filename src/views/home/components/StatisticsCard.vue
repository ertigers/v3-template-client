<template>
  <div class="statistics-card">
    <div class="card-header">
      <span class="card-title">{{ title }}</span>
      <el-icon v-if="showMore" class="more-icon" @click="handleMoreClick">
        <more-filled />
      </el-icon>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showMore: {
    type: Boolean,
    default: false
  }
});

// 定义事件
const emit = defineEmits(["moreClick"]);

// 处理更多按钮点击事件
const handleMoreClick = () => {
  emit("moreClick");
};
</script>

<style lang="scss" scoped>
.statistics-card {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 14px 24px;
  display: flex;
  flex-direction: column;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .card-title {
      font-size: 16px;
      font-weight: 500;
      color: #000000;
    }

    .more-icon {
      color: #999;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: all 0.2s ease;
      user-select: none;

      &:hover {
        color: var(--el-color-primary);
        background-color: rgba(64, 158, 255, 0.1);
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.95);
        background-color: rgba(64, 158, 255, 0.2);
      }
    }
  }

  .card-content {
    flex: 1;
  }
}
</style>
