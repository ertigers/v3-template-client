<template>
  <div class="role-page">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>Role Management</span>
          <el-tag type="info">RBAC Module</el-tag>
        </div>
      </template>
      <div class="overview-grid">
        <div class="overview-item">
          <div class="overview-label">Total Roles</div>
          <div class="overview-value">{{ roleStats.total }}</div>
        </div>
        <div class="overview-item">
          <div class="overview-label">Enabled Roles</div>
          <div class="overview-value">{{ roleStats.enabled }}</div>
        </div>
        <div class="overview-item">
          <div class="overview-label">Total Members</div>
          <div class="overview-value">{{ roleStats.members }}</div>
        </div>
        <div class="overview-item">
          <div class="overview-label">Permission Items</div>
          <div class="overview-value">{{ permissionNodeCount }}</div>
        </div>
      </div>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>Role List</span>
          <div class="header-actions">
            <el-button v-permission="'iam:role:create'" type="primary" @click="openCreateDialog">New Role</el-button>
            <el-button :disabled="!selectedRows.length" @click="exportSelected">Export Selected</el-button>
          </div>
        </div>
      </template>

      <el-form :inline="true" :model="query" class="query-form">
        <el-form-item label="Keyword">
          <el-input v-model="query.keyword" clearable placeholder="Role code / name" @keyup.enter="loadRoles" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="query.status" clearable placeholder="All" style="width: 140px">
            <el-option label="Enabled" :value="1" />
            <el-option label="Disabled" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadRoles">Search</el-button>
          <el-button @click="resetFilters">Reset</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" border v-loading="loading" @selection-change="rows => (selectedRows.value = rows)">
        <el-table-column type="selection" width="48" />
        <el-table-column prop="roleCode" label="Role Code" min-width="140" />
        <el-table-column prop="roleName" label="Role Name" min-width="160" />
        <el-table-column prop="dataScope" label="Data Scope" width="170">
          <template #default="{ row }">
            {{ dataScopeLabel(row.dataScope) }}
          </template>
        </el-table-column>
        <el-table-column prop="memberCount" label="Members" width="100" />
        <el-table-column label="Status" width="110">
          <template #default="{ row }">
            <el-switch
              :model-value="row.status === 1"
              @change="value => handleStatusSwitch(row, value)"
              v-permission="'iam:role:update'"
            />
            <el-tag v-if="!canEditRole" size="small" :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status === 1 ? "Enabled" : "Disabled" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="Updated At" width="170" />
        <el-table-column label="Permissions" min-width="280">
          <template #default="{ row }">
            <div class="permission-tags">
              <el-tag v-for="code in row.permissionCodes.slice(0, 3)" :key="code" size="small">{{ code }}</el-tag>
              <el-tag v-if="row.permissionCodes.length > 3" type="info" size="small">
                +{{ row.permissionCodes.length - 3 }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="250" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="openEditDialog(row)" v-permission="'iam:role:update'">Edit</el-button>
            <el-button link type="primary" @click="openAssignDrawer(row)" v-permission="'iam:role:assign'">
              Assign Permissions
            </el-button>
            <el-button link @click="openMembersDrawer(row)">Members</el-button>
            <el-button link type="danger" @click="handleDelete(row)" v-permission="'iam:role:delete'">Delete</el-button>
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
          @change="loadRoles"
        />
      </div>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>API Examples</span>
        </div>
      </template>
      <div class="api-grid">
        <div class="api-item">
          <div class="api-title">{{ roleApiExamples.queryRoles.endpoint }}</div>
          <pre>{{ formatExample(roleApiExamples.queryRoles.query) }}</pre>
        </div>
        <div class="api-item">
          <div class="api-title">{{ roleApiExamples.createRole.endpoint }}</div>
          <pre>{{ formatExample(roleApiExamples.createRole.body) }}</pre>
        </div>
        <div class="api-item">
          <div class="api-title">{{ roleApiExamples.assignRolePermissions.endpoint }}</div>
          <pre>{{ formatExample(roleApiExamples.assignRolePermissions.body) }}</pre>
        </div>
      </div>
    </el-card>

    <el-dialog v-model="dialog.visible" :title="dialog.mode === 'create' ? 'New Role' : 'Edit Role'" width="620px">
      <el-form ref="roleFormRef" :model="dialog.form" :rules="rules" label-width="120px">
        <el-form-item label="Role Code" prop="roleCode">
          <el-input v-model="dialog.form.roleCode" placeholder="role_code" :disabled="dialog.mode === 'edit'" />
        </el-form-item>
        <el-form-item label="Role Name" prop="roleName">
          <el-input v-model="dialog.form.roleName" placeholder="Role name" />
        </el-form-item>
        <el-form-item label="Data Scope" prop="dataScope">
          <el-select v-model="dialog.form.dataScope" style="width: 100%">
            <el-option v-for="item in dataScopeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Status">
          <el-switch v-model="dialog.form.enabled" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="dialog.form.remark" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialog.visible = false">Cancel</el-button>
        <el-button type="primary" @click="submitDialog">Save</el-button>
      </template>
    </el-dialog>

    <el-drawer v-model="permissionDrawer.visible" size="540px" title="Assign Permissions">
      <template #default>
        <div class="drawer-header">
          <div>
            Role: <strong>{{ permissionDrawer.roleName }}</strong>
          </div>
          <el-button link @click="checkAllPermissions">Check All</el-button>
        </div>
        <el-tree
          ref="permissionTreeRef"
          :data="permissionTree"
          node-key="id"
          show-checkbox
          default-expand-all
          :props="{ label: 'label', children: 'children' }"
        />
      </template>
      <template #footer>
        <el-button @click="permissionDrawer.visible = false">Cancel</el-button>
        <el-button type="primary" @click="saveRolePermissions">Save</el-button>
      </template>
    </el-drawer>

    <el-drawer v-model="membersDrawer.visible" size="600px" title="Role Members">
      <template #default>
        <div class="drawer-header">
          <div>
            Role: <strong>{{ membersDrawer.roleName }}</strong>
          </div>
          <el-button type="primary" plain @click="quickAddMember">Add Demo Member</el-button>
        </div>
        <el-table :data="membersDrawer.members" border>
          <el-table-column prop="username" label="Username" />
          <el-table-column prop="nickname" label="Nickname" />
          <el-table-column prop="email" label="Email" />
          <el-table-column label="Actions" width="120">
            <template #default="{ row }">
              <el-button link type="danger" @click="removeMember(row)">Remove</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template #footer>
        <el-button @click="membersDrawer.visible = false">Close</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import AccessControlApi from "@/api/modules/accessControl";
import { roleApiExamples } from "@/api/examples/accessControlExamples";
import { usePermissions } from "@/composables/usePermissions";
import { dataScopeOptions, mockPermissionList, mockPermissionModules, mockRoleList, mockRoleMembers } from "../shared/mockData";

const { can } = usePermissions();
const canEditRole = computed(() => can("iam:role:update"));

const loading = ref(false);
const total = ref(0);
const tableData = ref([]);
const selectedRows = ref([]);
const roleFormRef = ref();
const permissionTreeRef = ref();

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
    roleCode: "",
    roleName: "",
    dataScope: "org_only",
    enabled: true,
    remark: ""
  }
});

