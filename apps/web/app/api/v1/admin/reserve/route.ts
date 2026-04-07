import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hasPermission } from "@dignity/auth";
import type { UserRole } from "@dignity/shared-types";
import { getDemoReserveSummary } from "@/lib/adapters";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  if (!hasPermission(session.user.role as UserRole, "reserve:read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data = getDemoReserveSummary();
  return NextResponse.json(data);
}
