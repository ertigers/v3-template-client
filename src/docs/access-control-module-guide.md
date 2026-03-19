# Access Control Module Guide

## Module Scope
- Permission Management: permission catalog, module tree, status toggle, batch enable/disable, CRUD.
- Role Management: role CRUD, data scope, permission assignment, member maintenance.
- UI fallback: if API is unavailable, pages use local demo data so feature flow remains testable.

## Routes
- `/system-setting` (parent route)
- `/system-setting/permission-management`
- `/system-setting/role-management`

## API Module
- File: `src/api/modules/accessControl.js`
- Prefix: `/api-v2/iam`

### Permission APIs
- `GET /iam/permission/modules`
- `GET /iam/permission/list`
- `GET /iam/permission/detail`
- `POST /iam/permission/create`
- `POST /iam/permission/update`
- `POST /iam/permission/delete`
- `POST /iam/permission/batch-status`

### Role APIs
- `GET /iam/role/list`
- `GET /iam/role/detail`
- `POST /iam/role/create`
- `POST /iam/role/update`
- `POST /iam/role/delete`
- `POST /iam/role/assign-permissions`
- `GET /iam/role/users`
- `POST /iam/role/assign-users`
- `POST /iam/role/remove-users`

## Example Payloads
- File: `src/api/examples/accessControlExamples.js`
- Includes query and write examples for:
  - permission list
  - permission create
  - permission batch status update
  - role list
  - role create
  - role permission assignment

## Frontend Permission Codes
- Permission page:
  - `iam:permission:view`
  - `iam:permission:create`
  - `iam:permission:update`
  - `iam:permission:delete`
- Role page:
  - `iam:role:view`
  - `iam:role:create`
  - `iam:role:update`
  - `iam:role:assign`
  - `iam:role:delete`

## Data Contract Suggestions
- Permission item:
  - `id`, `code`, `name`, `module`, `type`, `status`, `description`, `updatedAt`
- Role item:
  - `id`, `roleCode`, `roleName`, `dataScope`, `status`, `memberCount`, `remark`, `permissionCodes`, `updatedAt`
- Role member item:
  - `id`, `username`, `nickname`, `email`

## Integration Notes
- If backend response shape is `{ list, total }`, UI works directly.
- If backend returns an array, the page auto-normalizes.
- If backend returns empty or fails, local mock data is used for demonstration and interaction testing.