const permissionDrawer = reactive({
  visible: false,
  roleId: undefined,
  roleName: ""
});

const membersDrawer = reactive({
  visible: false,
  roleId: undefined,
  roleName: "",
  members: []
});

const rules = {
  roleCode: [{ required: true, message: "Role code is required", trigger: "blur" }],
  roleName: [{ required: true, message: "Role name is required", trigger: "blur" }],
  dataScope: [{ required: true, message: "Data scope is required", trigger: "change" }]
};

const permissionTree = computed(() => {
  return mockPermissionModules.map(module => ({
    id: module.id,
    label: module.label,
    children: mockPermissionList
      .filter(item => item.module === module.id || item.module.startsWith(`${module.id}.`))
      .map(item => ({ id: item.code, label: `${item.name} (${item.code})` }))
  }));
});

const permissionNodeCount = computed(() => mockPermissionList.length);

const roleStats = computed(() => {
  const source = tableData.value;
  return {
    total: source.length,
    enabled: source.filter(item => item.status === 1).length,
    members: source.reduce((sum, item) => sum + Number(item.memberCount || 0), 0)
  };
});

const dataScopeLabel = value => {
  return dataScopeOptions.find(item => item.value === value)?.label || value;
};

const normalizeList = responseData => {
  if (!responseData) return { list: [], total: 0 };
  if (Array.isArray(responseData)) return { list: responseData, total: responseData.length };
  return { list: responseData.list || [], total: Number(responseData.total || 0) };
};

const applyMockFilter = () => {
  let list = [...mockRoleList];
  if (query.keyword) {
    const keyword = query.keyword.toLowerCase();
    list = list.filter(item => item.roleCode.toLowerCase().includes(keyword) || item.roleName.toLowerCase().includes(keyword));
  }
  if (query.status === 0 || query.status === 1) {
    list = list.filter(item => item.status === query.status);
  }
  total.value = list.length;
  const start = (query.pageNum - 1) * query.pageSize;
  const end = start + query.pageSize;
  tableData.value = list.slice(start, end);
};

