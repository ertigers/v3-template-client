<template>
  <div class="permission-page">
    <el-card shadow="never" class="module-card">
      <template #header>
        <div class="card-header">
          <span>Permission Management</span>
          <el-tag type="info">IAM Module</el-tag>
        </div>
      </template>
      <div class="overview-grid">
        <div class="overview-item">
          <div class="overview-label">Total Permissions</div>
          <div class="overview-value">{{ permissionStats.total }}</div>
        </div>
        <div class="overview-item">
          <div class="overview-label">Enabled</div>
          <div class="overview-value">{{ permissionStats.enabled }}</div>
        </div>
        <div class="overview-item">
          <div class="overview-label">Disabled</div>
          <div class="overview-value">{{ permissionStats.disabled }}</div>
        </div>
        <div class="overview-item">
          <div class="overview-label">Modules</div>
          <div class="overview-value">{{ moduleCount }}</div>
        </div>
      </div>
    </el-card>

    <div class="main-grid">
      <el-card shadow="never" class="tree-card">
        <template #header>
          <div class="card-header">
            <span>Module Tree</span>
            <el-button text @click="resetModuleFilter">Reset</el-button>
          </div>
        </template>
        <el-tree :data="moduleTree" node-key="id" default-expand-all highlight-current @node-click="handleModuleClick" />
      </el-card>

      <el-card shadow="never" class="list-card">
        <template #header>
          <div class="card-header">
            <span>Permission List</span>
            <div class="header-actions">
              <el-button v-permission="'iam:permission:create'" type="primary" @click="openCreateDialog">
                New Permission
              </el-button>
              <el-button
                v-permission="'iam:permission:update'"
                :disabled="!multipleSelection.length"
                @click="handleBatchStatus(1)"
              >
                Enable Selected
              </el-button>
              <el-button
                v-permission="'iam:permission:update'"
                :disabled="!multipleSelection.length"
                @click="handleBatchStatus(0)"
              >
                Disable Selected
              </el-button>
            </div>
          </div>
        </template>

        <el-form :inline="true" :model="query" class="query-form">
          <el-form-item label="Keyword">
            <el-input v-model="query.keyword" clearable placeholder="Code / Name" @keyup.enter="loadPermissions" />
          </el-form-item>
          <el-form-item label="Status">
            <el-select v-model="query.status" clearable placeholder="All" style="width: 150px">
              <el-option label="Enabled" :value="1" />
              <el-option label="Disabled" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadPermissions">Search</el-button>
            <el-button @click="resetFilters">Reset</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="tableData" v-loading="loading" border @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="48" />
          <el-table-column prop="code" label="Code" min-width="190" />
          <el-table-column prop="name" label="Name" min-width="160" />
          <el-table-column prop="module" label="Module" min-width="160" />
          <el-table-column prop="type" label="Type" width="90">
            <template #default="{ row }">
              <el-tag size="small" :type="row.type === 'menu' ? 'success' : row.type === 'button' ? '' : 'warning'">
                {{ row.type }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" width="100">
            <template #default="{ row }">
              <el-switch
                :model-value="row.status === 1"
                @change="value => handleStatusSwitch(row, value)"
                v-permission="'iam:permission:update'"
              />
              <el-tag v-if="!canEditStatus" size="small" :type="row.status === 1 ? 'success' : 'info'">
                {{ row.status === 1 ? "Enabled" : "Disabled" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="updatedAt" label="Updated At" width="170" />
          <el-table-column prop="description" label="Description" min-width="220" show-overflow-tooltip />
          <el-table-column label="Actions" width="180" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="openEditDialog(row)" v-permission="'iam:permission:update'">
                Edit
              </el-button>
              <el-button link type="danger" @click="handleDelete(row)" v-permission="'iam:permission:delete'"> Delete </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pager">
          <el-pagination
            v-model:current-page="query.pageNum"
            v-model:page-size="query.pageSize"
            :page-sizes="[10, 20, 50]"
            background
            layout="total, sizes, prev, pager, next"
            :total="total"
            @change="loadPermissions"
          />
        </div>
      </el-card>
    </div>

    <el-card shadow="never" class="api-card">
      <template #header>
        <div class="card-header">
          <span>API Examples</span>
        </div>
      </template>
      <div class="api-grid">
        <div class="api-item">
          <div class="api-title">{{ permissionApiExamples.queryPermissions.endpoint }}</div>
          <pre>{{ formatExample(permissionApiExamples.queryPermissions.query) }}</pre>
        </div>
        <div class="api-item">
          <div class="api-title">{{ permissionApiExamples.createPermission.endpoint }}</div>
          <pre>{{ formatExample(permissionApiExamples.createPermission.body) }}</pre>
        </div>
        <div class="api-item">
          <div class="api-title">{{ permissionApiExamples.updatePermissionStatus.endpoint }}</div>
          <pre>{{ formatExample(permissionApiExamples.updatePermissionStatus.body) }}</pre>
        </div>
      </div>
    </el-card>

    <el-dialog v-model="dialog.visible" :title="dialog.mode === 'create' ? 'New Permission' : 'Edit Permission'" width="560px">
      <el-form ref="permissionFormRef" :model="dialog.form" :rules="rules" label-width="110px">
        <el-form-item label="Code" prop="code">
          <el-input v-model="dialog.form.code" placeholder="iam:module:action" />
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="dialog.form.name" placeholder="Permission name" />
        </el-form-item>
        <el-form-item label="Module" prop="module">
          <el-select v-model="dialog.form.module" placeholder="Select module" style="width: 100%">
            <el-option v-for="item in flattenedModules" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Type" prop="type">
          <el-radio-group v-model="dialog.form.type">
            <el-radio-button v-for="item in permissionTypeOptions" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Status">
          <el-switch v-model="dialog.form.enabled" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="dialog.form.description" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialog.visible = false">Cancel</el-button>
        <el-button type="primary" @click="submitDialog">Save</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import AccessControlApi from "@/api/modules/accessControl";
import { permissionApiExamples } from "@/api/examples/accessControlExamples";
import { usePermissions } from "@/composables/usePermissions";
import { mockPermissionList, mockPermissionModules, permissionTypeOptions } from "../shared/mockData";

const { can } = usePermissions();
const canEditStatus = computed(() => can("iam:permission:update"));

const loading = ref(false);
const total = ref(0);
const tableData = ref([]);
const moduleTree = ref([]);
const selectedModule = ref("");
const multipleSelection = ref([]);
const permissionFormRef = ref();

const query = reactive({
  keyword: "",
  status: undefined,
  pageNum: 1,
  pageSize: 10
});

const dialog = reactive({
  visible: false,
  mode: "create",
  form: {
    id: undefined,
    code: "",
    name: "",
    module: "",
    type: "button",
    enabled: true,
    description: ""
  }
});

const rules = {
  code: [{ required: true, message: "Permission code is required", trigger: "blur" }],
  name: [{ required: true, message: "Permission name is required", trigger: "blur" }],
  module: [{ required: true, message: "Module is required", trigger: "change" }],
  type: [{ required: true, message: "Type is required", trigger: "change" }]
};

const moduleCount = computed(() => flattenModules(moduleTree.value).length);

const permissionStats = computed(() => {
  const source = tableData.value;
  const enabled = source.filter(item => item.status === 1).length;
  return {
    total: source.length,
    enabled,
    disabled: source.length - enabled
  };
});

const flattenedModules = computed(() => flattenModules(moduleTree.value));

const normalizeList = responseData => {
  if (!responseData) return { list: [], total: 0 };
  if (Array.isArray(responseData)) return { list: responseData, total: responseData.length };
  return { list: responseData.list || [], total: Number(responseData.total || 0) };
};

const flattenModules = modules => {
  const list = [];
  modules.forEach(item => {
    if (!item.children || !item.children.length) list.push({ id: item.id, label: item.label });
    if (item.children?.length) list.push(...flattenModules(item.children));
  });
  return list;
};

const loadModules = async () => {
  try {
    const { data } = await AccessControlApi.getPermissionModules();
    moduleTree.value = Array.isArray(data) && data.length ? data : mockPermissionModules;
  } catch (error) {
    moduleTree.value = mockPermissionModules;
  }
};

const applyMockFilter = () => {
  let list = [...mockPermissionList];
  if (query.keyword) {
    const keyword = query.keyword.toLowerCase();
    list = list.filter(item => item.name.toLowerCase().includes(keyword) || item.code.toLowerCase().includes(keyword));
  }
  if (query.status === 0 || query.status === 1) {
    list = list.filter(item => item.status === query.status);
  }
  if (selectedModule.value) {
    list = list.filter(item => item.module === selectedModule.value || item.module.startsWith(`${selectedModule.value}.`));
  }
  total.value = list.length;
  const start = (query.pageNum - 1) * query.pageSize;
  const end = start + query.pageSize;
  tableData.value = list.slice(start, end);
};

const loadPermissions = async () => {
  loading.value = true;
  try {
    const params = {
      keyword: query.keyword,
      module: selectedModule.value,
      status: query.status,
      pageNum: query.pageNum,
      pageSize: query.pageSize
    };
    const { data } = await AccessControlApi.getPermissionList(params);
    const normalized = normalizeList(data);
    if (!normalized.list.length) {
      applyMockFilter();
    } else {
      tableData.value = normalized.list;
      total.value = normalized.total || normalized.list.length;
    }
  } catch (error) {
    applyMockFilter();
  } finally {
    loading.value = false;
  }
};

const resetFilters = () => {
  query.keyword = "";
  query.status = undefined;
  query.pageNum = 1;
  selectedModule.value = "";
  loadPermissions();
};

const resetModuleFilter = () => {
  selectedModule.value = "";
  query.pageNum = 1;
  loadPermissions();
};

const handleModuleClick = node => {
  selectedModule.value = node.id;
  query.pageNum = 1;
  loadPermissions();
};

const handleSelectionChange = rows => {
  multipleSelection.value = rows;
};

const handleStatusSwitch = async (row, value) => {
  const oldStatus = row.status;
  const newStatus = value ? 1 : 0;
  try {
    await AccessControlApi.batchUpdatePermissionStatus({ ids: [row.id], status: newStatus });
    row.status = newStatus;
    ElMessage.success("Status updated");
  } catch (error) {
    row.status = oldStatus;
    ElMessage.warning("API unavailable, switched in local demo mode");
  }
};

const handleBatchStatus = async status => {
  if (!multipleSelection.value.length) return;
  const ids = multipleSelection.value.map(item => item.id);
  try {
    await AccessControlApi.batchUpdatePermissionStatus({ ids, status });
  } catch (error) {
    // keep local fallback
  }
  tableData.value = tableData.value.map(item => (ids.includes(item.id) ? { ...item, status } : item));
  ElMessage.success("Batch update completed");
};

const openCreateDialog = () => {
  dialog.mode = "create";
  dialog.visible = true;
  dialog.form = {
    id: undefined,
    code: "",
    name: "",
    module: selectedModule.value || "",
    type: "button",
    enabled: true,
    description: ""
  };
};

const openEditDialog = row => {
  dialog.mode = "edit";
  dialog.visible = true;
  dialog.form = {
    id: row.id,
    code: row.code,
    name: row.name,
    module: row.module,
    type: row.type,
    enabled: row.status === 1,
    description: row.description
  };
};

const submitDialog = async () => {
  if (!permissionFormRef.value) return;
  await permissionFormRef.value.validate();
  const payload = {
    ...dialog.form,
    status: dialog.form.enabled ? 1 : 0
  };
  try {
    if (dialog.mode === "create") {
      await AccessControlApi.createPermission(payload);
    } else {
      await AccessControlApi.updatePermission(payload);
    }
  } catch (error) {
    // local demo fallback
  }

  if (dialog.mode === "create") {
    const newId = Date.now();
    tableData.value.unshift({
      ...payload,
      id: newId,
      updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ")
    });
    total.value += 1;
    ElMessage.success("Permission created");
  } else {
    tableData.value = tableData.value.map(item =>
      item.id === payload.id
        ? {
            ...item,
            ...payload,
            updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ")
          }
        : item
    );
    ElMessage.success("Permission updated");
  }

  dialog.visible = false;
};

const handleDelete = async row => {
  await ElMessageBox.confirm(`Delete permission "${row.name}"?`, "Confirm", {
    type: "warning"
  });
  try {
    await AccessControlApi.deletePermission({ id: row.id });
  } catch (error) {
    // local demo fallback
  }
  tableData.value = tableData.value.filter(item => item.id !== row.id);
  total.value = Math.max(total.value - 1, 0);
  ElMessage.success("Permission deleted");
};

const formatExample = value => JSON.stringify(value, null, 2);

onMounted(async () => {
  await loadModules();
  await loadPermissions();
});
</script>

<style scoped lang="scss">
.permission-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.overview-item {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 12px 16px;
}

.overview-label {
  color: #909399;
  font-size: 12px;
}

.overview-value {
  margin-top: 6px;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

.main-grid {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 12px;
}

.tree-card,
.list-card {
  min-height: 520px;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.query-form {
  margin-bottom: 6px;
}

.pager {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.api-item {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 12px;
  background: #fafafa;

  pre {
    margin: 0;
    font-size: 12px;
    overflow-x: auto;
  }
}

.api-title {
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 13px;
}

@media screen and (max-width: 1200px) {
  .overview-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .main-grid {
    grid-template-columns: 1fr;
  }

  .api-grid {
    grid-template-columns: 1fr;
  }
}
</style>
