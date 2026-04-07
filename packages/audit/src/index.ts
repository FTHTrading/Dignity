// @dignity/audit — append-only event logger with SHA-256 hash chain

import { prisma } from "@dignity/db";
import { createHash } from "crypto";
import type { AuditEventCategory } from "@dignity/shared-types";

export interface AppendParams {
  category: AuditEventCategory;
  action: string;
  actorId?: string;
  actorRole?: string;
  entityType?: string;
  entityId?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  reason?: string;
  ipAddress?: string;
  description?: string;
}

export class AuditLogger {
  /**
   * Appends an audit event with a hash-chain link.
   * Each event includes a SHA-256 hash of its own payload chained
   * to the previous event's hash for tamper evidence.
   */
  static async append(params: AppendParams): Promise<string> {
    const occurredAt = new Date();

    // Get most recent event for chaining
    const lastEvent = await prisma.auditEvent.findFirst({
      orderBy: { occurredAt: "desc" },
      select: { id: true, hashChain: true },
    });

    const prevHash = lastEvent?.hashChain ?? null;

    const hashInput = JSON.stringify({
      ...params,
      occurredAt: occurredAt.toISOString(),
      prevHash,
    });

    const hashChain = createHash("sha256").update(hashInput).digest("hex");

    // Pack extra fields that don't have dedicated columns into metadata
    const metadata: Record<string, unknown> = {};
    if (params.before) metadata.before = params.before;
    if (params.after) metadata.after = params.after;
    if (params.reason) metadata.reason = params.reason;

    const event = await prisma.auditEvent.create({
      data: {
        category: params.category,
        action: params.action,
        actorId: params.actorId,
        actorRole: params.actorRole,
        targetType: params.entityType,
        targetId: params.entityId,
        description: params.description,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        metadata: Object.keys(metadata).length > 0 ? (metadata as any) : undefined,
        ipAddress: params.ipAddress,
        hashChain,
        prevEventId: lastEvent?.id ?? null,
        occurredAt,
      },
    });

    return event.id;
  }

  /** Returns paginated audit events, newest first. */
  static async query(opts: {
    category?: AuditEventCategory;
    actorId?: string;
    entityType?: string;
    entityId?: string;
    from?: Date;
    to?: Date;
    page?: number;
    pageSize?: number;
  }) {
    const { page = 1, pageSize = 50 } = opts;
    const where: Record<string, unknown> = {};
    if (opts.category) where.category = opts.category;
    if (opts.actorId) where.actorId = opts.actorId;
    if (opts.entityType) where.targetType = opts.entityType;
    if (opts.entityId) where.targetId = opts.entityId;
    if (opts.from || opts.to) {
      where.occurredAt = {};
      if (opts.from) (where.occurredAt as Record<string, Date>).gte = opts.from;
      if (opts.to) (where.occurredAt as Record<string, Date>).lte = opts.to;
    }

const [total, events] = await prisma.$transaction([
      prisma.auditEvent.count({ where: where as never }),
      prisma.auditEvent.findMany({
        where: where as never,
        orderBy: { occurredAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return { total, page, pageSize, events };
  }
}
