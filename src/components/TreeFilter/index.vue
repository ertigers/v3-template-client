<template>
  <div class="card filter">
    <h4 v-if="title" class="title sle">
      {{ title }}
    </h4>
    <div class="search custom-element-css">
      <el-input v-model="filterText" :placeholder="searchPlaceholder" clearable :suffix-icon="Search" />
      <!-- <el-dropdown trigger="click">
        <el-icon size="20">
          <More />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toggleTreeNodes(true)">{{ $t("components.TreeFilter.expandAll") }}</el-dropdown-item>
            <el-dropdown-item @click="toggleTreeNodes(false)">{{ $t("components.TreeFilter.collapseAll") }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
    </div>
    <el-scrollbar :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
      <el-tree
        class="custom-tree"
        ref="treeRef"
        default-expand-all
        :node-key="id"
        :data="multiple ? treeData : treeAllData"
        :show-checkbox="multiple"
        :check-strictly="false"
        :current-node-key="!multiple ? selected : ''"
        :highlight-current="!multiple"
        :expand-on-click-node="false"
        :check-on-click-node="multiple"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :default-checked-keys="multiple ? selected : []"
        @node-click="handleNodeClick"
        @check="handleCheckChange"
      >
        <template #default="scope">
          <span class="el-tree-node__label tree-node-label">
            <slot :row="scope">
              <div class="tree-line tree-line-2" v-if="scope.node.level > 1 && !scope.node.data.children"></div>
              <div class="tree-ring" v-if="scope.node.level > 1 && !scope.node.data.children"></div>
              <div class="tree-line tree-line-3" v-if="scope.node.level > 2"></div>
              <div class="tree-line tree-line-4" v-if="scope.node.level > 3"></div>
              <div class="tree-line tree-line-5" v-if="scope.node.level > 4"></div>
              <div class="tree-line tree-line-6" v-if="scope.node.level > 5"></div>
              <div class="tree-line tree-line-7" v-if="scope.node.level > 6"></div>
              <el-icon v-if="scope.node.data.torg && scope.node.data.torg.type === 'DEALER'" class="tree-node-icon">
                <Shop />
              </el-icon>
              <el-icon v-else-if="scope.node.data.torg && scope.node.data.torg.type === 'INSTALLER'" class="tree-node-icon">
                <SvgIcon name="repair" :icon-style="{ width: '14px', height: '14px' }" />
              </el-icon>
              <el-icon v-else-if="scope.node.data.torg && scope.node.data.torg.type === 'NORMAL'" class="tree-node-icon">
                <UserFilled />
              </el-icon>
              <span class="text">{{ scope.node.label }}</span>
            </slot>
          </span>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script setup name="TreeFilter">
import { ref, watch, nextTick, onMounted } from "vue";
import { ElTree } from "element-plus";
import { More, Search } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const { t } = i18n;

import { $t } from "@/plugins/i18n.js";
import SvgIcon from "@/components/SvgIcon/index.vue";

const props = defineProps({
  id: {
    type: String,
    default: "id",
    required: false
  },
  title: {
    type: String,
    default: () => ""
  },
  searchPlaceholder: {
    type: String,
    default: () => $t("components.TreeFilter.search")
  },
  label: {
    type: String,
    default: "label"
  },
  multiple: {
    type: Boolean,
    default: false
  },
  defaultValue: {
    type: [String, Array],
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  },
  requestApi: {
    type: Function,
    default: () => {}
  }
});

const defaultProps = {
  children: "children",
  label: props.label
};

const treeRef = ref();
const treeData = ref([]);
const treeAllData = ref([]);

const selected = ref();
const setSelected = () => {
  if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
  else selected.value = typeof props.defaultValue === "string" ? props.defaultValue : "";
};

// 使用 nextTick 防止打包后赋值不生效，开发环境是正常的
watch(
  () => props.defaultValue,
  () => nextTick(() => setSelected()),
  { deep: true, immediate: true }
);

watch(
  () => props.data,
  () => {
    if (props.data) {
      treeData.value = props.data;
      treeAllData.value = [{ id: "", [props.label]: t("components.TreeFilter.all") }, ...props.data];
    }
  },
  { deep: true, immediate: true }
);

const filterText = ref("");
watch(filterText, val => {
  treeRef.value?.filter((val ?? "").toString().toLowerCase());
});

// 过滤
const filterNode = (value, data, node) => {
  const filterValue = (value ?? "").toString().toLowerCase();
  if (!filterValue) return true;
  let parentNode = node?.parent,
    labels = [node.label],
    level = 1;
  while (level < node.level) {
    labels = [...labels, parentNode?.label];
    parentNode = parentNode?.parent;
    level++;
  }
  return labels.some(label => (label ?? "").toString().toLowerCase().includes(filterValue));
};

// 切换树节点的展开或折叠状态
const toggleTreeNodes = isExpand => {
  let nodes = treeRef.value?.store.nodesMap;
  if (!nodes) return;
  for (const node in nodes) {
    if (nodes.hasOwnProperty(node)) {
      nodes[node].expanded = isExpand;
    }
  }
};

// emit
const emit = defineEmits(["change"]);

// 单选
const handleNodeClick = data => {
  console.log(data, props);

  if (props.multiple) return;
  // 再把data也传递出去
  emit("change", data[props.id], data);
};

// 多选
const handleCheckChange = () => {
  emit("change", treeRef.value?.getCheckedKeys());
};

onMounted(async () => {
  setSelected();
  if (props.data.length > 0) {
    treeData.value = props.data;
    treeAllData.value = [{ id: "", [props.label]: t("components.TreeFilter.all") }, ...props.data];
    return;
  }
  try {
    const response = await props.requestApi();
    if (!response) return;
    const { data } = response;
    treeData.value = data;
    treeAllData.value = [{ id: "", [props.label]: t("components.TreeFilter.all") }, ...data];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// 暴露给父组件使用
defineExpose({ treeData, treeAllData, treeRef });
</script>

<style scoped lang="scss">
@use "./index" as *;
</style>
