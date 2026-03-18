// 首页权限
export const HOME_PERMISSIONS = [{ label: "首页数据总览", value: "home:dashboard" }];

// ⚡ 电站权限
export const STATION_PERMISSIONS = [
  // 列表相关
  { label: "关注列表", value: "station:follow:list" },
  { label: "关注操作", value: "station:follow" },
  { label: "编辑", value: "station:edit" },
  { label: "功率控制", value: "station:power:control" },
  { label: "开启", value: "station:start" },
  { label: "关闭", value: "station:shutdown" },
  { label: "重启", value: "station:restart" },
  { label: "删除", value: "station:delete" }
];

// 📊 电站详情权限
export const STATION_DETAIL_PERMISSIONS = [
  { label: "组件布局", value: "station:detail:layout" },
  { label: "电站设置", value: "station:detail:setting" }
];

// 数据报表权限
export const DATA_REPORT_PERMISSIONS = [{ label: "下载报表", value: "data:report:download" }];

// 🔧 设备维护(EVB、EVT)权限
export const DEVICE_MAINTENANCE_PERMISSIONS = [
  { label: "批量操作", value: "device:batch:operation" },
  { label: "开启", value: "device:start" },
  { label: "关闭", value: "device:shutdown" },
  { label: "重启", value: "device:restart" },
  { label: "别名", value: "device:rename" },
  { label: "固件升级", value: "device:firmware:upgrade" },
  { label: "更换设备", value: "device:replace" },
  { label: "并网文件升级", value: "device:wifi:upgrade" },
  { label: "并网文件查看", value: "device:wifi:query" },
  { label: "功率控制", value: "device:power:control" },
  { label: "WiFi固件升级", value: "device:wifi:firmware:upgrade" },
  { label: "产型号设定", value: "device:production:setting" },
  { label: "负电价设定", value: "device:load:price:setting" },
  { label: "告警屏蔽", value: "device:alarm:shield" },
  { label: "删除", value: "device:delete" }
];

// 📋 告警权限
export const ALARM_PERMISSIONS = [
  { label: "发送告警邮件", value: "alarm:send:email" },
  { label: "查看处理意见", value: "alarm:view:opinion" },
  { label: "告警处理", value: "alarm:handle" },
  { label: "删除", value: "alarm:delete" }
];

// 🌐 并网文件权限
export const NETWORK_FILE_PERMISSIONS = [
  { label: "编辑", value: "network:file:edit" },
  { label: "别名", value: "network:file:rename" },
  { label: "删除", value: "network:file:delete" }
];

// 🔧 质保管理权限
export const WARRANTY_PERMISSIONS = [
  { label: "添加", value: "warranty:add" },
  { label: "别名", value: "warranty:rename" },
  { label: "删除", value: "warranty:delete" }
];

// 📦 SN管理权限
export const SN_MANAGEMENT_PERMISSIONS = [
  { label: "添加", value: "sn:add" },
  { label: "授权", value: "sn:auth" },
  { label: "删除", value: "sn:delete" }
];

// 🏢 组织管理权限
export const ORG_MANAGEMENT_PERMISSIONS = [
  { label: "添加", value: "org:add" },
  { label: "编辑", value: "org:edit" },
  { label: "转移", value: "org:transfer" },
  { label: "删除", value: "org:delete" }
];

// 👥 用户管理(用户业主)权限
export const USER_MANAGEMENT_PERMISSIONS = [
  { label: "添加", value: "user:add" },
  { label: "编辑", value: "user:edit" },
  { label: "重置密码", value: "user:reset:password" },
  { label: "删除", value: "user:delete" }
];

// 📝 操作记录权限
export const OPERATION_RECORD_PERMISSIONS = [
  { label: "更换设备记录", value: "record:update:device" },
  { label: "运程指令记录", value: "record:set:command" }
];

// 🔔 通知下发权限
export const NOTIFICATION_PERMISSIONS = [{ label: "通知管理", value: "notification:manage" }];

// 👤 个人信息设置权限
export const PERSONAL_SETTINGS_PERMISSIONS = [{ label: "个人设置管理", value: "personal:settings:manage" }];
