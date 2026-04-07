// @dignity/auth — role-based access control policy
// Each role maps to a set of allowed permission strings.
// Permissions follow "resource:action" convention.

import { UserRole } from "@dignity/shared-types";

export type Permission =
  // Issuer program
  | "program:read"
  | "program:write"
  // Securities
  | "security:read"
  | "security:write"
  // Investor management
  | "investor:read"
  | "investor:write"
  | "investor:kyc_approve"
  // Subscriptions / redemptions
  | "subscription:read"
  | "subscription:approve"
  | "redemption:read"
  | "redemption:approve"
  // Reserve / proof center
  | "reserve:read"
  | "reserve:write"
  | "attestation:read"
  | "attestation:write"
  | "proof:read"
  // Treasury
  | "treasury:read"
  | "treasury:write"
  // Market ops
  | "market_ops:read"
  | "market_ops:write"
  // Compliance
  | "compliance:read"
  | "compliance:write"
  | "sanctions:read"
  | "transfer:approve"
  // Audit
  | "audit:read"
  // Admin
  | "admin:users"
  | "admin:system"
  // Public (no auth required — listed for completeness)
  | "public:proof_center"
  | "public:disclosure";

export type RolePolicy = Record<UserRole, Permission[]>;

export const ROLE_POLICY: RolePolicy = {
  [UserRole.SYSTEM_ADMIN]: [
    "program:read","program:write",
    "security:read","security:write",
    "investor:read","investor:write","investor:kyc_approve",
    "subscription:read","subscription:approve",
    "redemption:read","redemption:approve",
    "reserve:read","reserve:write",
    "attestation:read","attestation:write","proof:read",
    "treasury:read","treasury:write",
    "market_ops:read","market_ops:write",
    "compliance:read","compliance:write",
    "sanctions:read","transfer:approve",
    "audit:read",
    "admin:users","admin:system",
    "public:proof_center","public:disclosure",
  ],
  [UserRole.COMPLIANCE_OFFICER]: [
    "program:read",
    "security:read",
    "investor:read","investor:write","investor:kyc_approve",
    "subscription:read","subscription:approve",
    "redemption:read","redemption:approve",
    "reserve:read","attestation:read","proof:read",
    "treasury:read",
    "market_ops:read",
    "compliance:read","compliance:write",
    "sanctions:read","transfer:approve",
    "audit:read",
    "public:proof_center","public:disclosure",
  ],
  [UserRole.TREASURY_OFFICER]: [
    "program:read",
    "security:read",
    "reserve:read","reserve:write",
    "attestation:read","attestation:write","proof:read",
    "treasury:read","treasury:write",
    "market_ops:read",
    "compliance:read",
    "audit:read",
    "public:proof_center","public:disclosure",
  ],
  [UserRole.MARKET_OPS_OFFICER]: [
    "program:read",
    "security:read",
    "reserve:read","proof:read",
    "treasury:read",
    "market_ops:read","market_ops:write",
    "compliance:read",
    "audit:read",
    "public:proof_center","public:disclosure",
  ],
  [UserRole.INVESTOR_RELATIONS]: [
    "program:read",
    "security:read",
    "investor:read",
    "subscription:read",
    "redemption:read",
    "reserve:read","proof:read",
    "public:proof_center","public:disclosure",
  ],
  [UserRole.AUDITOR]: [
    "program:read",
    "security:read",
    "investor:read",
    "subscription:read",
    "redemption:read",
    "reserve:read","attestation:read","proof:read",
    "treasury:read",
    "market_ops:read",
    "compliance:read","sanctions:read",
    "audit:read",
    "public:proof_center","public:disclosure",
  ],
  [UserRole.MARKET_MAKER]: [
    "security:read",
    "market_ops:read","market_ops:write",
    "public:proof_center","public:disclosure",
  ],
  [UserRole.INVESTOR]: [
    "security:read",
    "subscription:read",
    "redemption:read",
    "reserve:read","proof:read",
    "public:proof_center","public:disclosure",
  ],
  [UserRole.PUBLIC]: [
    "public:proof_center","public:disclosure",
  ],
};