const loadRoles = async () => {
  loading.value = true;
  try {
    const { data } = await AccessControlApi.getRoleList({ ...query });
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
  loadRoles();
};

const openCreateDialog = () => {
  dialog.mode = "create";
  dialog.visible = true;
  dialog.form = {
    id: undefined,
    roleCode: "",
    roleName: "",
    dataScope: "org_only",
    enabled: true,
    remark: ""
  };
};

const openEditDialog = row => {
  dialog.mode = "edit";
  dialog.visible = true;
  dialog.form = {
    id: row.id,
    roleCode: row.roleCode,
    roleName: row.roleName,
    dataScope: row.dataScope,
    enabled: row.status === 1,
    remark: row.remark || ""
  };
};

const submitDialog = async () => {
  if (!roleFormRef.value) return;
  await roleFormRef.value.validate();
  const payload = {
    ...dialog.form,
    status: dialog.form.enabled ? 1 : 0
  };
  try {
    if (dialog.mode === "create") {
      await AccessControlApi.createRole(payload);
    } else {
      await AccessControlApi.updateRole(payload);
    }
  } catch (error) {
    // local fallback
  }

  if (dialog.mode === "create") {
    tableData.value.unshift({
      ...payload,
      id: Date.now(),
      memberCount: 0,
      permissionCodes: [],
      updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ")
    });
    total.value += 1;
    ElMessage.success("Role created");
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
    ElMessage.success("Role updated");
  }
  dialog.visible = false;
};

const handleStatusSwitch = async (row, value) => {
  const newStatus = value ? 1 : 0;
  try {
    await AccessControlApi.updateRole({ id: row.id, status: newStatus });
  } catch (error) {
    // local fallback
  }
  row.status = newStatus;
  ElMessage.success("Role status updated");
};

const handleDelete = async row => {
  await ElMessageBox.confirm(`Delete role "${row.roleName}"?`, "Confirm", { type: "warning" });
  try {
    await AccessControlApi.deleteRole({ id: row.id });
  } catch (error) {
    // local fallback
  }
  tableData.value = tableData.value.filter(item => item.id !== row.id);
  total.value = Math.max(total.value - 1, 0);
  ElMessage.success("Role deleted");
};

const openAssignDrawer = row => {
  permissionDrawer.visible = true;
  permissionDrawer.roleId = row.id;
  permissionDrawer.roleName = row.roleName;
  requestAnimationFrame(() => {
    permissionTreeRef.value?.setCheckedKeys(row.permissionCodes || []);
  });
};

const checkAllPermissions = () => {
  const allKeys = mockPermissionList.map(item => item.code);
  permissionTreeRef.value?.setCheckedKeys(allKeys);
};

const saveRolePermissions = async () => {
  const checkedKeys = permissionTreeRef.value?.getCheckedKeys() || [];
  const payload = {
    roleId: permissionDrawer.roleId,
    permissionCodes: checkedKeys
  };
  try {
    await AccessControlApi.assignRolePermissions(payload);
  } catch (error) {
    // local fallback
  }
  tableData.value = tableData.value.map(item =>
    item.id === permissionDrawer.roleId ? { ...item, permissionCodes: checkedKeys } : item
  );
  permissionDrawer.visible = false;
  ElMessage.success("Permissions updated");
};

const openMembersDrawer = async row => {
  membersDrawer.visible = true;
  membersDrawer.roleId = row.id;
  membersDrawer.roleName = row.roleName;
  try {
    const { data } = await AccessControlApi.getRoleUsers({ roleId: row.id });
    membersDrawer.members = Array.isArray(data) ? data : data?.list || mockRoleMembers[row.id] || [];
  } catch (error) {
    membersDrawer.members = [...(mockRoleMembers[row.id] || [])];
  }
};

const quickAddMember = async () => {
  if (!membersDrawer.roleId) return;
  const newMember = {
    id: Date.now(),
    username: `demo${String(Date.now()).slice(-4)}`,
    nickname: "Demo Member",
    email: "demo.member@example.com"
  };
  try {
    await AccessControlApi.assignUsersToRole({ roleId: membersDrawer.roleId, userIds: [newMember.id] });
  } catch (error) {
    // local fallback
  }
  membersDrawer.members.unshift(newMember);
  tableData.value = tableData.value.map(item =>
    item.id === membersDrawer.roleId ? { ...item, memberCount: item.memberCount + 1 } : item
  );
  ElMessage.success("Demo member added");
};

const removeMember = async member => {
  try {
    await AccessControlApi.removeUsersFromRole({ roleId: membersDrawer.roleId, userIds: [member.id] });
  } catch (error) {
    // local fallback
  }
  membersDrawer.members = membersDrawer.members.filter(item => item.id !== member.id);
  tableData.value = tableData.value.map(item =>
    item.id === membersDrawer.roleId ? { ...item, memberCount: Math.max(item.memberCount - 1, 0) } : item
  );
  ElMessage.success("Member removed");
};

const exportSelected = () => {
  const payload = selectedRows.value.map(item => ({
    roleCode: item.roleCode,
    roleName: item.roleName,
    dataScope: item.dataScope,
    status: item.status,
    permissionCodes: item.permissionCodes
  }));
  console.table(payload);
  ElMessage.success("Export payload printed to console");
};

const formatExample = value => JSON.stringify(value, null, 2);

onMounted(() => {
  loadRoles();
});
</script>

<style scoped lang="scss">
.role-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-actions {
  display: flex;
  gap: 8px;
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

.permission-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.query-form {
  margin-bottom: 6px;
}

.pager {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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

  .api-grid {
    grid-template-columns: 1fr;
  }
}
</style>
