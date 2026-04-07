"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@dignity/db";
import { requirePermission, recordAuditEvent } from "@/lib/server";
import { AuditEventCategory } from "@dignity/shared-types";

export async function createMintRequest(input: {
  units: number;
  notes?: string;
}): Promise<void> {
  const session = await requirePermission("treasury:write");
  const { id: actorId, role: actorRole } = session.user;

  await prisma.approvalRequest.create({
    data: {
      requestType: "MINT_REQUEST",
      status: "PENDING",
      title: `Mint ${input.units.toLocaleString()} DIGAU`,
      description: input.notes ?? null,
      requestedByRole: actorRole,
      requestedById: actorId,
      requestedAt: new Date(),
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 h
    },
  });

  await recordAuditEvent({
    category: AuditEventCategory.TOKEN_ACTION,
    action: "MINT_REQUEST_CREATED",
    actorId,
    actorRole,
    description: `Mint request for ${input.units.toLocaleString()} DIGAU`,
  });

  revalidatePath("/admin/stablecoin");
}

export async function createRedemptionRequest(input: {
  investorId: string;
  units: number;
  notes?: string;
}): Promise<void> {
  const session = await requirePermission("redemption:approve");
  const { id: actorId, role: actorRole } = session.user;

  await prisma.approvalRequest.create({
    data: {
      requestType: "REDEMPTION_APPROVE",
      status: "PENDING",
      title: `Redemption: ${input.units.toLocaleString()} DIGAU`,
      description: input.notes
        ? `Investor: ${input.investorId} — ${input.notes}`
        : `Investor: ${input.investorId}`,
      requestedByRole: actorRole,
      requestedById: actorId,
      requestedAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  });

  await recordAuditEvent({
    category: AuditEventCategory.TOKEN_ACTION,
    action: "REDEMPTION_REQUEST_CREATED",
    actorId,
    actorRole,
    description: `Redemption for investor ${input.investorId}: ${input.units.toLocaleString()} DIGAU`,
    entityType: "InvestorProfile",
    entityId: input.investorId,
  });

  revalidatePath("/admin/stablecoin");
}
