import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import type { UserRole } from "@dignity/shared-types";
import { hasPermission } from "@dignity/auth";
import type { Permission } from "@dignity/auth";

export { authOptions };

export async function getSession() {
  return getServerSession(authOptions);
}

export async function requireSession(permission?: string) {
  const session = await getSession();
  if (!session) {
    throw Object.assign(new Error("Unauthenticated"), { status: 401 });
  }
  if (permission && !hasPermission(session.user.role as UserRole, permission as Permission)) {
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  }
  return session;
}
