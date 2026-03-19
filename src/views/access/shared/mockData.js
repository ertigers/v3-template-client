export const mockPermissionModules = [
  {
    id: "identity",
    label: "Identity Access",
    children: [
      { id: "identity.user", label: "User" },
      { id: "identity.role", label: "Role" },
      { id: "identity.permission", label: "Permission" }
    ]
  },
  {
    id: "device",
    label: "Device Domain",
    children: [
      { id: "device.station", label: "Station" },
      { id: "device.firmware", label: "Firmware" }
    ]
  },
  {
    id: "support",
    label: "Support Services",
    children: [
      { id: "support.notification", label: "Notification" },
      { id: "support.feedback", label: "Feedback" }
    ]
  }
];

export const mockPermissionList = [
  {
    id: 1001,
    code: "iam:permission:view",
    name: "Permission View",
    module: "identity.permission",
    type: "menu",
    status: 1,
    description: "Read permission entries",
    updatedAt: "2026-03-01 10:00:00"
  },
  {
    id: 1002,
    code: "iam:permission:create",
    name: "Permission Create",
    module: "identity.permission",
    type: "button",
    status: 1,
    description: "Create permissions",
    updatedAt: "2026-03-01 10:10:00"
  },
  {
    id: 1003,
    code: "iam:permission:update",
    name: "Permission Update",
    module: "identity.permission",
    type: "button",
    status: 1,
    description: "Edit permissions",
    updatedAt: "2026-03-01 10:20:00"
  },
  {
    id: 1004,
    code: "iam:permission:delete",
    name: "Permission Delete",
    module: "identity.permission",
    type: "button",
    status: 1,
    description: "Delete permissions",
    updatedAt: "2026-03-01 10:30:00"
  },
  {
    id: 1101,
    code: "iam:role:view",
    name: "Role View",
    module: "identity.role",
    type: "menu",
    status: 1,
    description: "Read role entries",
    updatedAt: "2026-03-01 11:00:00"
  },
  {
    id: 1102,
    code: "iam:role:create",
    name: "Role Create",
    module: "identity.role",
    type: "button",
    status: 1,
    description: "Create roles",
    updatedAt: "2026-03-01 11:10:00"
  },
  {
    id: 1103,
    code: "iam:role:update",
    name: "Role Update",
    module: "identity.role",
    type: "button",
    status: 1,
    description: "Edit roles",
    updatedAt: "2026-03-01 11:20:00"
  },
  {
    id: 1104,
    code: "iam:role:assign",
    name: "Role Assign Permissions",
    module: "identity.role",
    type: "button",
    status: 1,
    description: "Assign permissions to roles",
    updatedAt: "2026-03-01 11:30:00"
  },
  {
    id: 2001,
    code: "station:view",
    name: "Station View",
    module: "device.station",
    type: "menu",
    status: 1,
    description: "View stations",
    updatedAt: "2026-03-02 09:00:00"
  },
  {
    id: 2002,
    code: "station:edit",
    name: "Station Edit",
    module: "device.station",
    type: "button",
    status: 0,
    description: "Edit stations",
    updatedAt: "2026-03-02 09:05:00"
  },
  {
    id: 3001,
    code: "notification:manage",
    name: "Notification Manage",
    module: "support.notification",
    type: "menu",
    status: 1,
    description: "Manage notifications",
    updatedAt: "2026-03-03 14:00:00"
  }
];

export const mockRoleList = [
  {
    id: 1,
    roleCode: "super_admin",
    roleName: "Super Administrator",
    dataScope: "all",
    status: 1,
    memberCount: 2,
    remark: "Platform super admin role",
    permissionCodes: [
      "iam:permission:view",
      "iam:permission:create",
      "iam:permission:update",
      "iam:permission:delete",
      "iam:role:view",
      "iam:role:create",
      "iam:role:update",
      "iam:role:assign"
    ],
    updatedAt: "2026-03-05 09:00:00"
  },
  {
    id: 2,
    roleCode: "ops_manager",
    roleName: "Ops Manager",
    dataScope: "org_and_children",
    status: 1,
    memberCount: 4,
    remark: "Operations and maintenance",
    permissionCodes: ["iam:permission:view", "iam:role:view", "station:view", "station:edit"],
    updatedAt: "2026-03-05 10:00:00"
  },
  {
    id: 3,
    roleCode: "auditor",
    roleName: "Audit Viewer",
    dataScope: "custom",
    status: 0,
    memberCount: 1,
    remark: "Read-only audit access",
    permissionCodes: ["iam:permission:view", "iam:role:view", "station:view"],
    updatedAt: "2026-03-05 11:00:00"
  }
];

export const mockRoleMembers = {
  1: [
    { id: 9001, username: "admin", nickname: "System Admin", email: "admin@example.com" },
    { id: 9002, username: "owner", nickname: "Product Owner", email: "owner@example.com" }
  ],
  2: [
    { id: 9101, username: "ops01", nickname: "Ops One", email: "ops01@example.com" },
    { id: 9102, username: "ops02", nickname: "Ops Two", email: "ops02@example.com" },
    { id: 9103, username: "ops03", nickname: "Ops Three", email: "ops03@example.com" },
    { id: 9104, username: "ops04", nickname: "Ops Four", email: "ops04@example.com" }
  ],
  3: [{ id: 9201, username: "audit01", nickname: "Audit One", email: "audit01@example.com" }]
};

export const permissionTypeOptions = [
  { label: "Menu", value: "menu" },
  { label: "Button", value: "button" },
  { label: "API", value: "api" }
];

export const dataScopeOptions = [
  { label: "All Data", value: "all" },
  { label: "Org + Children", value: "org_and_children" },
  { label: "Org Only", value: "org_only" },
  { label: "Custom Scope", value: "custom" }
];
