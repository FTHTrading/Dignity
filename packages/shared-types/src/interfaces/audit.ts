// @dignity/shared-types — audit interfaces

import type { AuditEventCategory } from "../enums";

export interface IAuditEvent {
  id: string;
  category: AuditEventCategory;
  action: string;
  actorId?: string | null;
  actorRole?: string | null;
  entityType?: string | null;
  entityId?: string | null;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
  reason?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  sessionId?: string | null;
  hash?: string | null;
  prevHash?: string | null;
  occurredAt: Date;
}

export interface IAdminAction {
  id: string;
  actorId: string;
  action: string;
  target: string;
  targetId?: string | null;
  reason: string;
  approved: boolean;
  approvedById?: string | null;
  approvedAt?: Date | null;
  executedAt?: Date | null;
  createdAt: Date;
}

export interface IAuditHashEntry {
  id: string;
  hash: string;
  prevHash: string | null;
  occurredAt: Date;
  category: AuditEventCategory;
  action: string;
}
