"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@dignity/db";
import { requirePermission, recordAuditEvent } from "@/lib/server";
import { AuditEventCategory } from "@dignity/shared-types";

export async function toggleVenueStatus(input: {
  venueId: string;
  targetStatus: string;
  reason?: string;
}): Promise<void> {
  const session = await requirePermission("market_ops:write");
  const { id: actorId, role: actorRole } = session.user;

  const venue = await prisma.venue.findUnique({ where: { id: input.venueId } });
  if (!venue) throw new Error("Venue not found");

  await prisma.approvalRequest.create({
    data: {
      requestType: "VENUE_TOGGLE",
      status: "PENDING",
      title: `Toggle ${venue.name}: ${venue.status} → ${input.targetStatus}`,
      description: input.reason ?? null,
      requestedByRole: actorRole,
      requestedById: actorId,
      requestedAt: new Date(),
      payload: {
        venueId: input.venueId,
        currentStatus: venue.status,
        targetStatus: input.targetStatus,
      },
    },
  });

  await recordAuditEvent({
    category: AuditEventCategory.MARKET_OPS,
    action: "VENUE_TOGGLE_REQUESTED",
    actorId,
    actorRole,
    description: `Venue toggle requested: ${venue.name} ${venue.status} → ${input.targetStatus}`,
    entityType: "Venue",
    entityId: input.venueId,
    before: { status: venue.status },
    after: { status: input.targetStatus },
  });

  revalidatePath("/admin/lp");
  revalidatePath(`/admin/venues/${input.venueId}`);
}

export async function updateSpreadPolicy(input: {
  marketMakerId: string;
  maxSpreadBps: number;
  targetSpreadBps: number;
  notes?: string;
}): Promise<void> {
  const session = await requirePermission("market_ops:write");
  const { id: actorId, role: actorRole } = session.user;

  const existing = await prisma.spreadPolicy.findFirst({
    where: { marketMakerId: input.marketMakerId, active: true },
    orderBy: { effectiveFrom: "desc" },
  });

  if (existing) {
    await prisma.spreadPolicy.update({
      where: { id: existing.id },
      data: { active: false, effectiveTo: new Date() },
    });
  }

  await prisma.spreadPolicy.create({
    data: {
      marketMakerId: input.marketMakerId,
      tokenSymbol: "DIGAU",
      maxSpreadBps: input.maxSpreadBps,
      targetSpreadBps: input.targetSpreadBps,
      effectiveFrom: new Date(),
      active: true,
    },
  });

  await prisma.approvalRequest.create({
    data: {
      requestType: "SPREAD_POLICY_CHANGE",
      status: "PENDING",
      title: `Spread policy: max ${input.maxSpreadBps}bps / target ${input.targetSpreadBps}bps`,
      description: input.notes ?? null,
      requestedByRole: actorRole,
      requestedById: actorId,
      requestedAt: new Date(),
      payload: {
        marketMakerId: input.marketMakerId,
        before: existing
          ? { maxSpreadBps: existing.maxSpreadBps, targetSpreadBps: existing.targetSpreadBps }
          : null,
        after: { maxSpreadBps: input.maxSpreadBps, targetSpreadBps: input.targetSpreadBps },
      },
    },
  });

  await recordAuditEvent({
    category: AuditEventCategory.MARKET_OPS,
    action: "SPREAD_POLICY_UPDATED",
    actorId,
    actorRole,
    description: `Spread policy updated: max ${input.maxSpreadBps}bps, target ${input.targetSpreadBps}bps`,
    entityType: "SpreadPolicy",
    entityId: input.marketMakerId,
    before: existing
      ? { maxSpreadBps: existing.maxSpreadBps, targetSpreadBps: existing.targetSpreadBps }
      : undefined,
    after: { maxSpreadBps: input.maxSpreadBps, targetSpreadBps: input.targetSpreadBps },
  });

  revalidatePath("/admin/lp");
}
