export const permissionApiExamples = {
  queryPermissions: {
    endpoint: "GET /api-v2/iam/permission/list",
    query: {
      keyword: "user",
      module: "identity.user",
      status: 1,
      pageNum: 1,
      pageSize: 20
    },
    response: {
      list: [
        {
          id: 1001,
          code: "iam:user:view",
          name: "User View",
          module: "identity.user",
          type: "menu",
          status: 1,
          description: "Read user records",
          updatedAt: "2026-03-01 10:00:00"
        }
      ],
      total: 1
    }
  },
  createPermission: {
    endpoint: "POST /api-v2/iam/permission/create",
    body: {
      code: "iam:user:create",
      name: "User Create",
      module: "identity.user",
      type: "button",
      status: 1,
      description: "Create user accounts"
    }
  },
  updatePermissionStatus: {
    endpoint: "POST /api-v2/iam/permission/batch-status",
    body: {
      ids: [1001, 1002],
      status: 0
    }
  }
};

export const roleApiExamples = {
  queryRoles: {
    endpoint: "GET /api-v2/iam/role/list",
    query: {
      keyword: "admin",
      status: 1,
      pageNum: 1,
      pageSize: 20
    },
    response: {
      list: [
        {
          id: 1,
          roleCode: "super_admin",
          roleName: "Super Administrator",
          dataScope: "all",
          status: 1,
          memberCount: 2,
          updatedAt: "2026-03-01 10:00:00",
          permissionCodes: ["iam:user:view", "iam:user:create", "iam:role:update"]
        }
      ],
      total: 1
    }
  },
  createRole: {
    endpoint: "POST /api-v2/iam/role/create",
    body: {
      roleCode: "ops_manager",
      roleName: "Ops Manager",
      dataScope: "org_and_children",
      status: 1,
      remark: "Operational role",
      permissionCodes: ["iam:permission:view", "iam:role:view"]
    }
  },
  assignRolePermissions: {
    endpoint: "POST /api-v2/iam/role/assign-permissions",
    body: {
      roleId: 2,
      permissionCodes: ["iam:permission:view", "iam:permission:update", "iam:role:view"]
    }
  }
};
