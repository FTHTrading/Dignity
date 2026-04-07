// @dignity/auth — session helpers, role policy, access-control
export { ROLE_POLICY, type RolePolicy, type Permission } from "./policy";
export { hasPermission, requireRole, type SessionUser } from "./session";
