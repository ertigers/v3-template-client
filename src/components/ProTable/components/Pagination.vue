<template>
  <!-- 分页组件 -->
  <el-pagination
    :background="false"
    :current-page="pageable.pageNumber"
    :page-size="pageable.pageSize"
    :page-sizes="[10, 25, 50, 100]"
    :total="pageable.total"
    layout="total, prev, pager, next, sizes,jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script setup name="Pagination">
const props = defineProps({
  pageable: {
    type: Object,
    default: () => {}
  },
  handleSizeChange: {
    type: Function,
    default: () => {}
  },
  handleCurrentChange: {
    type: Function,
    default: () => {}
  }
});
</script>
