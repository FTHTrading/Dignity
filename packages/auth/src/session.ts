// @dignity/auth — session helpers and role checks

import { UserRole } from "@dignity/shared-types";
import { ROLE_POLICY, type Permission } from "./policy";

export interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
  role: UserRole;
}

/** Returns true if the given role has the requested permission. */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_POLICY[role]?.includes(permission) ?? false;
}

/**
 * Asserts that the user has at least one of the required roles.
 * Throws a 403-style error usable in Next.js Server Actions / Route Handlers.
 */
export function requireRole(
  user: SessionUser | null | undefined,
  ...roles: UserRole[]
): asserts user is SessionUser {
  if (!user) {
    throw Object.assign(new Error("Unauthenticated"), { status: 401 });
  }
  if (!roles.includes(user.role)) {
    throw Object.assign(
      new Error(`Requires one of: ${roles.join(", ")}`),
      { status: 403 }
    );
  }
}
