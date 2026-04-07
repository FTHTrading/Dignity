-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SYSTEM_ADMIN', 'COMPLIANCE_OFFICER', 'TREASURY_OFFICER', 'MARKET_OPS_OFFICER', 'INVESTOR_RELATIONS', 'AUDITOR', 'MARKET_MAKER', 'INVESTOR', 'PUBLIC');

-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'EXPIRED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "KybStatus" AS ENUM ('NOT_REQUIRED', 'IN_PROGRESS', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "AccreditationStatus" AS ENUM ('NOT_REQUIRED', 'PENDING', 'VERIFIED', 'EXPIRED', 'REJECTED');

-- CreateEnum
CREATE TYPE "InvestorType" AS ENUM ('INDIVIDUAL', 'ENTITY', 'TRUST', 'FUND', 'FAMILY_OFFICE', 'SOVEREIGN_WEALTH', 'PENSION');

-- CreateEnum
CREATE TYPE "TokenStatus" AS ENUM ('PLANNED', 'DRAFT', 'UNDER_REVIEW', 'APPROVED', 'ACTIVE', 'SUSPENDED', 'REDEEMED', 'TERMINATED');

-- CreateEnum
CREATE TYPE "OfferingStatus" AS ENUM ('DRAFT', 'OPEN', 'CLOSED', 'OVERSUBSCRIBED', 'CANCELLED', 'SETTLED');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'PENDING_KYC', 'PENDING_FUNDS', 'APPROVED', 'REJECTED', 'SETTLED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RedemptionStatus" AS ENUM ('REQUESTED', 'PENDING_APPROVAL', 'APPROVED', 'PROCESSING', 'SETTLED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ReserveAssetClass" AS ENUM ('GOLD_BULLION', 'GOLD_ETF', 'SILVER_BULLION', 'PLATINUM', 'PALLADIUM', 'CASH_USD', 'CASH_EUR', 'TREASURY_BILL', 'MONEY_MARKET', 'OTHER');

-- CreateEnum
CREATE TYPE "ReserveLotStatus" AS ENUM ('ACTIVE', 'PARTIALLY_REDEEMED', 'REDEEMED', 'ENCUMBERED', 'DISPUTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AttestationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'VERIFIED', 'SUPERSEDED', 'REVOKED');

-- CreateEnum
CREATE TYPE "AttestationType" AS ENUM ('RESERVE_VALUATION', 'CUSTODY_CONFIRMATION', 'NAV_CALCULATION', 'COMPLIANCE_SIGN_OFF', 'ANNUAL_AUDIT', 'QUARTERLY_REVIEW');

-- CreateEnum
CREATE TYPE "TreasuryAccountType" AS ENUM ('OPERATING', 'RESERVE', 'ESCROW', 'REDEMPTION_POOL', 'MARKET_MAKING', 'FEE_COLLECTION');

-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('SUBSCRIPTION_RECEIPT', 'REDEMPTION_PAYMENT', 'MARKET_MAKER_ALLOCATION', 'REBALANCE', 'FEE', 'INTEREST', 'EXPENSE', 'CORRECTION');

-- CreateEnum
CREATE TYPE "SettlementRail" AS ENUM ('FIAT_WIRE', 'FIAT_ACH', 'USDC_ERC20', 'USDT_ERC20', 'ON_CHAIN_NATIVE', 'DELIVERY_VS_PAYMENT');

-- CreateEnum
CREATE TYPE "VenueStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'UNDER_REVIEW', 'TERMINATED', 'PENDING_APPROVAL');

-- CreateEnum
CREATE TYPE "VenueType" AS ENUM ('OTC_BROKER', 'APPROVED_EXCHANGE', 'ATS', 'BILATERAL_OTC', 'INTERNAL_DESK');

-- CreateEnum
CREATE TYPE "MarketMakerStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'UNDER_REVIEW', 'OFFBOARDED');

-- CreateEnum
CREATE TYPE "OtcRfqStatus" AS ENUM ('OPEN', 'QUOTED', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'SETTLED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CircuitBreakerTrigger" AS ENUM ('NAV_DEVIATION', 'SPREAD_BREACH', 'VOLUME_SPIKE', 'PRICE_ANOMALY', 'LIQUIDITY_GAP', 'MANUAL_HALT');

-- CreateEnum
CREATE TYPE "AuditEventCategory" AS ENUM ('AUTH', 'KYC', 'TOKEN_ACTION', 'COMPLIANCE', 'TREASURY', 'RESERVE', 'ATTESTATION', 'MARKET_OPS', 'SYSTEM', 'ADMIN_ACTION');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('SUBSCRIPTION_AGREEMENT', 'INVESTOR_DISCLOSURE', 'KYC_IDENTITY', 'KYB_ENTITY', 'ATTESTATION_REPORT', 'RESERVE_AUDIT', 'OFFERING_DOCUMENT', 'LEGAL_OPINION', 'RISK_DISCLOSURE', 'POLICY_DOCUMENT', 'CUSTODY_RECEIPT', 'PROOF_PACKAGE');

-- CreateEnum
CREATE TYPE "PolicyStatus" AS ENUM ('DRAFT', 'ACTIVE', 'SUPERSEDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TransferDecision" AS ENUM ('APPROVED', 'BLOCKED', 'PENDING_REVIEW', 'FLAGGED');

-- CreateEnum
CREATE TYPE "ApprovalRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ApprovalRequestType" AS ENUM ('MINT_REQUEST', 'REDEMPTION_APPROVE', 'LP_ONBOARD', 'VENUE_TOGGLE', 'RESERVE_REPORT_PUBLISH', 'SPREAD_POLICY_CHANGE', 'TREASURY_WIRE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'PUBLIC',
    "passwordHash" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssuerProgram" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IssuerProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrandSurface" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "tagline" TEXT,
    "logoUrl" TEXT,
    "primaryColor" TEXT NOT NULL DEFAULT '#C9A84C',
    "accentColor" TEXT NOT NULL DEFAULT '#1A1A1A',
    "websiteUrl" TEXT,
    "legalName" TEXT,
    "jurisdictions" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrandSurface_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityClass" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "TokenStatus" NOT NULL DEFAULT 'DRAFT',
    "totalSupplyCap" TEXT,
    "circulatingSupply" TEXT NOT NULL DEFAULT '0',
    "decimals" INTEGER NOT NULL DEFAULT 18,
    "contractAddress" TEXT,
    "chainId" INTEGER,
    "reserveRatio" DOUBLE PRECISION,
    "navPerToken" DOUBLE PRECISION,
    "navUpdatedAt" TIMESTAMP(3),
    "issuedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecurityClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferingRound" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "securityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "OfferingStatus" NOT NULL DEFAULT 'DRAFT',
    "minInvestment" DOUBLE PRECISION,
    "maxInvestment" DOUBLE PRECISION,
    "targetRaise" DOUBLE PRECISION,
    "totalRaised" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "openAt" TIMESTAMP(3),
    "closeAt" TIMESTAMP(3),
    "settledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfferingRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "investorType" "InvestorType" NOT NULL DEFAULT 'INDIVIDUAL',
    "entityName" TEXT,
    "countryCode" TEXT NOT NULL,
    "stateOrProvince" TEXT,
    "kycStatus" "KycStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "kycProvider" TEXT,
    "kycExternalId" TEXT,
    "kycApprovedAt" TIMESTAMP(3),
    "kycExpiresAt" TIMESTAMP(3),
    "kybStatus" "KybStatus" NOT NULL DEFAULT 'NOT_REQUIRED',
    "kybProvider" TEXT,
    "kybExternalId" TEXT,
    "kybApprovedAt" TIMESTAMP(3),
    "accreditationStatus" "AccreditationStatus" NOT NULL DEFAULT 'NOT_REQUIRED',
    "accreditationMethod" TEXT,
    "accreditationVerifiedAt" TIMESTAMP(3),
    "accreditationExpiresAt" TIMESTAMP(3),
    "walletAddress" TEXT,
    "whitelisted" BOOLEAN NOT NULL DEFAULT false,
    "whitelistedAt" TIMESTAMP(3),
    "sanctionsCleared" BOOLEAN NOT NULL DEFAULT false,
    "sanctionsClearedAt" TIMESTAMP(3),
    "totalInvested" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalRedeemed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KycKybRecord" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "externalId" TEXT,
    "status" "KycStatus" NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "rawPayload" JSONB,

    CONSTRAINT "KycKybRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccreditationRecord" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "status" "AccreditationStatus" NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "evidence" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccreditationRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JurisdictionRule" (
    "id" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "allowed" BOOLEAN NOT NULL DEFAULT false,
    "requiresKyc" BOOLEAN NOT NULL DEFAULT true,
    "requiresKyb" BOOLEAN NOT NULL DEFAULT false,
    "accreditationRequired" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "effectiveDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JurisdictionRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SanctionsCheck" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "walletAddress" TEXT,
    "provider" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "SanctionsCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletAllowlist" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removedAt" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "addedByRole" TEXT,

    CONSTRAINT "WalletAllowlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransferApprovalDecision" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "tokenSymbol" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "decision" "TransferDecision" NOT NULL,
    "decidedById" TEXT,
    "reason" TEXT,
    "decidedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransferApprovalDecision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplianceEvent" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ComplianceEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionRequest" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "securityId" TEXT NOT NULL,
    "offeringId" TEXT,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'DRAFT',
    "tokenAmount" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "amountFiat" DOUBLE PRECISION NOT NULL,
    "settlementRail" "SettlementRail",
    "submittedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "settledAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "txHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedemptionRequest" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "securityId" TEXT NOT NULL,
    "status" "RedemptionStatus" NOT NULL DEFAULT 'REQUESTED',
    "tokenAmount" TEXT NOT NULL,
    "expectedFiat" DOUBLE PRECISION,
    "actualFiat" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "settlementRail" "SettlementRail",
    "windowRef" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedAt" TIMESTAMP(3),
    "processedAt" TIMESTAMP(3),
    "settledAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "burnTxHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RedemptionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReserveAsset" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "assetClass" "ReserveAssetClass" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "symbol" TEXT,
    "custodian" TEXT,
    "isin" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReserveAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReserveLot" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "lotNumber" TEXT NOT NULL,
    "status" "ReserveLotStatus" NOT NULL DEFAULT 'ACTIVE',
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "acquiredAt" TIMESTAMP(3) NOT NULL,
    "acquiredPrice" DOUBLE PRECISION NOT NULL,
    "acquiredCurrency" TEXT NOT NULL DEFAULT 'USD',
    "custodianRef" TEXT,
    "locationVault" TEXT,
    "encumberedFrom" TIMESTAMP(3),
    "encumberedReason" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReserveLot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReserveValuation" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "valuedAt" TIMESTAMP(3) NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "totalValue" DOUBLE PRECISION NOT NULL,
    "source" TEXT NOT NULL,
    "methodology" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReserveValuation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReserveAttestation" (
    "id" TEXT NOT NULL,
    "type" "AttestationType" NOT NULL,
    "status" "AttestationStatus" NOT NULL DEFAULT 'DRAFT',
    "attestor" TEXT NOT NULL,
    "attestorType" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "submittedAt" TIMESTAMP(3),
    "verifiedAt" TIMESTAMP(3),
    "supersededById" TEXT,
    "revokedAt" TIMESTAMP(3),
    "summary" TEXT,
    "totalReserveValue" DOUBLE PRECISION,
    "totalTokenSupply" TEXT,
    "coverageRatio" DOUBLE PRECISION,
    "anchorTxHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReserveAttestation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustodyRecord" (
    "id" TEXT NOT NULL,
    "lotId" TEXT NOT NULL,
    "custodian" TEXT NOT NULL,
    "accountRef" TEXT,
    "transferredIn" TIMESTAMP(3) NOT NULL,
    "transferredOut" TIMESTAMP(3),
    "confirmedAt" TIMESTAMP(3),
    "receiptRef" TEXT,
    "notes" TEXT,

    CONSTRAINT "CustodyRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceDocument" (
    "id" TEXT NOT NULL,
    "lotId" TEXT,
    "attestationId" TEXT,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "hashSha256" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploadedBy" TEXT,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EvidenceDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProofAnchor" (
    "id" TEXT NOT NULL,
    "dataHash" TEXT NOT NULL,
    "dataType" TEXT NOT NULL,
    "refId" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "blockNumber" INTEGER,
    "anchoredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "ProofAnchor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReserveCoverageSnapshot" (
    "id" TEXT NOT NULL,
    "attestationId" TEXT,
    "snapshotAt" TIMESTAMP(3) NOT NULL,
    "totalReserveUsd" DOUBLE PRECISION NOT NULL,
    "totalTokenSupply" TEXT NOT NULL,
    "coverageRatio" DOUBLE PRECISION NOT NULL,
    "navPerToken" DOUBLE PRECISION NOT NULL,
    "totalLiabilitiesUsd" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "netAssetValue" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReserveCoverageSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreasuryAccount" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accountType" "TreasuryAccountType" NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "institution" TEXT,
    "accountRef" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TreasuryAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreasuryMovement" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "movementType" "MovementType" NOT NULL,
    "direction" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "reference" TEXT,
    "counterparty" TEXT,
    "settlementRail" "SettlementRail",
    "settledAt" TIMESTAMP(3),
    "valueDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "auditRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TreasuryMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FiatSettlement" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "rail" "SettlementRail" NOT NULL,
    "status" TEXT NOT NULL,
    "bankRef" TEXT,
    "initiatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "failureReason" TEXT,
    "notes" TEXT,

    CONSTRAINT "FiatSettlement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReconciliationRun" (
    "id" TEXT NOT NULL,
    "ranAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ranBy" TEXT,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "discrepancies" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "reportStorageKey" TEXT,

    CONSTRAINT "ReconciliationRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "venueType" "VenueType" NOT NULL,
    "status" "VenueStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
    "url" TEXT,
    "apiEndpoint" TEXT,
    "jurisdiction" TEXT,
    "approvedAt" TIMESTAMP(3),
    "suspendedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VenueHealth" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "online" BOOLEAN NOT NULL,
    "bidLiquidity" DOUBLE PRECISION,
    "askLiquidity" DOUBLE PRECISION,
    "midPrice" DOUBLE PRECISION,
    "spread" DOUBLE PRECISION,
    "spreadBps" DOUBLE PRECISION,
    "volume24h" DOUBLE PRECISION,
    "latencyMs" INTEGER,
    "notes" TEXT,

    CONSTRAINT "VenueHealth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketMaker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "entityType" TEXT,
    "status" "MarketMakerStatus" NOT NULL DEFAULT 'ACTIVE',
    "approvedAt" TIMESTAMP(3),
    "suspendedAt" TIMESTAMP(3),
    "contactRef" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketMaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryAllocation" (
    "id" TEXT NOT NULL,
    "venueId" TEXT,
    "marketMakerId" TEXT,
    "tokenSymbol" TEXT NOT NULL,
    "allocatedAmount" TEXT NOT NULL,
    "usedAmount" TEXT NOT NULL DEFAULT '0',
    "availableFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpreadPolicy" (
    "id" TEXT NOT NULL,
    "marketMakerId" TEXT NOT NULL,
    "tokenSymbol" TEXT NOT NULL,
    "maxSpreadBps" DOUBLE PRECISION NOT NULL,
    "targetSpreadBps" DOUBLE PRECISION NOT NULL,
    "minOrderSize" DOUBLE PRECISION,
    "maxOrderSize" DOUBLE PRECISION,
    "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveTo" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SpreadPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteSnapshot" (
    "id" TEXT NOT NULL,
    "venueId" TEXT,
    "marketMakerId" TEXT,
    "tokenSymbol" TEXT NOT NULL,
    "bid" DOUBLE PRECISION NOT NULL,
    "ask" DOUBLE PRECISION NOT NULL,
    "mid" DOUBLE PRECISION NOT NULL,
    "spread" DOUBLE PRECISION NOT NULL,
    "spreadBps" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuoteSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiquiditySnapshot" (
    "id" TEXT NOT NULL,
    "securityId" TEXT NOT NULL,
    "totalBidDepthUsd" DOUBLE PRECISION,
    "totalAskDepthUsd" DOUBLE PRECISION,
    "weightedMid" DOUBLE PRECISION,
    "navReference" DOUBLE PRECISION,
    "premiumDiscountBps" DOUBLE PRECISION,
    "activeMMs" INTEGER NOT NULL DEFAULT 0,
    "activeVenues" INTEGER NOT NULL DEFAULT 0,
    "snapshotAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LiquiditySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavReference" (
    "id" TEXT NOT NULL,
    "securityId" TEXT NOT NULL,
    "navPerToken" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "methodology" TEXT,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "NavReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingAnomaly" (
    "id" TEXT NOT NULL,
    "tokenSymbol" TEXT NOT NULL,
    "venueId" TEXT,
    "anomalyType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "details" JSONB,
    "notes" TEXT,
    "autoResolved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PricingAnomaly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CircuitBreakerEvent" (
    "id" TEXT NOT NULL,
    "tokenSymbol" TEXT NOT NULL,
    "venueId" TEXT,
    "trigger" "CircuitBreakerTrigger" NOT NULL,
    "severity" TEXT NOT NULL,
    "triggeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "resolution" TEXT,
    "autoTriggered" BOOLEAN NOT NULL DEFAULT true,
    "details" JSONB,

    CONSTRAINT "CircuitBreakerEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtcRfq" (
    "id" TEXT NOT NULL,
    "investorId" TEXT,
    "initiator" TEXT NOT NULL,
    "tokenSymbol" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "maxPrice" DOUBLE PRECISION,
    "minPrice" DOUBLE PRECISION,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "OtcRfqStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtcRfq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtcQuote" (
    "id" TEXT NOT NULL,
    "rfqId" TEXT NOT NULL,
    "marketMakerId" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" TEXT NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtcQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtcTrade" (
    "id" TEXT NOT NULL,
    "rfqId" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" TEXT NOT NULL,
    "totalFiat" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "settledAt" TIMESTAMP(3),
    "txHash" TEXT,
    "status" TEXT NOT NULL,
    "tradeDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtcTrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditEvent" (
    "id" TEXT NOT NULL,
    "category" "AuditEventCategory" NOT NULL,
    "actorId" TEXT,
    "actorRole" TEXT,
    "action" TEXT NOT NULL,
    "targetType" TEXT,
    "targetId" TEXT,
    "description" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "hashChain" TEXT,
    "prevEventId" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminAction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "targetType" TEXT,
    "targetId" TEXT,
    "payload" JSONB,
    "result" TEXT,
    "performedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignedDocument" (
    "id" TEXT NOT NULL,
    "investorId" TEXT,
    "documentType" "DocumentType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "hashSha256" TEXT NOT NULL,
    "signerName" TEXT,
    "signerEmail" TEXT,
    "signedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SignedDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisclosureVersion" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "effectiveAt" TIMESTAMP(3) NOT NULL,
    "supersededAt" TIMESTAMP(3),
    "hashSha256" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DisclosureVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolicyFile" (
    "id" TEXT NOT NULL,
    "programId" TEXT,
    "name" TEXT NOT NULL,
    "policyType" TEXT NOT NULL,
    "status" "PolicyStatus" NOT NULL DEFAULT 'DRAFT',
    "version" TEXT NOT NULL,
    "storageKey" TEXT,
    "content" TEXT,
    "effectiveAt" TIMESTAMP(3),
    "expiredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PolicyFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemAlert" (
    "id" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "details" JSONB,
    "acknowledged" BOOLEAN NOT NULL DEFAULT false,
    "acknowledgedBy" TEXT,
    "acknowledgedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApprovalRequest" (
    "id" TEXT NOT NULL,
    "requestType" "ApprovalRequestType" NOT NULL,
    "status" "ApprovalRequestStatus" NOT NULL DEFAULT 'PENDING',
    "requestedById" TEXT,
    "requestedByRole" TEXT,
    "approvedById" TEXT,
    "rejectedById" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "payload" JSONB,
    "decisionNote" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "decidedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "ApprovalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReserveReport" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "totalReserveUsd" DOUBLE PRECISION NOT NULL,
    "coverageRatio" DOUBLE PRECISION NOT NULL,
    "navPerToken" DOUBLE PRECISION NOT NULL,
    "circulatingSupply" TEXT NOT NULL,
    "goldOz" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "proofCid" TEXT,
    "publishedAt" TIMESTAMP(3),
    "preparedBy" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReserveReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Session_token_idx" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "IssuerProgram_slug_key" ON "IssuerProgram"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BrandSurface_programId_key" ON "BrandSurface"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "SecurityClass_symbol_key" ON "SecurityClass"("symbol");

-- CreateIndex
CREATE INDEX "SecurityClass_symbol_idx" ON "SecurityClass"("symbol");

-- CreateIndex
CREATE INDEX "SecurityClass_status_idx" ON "SecurityClass"("status");

-- CreateIndex
CREATE INDEX "OfferingRound_status_idx" ON "OfferingRound"("status");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorProfile_userId_key" ON "InvestorProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorProfile_walletAddress_key" ON "InvestorProfile"("walletAddress");

-- CreateIndex
CREATE INDEX "InvestorProfile_kycStatus_idx" ON "InvestorProfile"("kycStatus");

-- CreateIndex
CREATE INDEX "InvestorProfile_accreditationStatus_idx" ON "InvestorProfile"("accreditationStatus");

-- CreateIndex
CREATE INDEX "InvestorProfile_walletAddress_idx" ON "InvestorProfile"("walletAddress");

-- CreateIndex
CREATE INDEX "InvestorProfile_whitelisted_idx" ON "InvestorProfile"("whitelisted");

-- CreateIndex
CREATE INDEX "KycKybRecord_investorId_idx" ON "KycKybRecord"("investorId");

-- CreateIndex
CREATE INDEX "KycKybRecord_status_idx" ON "KycKybRecord"("status");

-- CreateIndex
CREATE INDEX "AccreditationRecord_investorId_idx" ON "AccreditationRecord"("investorId");

-- CreateIndex
CREATE INDEX "JurisdictionRule_allowed_idx" ON "JurisdictionRule"("allowed");

-- CreateIndex
CREATE UNIQUE INDEX "JurisdictionRule_countryCode_key" ON "JurisdictionRule"("countryCode");

-- CreateIndex
CREATE INDEX "SanctionsCheck_investorId_idx" ON "SanctionsCheck"("investorId");

-- CreateIndex
CREATE INDEX "SanctionsCheck_result_idx" ON "SanctionsCheck"("result");

-- CreateIndex
CREATE UNIQUE INDEX "WalletAllowlist_address_key" ON "WalletAllowlist"("address");

-- CreateIndex
CREATE INDEX "WalletAllowlist_investorId_idx" ON "WalletAllowlist"("investorId");

-- CreateIndex
CREATE INDEX "WalletAllowlist_address_idx" ON "WalletAllowlist"("address");

-- CreateIndex
CREATE INDEX "WalletAllowlist_active_idx" ON "WalletAllowlist"("active");

-- CreateIndex
CREATE INDEX "TransferApprovalDecision_investorId_idx" ON "TransferApprovalDecision"("investorId");

-- CreateIndex
CREATE INDEX "TransferApprovalDecision_decision_idx" ON "TransferApprovalDecision"("decision");

-- CreateIndex
CREATE INDEX "ComplianceEvent_investorId_idx" ON "ComplianceEvent"("investorId");

-- CreateIndex
CREATE INDEX "ComplianceEvent_occurredAt_idx" ON "ComplianceEvent"("occurredAt");

-- CreateIndex
CREATE INDEX "SubscriptionRequest_investorId_idx" ON "SubscriptionRequest"("investorId");

-- CreateIndex
CREATE INDEX "SubscriptionRequest_securityId_idx" ON "SubscriptionRequest"("securityId");

-- CreateIndex
CREATE INDEX "SubscriptionRequest_status_idx" ON "SubscriptionRequest"("status");

-- CreateIndex
CREATE INDEX "RedemptionRequest_investorId_idx" ON "RedemptionRequest"("investorId");

-- CreateIndex
CREATE INDEX "RedemptionRequest_status_idx" ON "RedemptionRequest"("status");

-- CreateIndex
CREATE INDEX "ReserveAsset_programId_idx" ON "ReserveAsset"("programId");

-- CreateIndex
CREATE INDEX "ReserveAsset_assetClass_idx" ON "ReserveAsset"("assetClass");

-- CreateIndex
CREATE UNIQUE INDEX "ReserveLot_lotNumber_key" ON "ReserveLot"("lotNumber");

-- CreateIndex
CREATE INDEX "ReserveLot_assetId_idx" ON "ReserveLot"("assetId");

-- CreateIndex
CREATE INDEX "ReserveLot_status_idx" ON "ReserveLot"("status");

-- CreateIndex
CREATE INDEX "ReserveValuation_assetId_idx" ON "ReserveValuation"("assetId");

-- CreateIndex
CREATE INDEX "ReserveValuation_valuedAt_idx" ON "ReserveValuation"("valuedAt");

-- CreateIndex
CREATE INDEX "ReserveAttestation_status_idx" ON "ReserveAttestation"("status");

-- CreateIndex
CREATE INDEX "ReserveAttestation_attestor_idx" ON "ReserveAttestation"("attestor");

-- CreateIndex
CREATE INDEX "CustodyRecord_lotId_idx" ON "CustodyRecord"("lotId");

-- CreateIndex
CREATE INDEX "CustodyRecord_custodian_idx" ON "CustodyRecord"("custodian");

-- CreateIndex
CREATE INDEX "EvidenceDocument_lotId_idx" ON "EvidenceDocument"("lotId");

-- CreateIndex
CREATE INDEX "EvidenceDocument_attestationId_idx" ON "EvidenceDocument"("attestationId");

-- CreateIndex
CREATE UNIQUE INDEX "ProofAnchor_dataHash_key" ON "ProofAnchor"("dataHash");

-- CreateIndex
CREATE INDEX "ProofAnchor_dataType_idx" ON "ProofAnchor"("dataType");

-- CreateIndex
CREATE INDEX "ProofAnchor_txHash_idx" ON "ProofAnchor"("txHash");

-- CreateIndex
CREATE INDEX "ReserveCoverageSnapshot_snapshotAt_idx" ON "ReserveCoverageSnapshot"("snapshotAt");

-- CreateIndex
CREATE INDEX "TreasuryAccount_programId_idx" ON "TreasuryAccount"("programId");

-- CreateIndex
CREATE INDEX "TreasuryAccount_accountType_idx" ON "TreasuryAccount"("accountType");

-- CreateIndex
CREATE INDEX "TreasuryMovement_accountId_idx" ON "TreasuryMovement"("accountId");

-- CreateIndex
CREATE INDEX "TreasuryMovement_movementType_idx" ON "TreasuryMovement"("movementType");

-- CreateIndex
CREATE INDEX "TreasuryMovement_valueDate_idx" ON "TreasuryMovement"("valueDate");

-- CreateIndex
CREATE INDEX "FiatSettlement_investorId_idx" ON "FiatSettlement"("investorId");

-- CreateIndex
CREATE INDEX "FiatSettlement_status_idx" ON "FiatSettlement"("status");

-- CreateIndex
CREATE INDEX "ReconciliationRun_ranAt_idx" ON "ReconciliationRun"("ranAt");

-- CreateIndex
CREATE INDEX "ReconciliationRun_status_idx" ON "ReconciliationRun"("status");

-- CreateIndex
CREATE INDEX "Venue_programId_idx" ON "Venue"("programId");

-- CreateIndex
CREATE INDEX "Venue_status_idx" ON "Venue"("status");

-- CreateIndex
CREATE INDEX "VenueHealth_venueId_idx" ON "VenueHealth"("venueId");

-- CreateIndex
CREATE INDEX "VenueHealth_checkedAt_idx" ON "VenueHealth"("checkedAt");

-- CreateIndex
CREATE INDEX "InventoryAllocation_tokenSymbol_idx" ON "InventoryAllocation"("tokenSymbol");

-- CreateIndex
CREATE INDEX "InventoryAllocation_active_idx" ON "InventoryAllocation"("active");

-- CreateIndex
CREATE INDEX "SpreadPolicy_marketMakerId_idx" ON "SpreadPolicy"("marketMakerId");

-- CreateIndex
CREATE INDEX "SpreadPolicy_tokenSymbol_idx" ON "SpreadPolicy"("tokenSymbol");

-- CreateIndex
CREATE INDEX "QuoteSnapshot_tokenSymbol_idx" ON "QuoteSnapshot"("tokenSymbol");

-- CreateIndex
CREATE INDEX "QuoteSnapshot_timestamp_idx" ON "QuoteSnapshot"("timestamp");

-- CreateIndex
CREATE INDEX "LiquiditySnapshot_securityId_idx" ON "LiquiditySnapshot"("securityId");

-- CreateIndex
CREATE INDEX "LiquiditySnapshot_snapshotAt_idx" ON "LiquiditySnapshot"("snapshotAt");

-- CreateIndex
CREATE INDEX "NavReference_securityId_idx" ON "NavReference"("securityId");

-- CreateIndex
CREATE INDEX "NavReference_effectiveDate_idx" ON "NavReference"("effectiveDate");

-- CreateIndex
CREATE INDEX "PricingAnomaly_tokenSymbol_idx" ON "PricingAnomaly"("tokenSymbol");

-- CreateIndex
CREATE INDEX "PricingAnomaly_severity_idx" ON "PricingAnomaly"("severity");

-- CreateIndex
CREATE INDEX "PricingAnomaly_detectedAt_idx" ON "PricingAnomaly"("detectedAt");

-- CreateIndex
CREATE INDEX "CircuitBreakerEvent_tokenSymbol_idx" ON "CircuitBreakerEvent"("tokenSymbol");

-- CreateIndex
CREATE INDEX "CircuitBreakerEvent_triggeredAt_idx" ON "CircuitBreakerEvent"("triggeredAt");

-- CreateIndex
CREATE INDEX "OtcRfq_tokenSymbol_idx" ON "OtcRfq"("tokenSymbol");

-- CreateIndex
CREATE INDEX "OtcRfq_status_idx" ON "OtcRfq"("status");

-- CreateIndex
CREATE INDEX "OtcQuote_rfqId_idx" ON "OtcQuote"("rfqId");

-- CreateIndex
CREATE INDEX "OtcQuote_marketMakerId_idx" ON "OtcQuote"("marketMakerId");

-- CreateIndex
CREATE UNIQUE INDEX "OtcTrade_quoteId_key" ON "OtcTrade"("quoteId");

-- CreateIndex
CREATE INDEX "OtcTrade_rfqId_idx" ON "OtcTrade"("rfqId");

-- CreateIndex
CREATE INDEX "OtcTrade_status_idx" ON "OtcTrade"("status");

-- CreateIndex
CREATE INDEX "AuditEvent_category_idx" ON "AuditEvent"("category");

-- CreateIndex
CREATE INDEX "AuditEvent_actorId_idx" ON "AuditEvent"("actorId");

-- CreateIndex
CREATE INDEX "AuditEvent_occurredAt_idx" ON "AuditEvent"("occurredAt");

-- CreateIndex
CREATE INDEX "AuditEvent_targetType_targetId_idx" ON "AuditEvent"("targetType", "targetId");

-- CreateIndex
CREATE INDEX "AdminAction_userId_idx" ON "AdminAction"("userId");

-- CreateIndex
CREATE INDEX "AdminAction_action_idx" ON "AdminAction"("action");

-- CreateIndex
CREATE INDEX "SignedDocument_investorId_idx" ON "SignedDocument"("investorId");

-- CreateIndex
CREATE INDEX "SignedDocument_documentType_idx" ON "SignedDocument"("documentType");

-- CreateIndex
CREATE INDEX "DisclosureVersion_slug_idx" ON "DisclosureVersion"("slug");

-- CreateIndex
CREATE INDEX "DisclosureVersion_effectiveAt_idx" ON "DisclosureVersion"("effectiveAt");

-- CreateIndex
CREATE UNIQUE INDEX "DisclosureVersion_slug_version_key" ON "DisclosureVersion"("slug", "version");

-- CreateIndex
CREATE INDEX "PolicyFile_policyType_idx" ON "PolicyFile"("policyType");

-- CreateIndex
CREATE INDEX "PolicyFile_status_idx" ON "PolicyFile"("status");

-- CreateIndex
CREATE INDEX "SystemAlert_severity_idx" ON "SystemAlert"("severity");

-- CreateIndex
CREATE INDEX "SystemAlert_acknowledged_idx" ON "SystemAlert"("acknowledged");

-- CreateIndex
CREATE INDEX "SystemAlert_occurredAt_idx" ON "SystemAlert"("occurredAt");

-- CreateIndex
CREATE INDEX "ApprovalRequest_status_idx" ON "ApprovalRequest"("status");

-- CreateIndex
CREATE INDEX "ApprovalRequest_requestType_idx" ON "ApprovalRequest"("requestType");

-- CreateIndex
CREATE INDEX "ApprovalRequest_requestedAt_idx" ON "ApprovalRequest"("requestedAt");

-- CreateIndex
CREATE INDEX "ReserveReport_programId_idx" ON "ReserveReport"("programId");

-- CreateIndex
CREATE INDEX "ReserveReport_status_idx" ON "ReserveReport"("status");

-- CreateIndex
CREATE INDEX "ReserveReport_periodEnd_idx" ON "ReserveReport"("periodEnd");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandSurface" ADD CONSTRAINT "BrandSurface_programId_fkey" FOREIGN KEY ("programId") REFERENCES "IssuerProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityClass" ADD CONSTRAINT "SecurityClass_programId_fkey" FOREIGN KEY ("programId") REFERENCES "IssuerProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingRound" ADD CONSTRAINT "OfferingRound_programId_fkey" FOREIGN KEY ("programId") REFERENCES "IssuerProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingRound" ADD CONSTRAINT "OfferingRound_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "SecurityClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorProfile" ADD CONSTRAINT "InvestorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KycKybRecord" ADD CONSTRAINT "KycKybRecord_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "InvestorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletAllowlist" ADD CONSTRAINT "WalletAllowlist_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "InvestorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferApprovalDecision" ADD CONSTRAINT "TransferApprovalDecision_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "InvestorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferApprovalDecision" ADD CONSTRAINT "TransferApprovalDecision_decidedById_fkey" FOREIGN KEY ("decidedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceEvent" ADD CONSTRAINT "ComplianceEvent_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "InvestorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionRequest" ADD CONSTRAINT "SubscriptionRequest_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "InvestorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionRequest" ADD CONSTRAINT "SubscriptionRequest_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "SecurityClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionRequest" ADD CONSTRAINT "SubscriptionRequest_offeringId_fkey" FOREIGN KEY ("offeringId") REFERENCES "OfferingRound"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedemptionRequest" ADD CONSTRAINT "RedemptionRequest_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "InvestorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedemptionRequest" ADD CONSTRAINT "RedemptionRequest_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "SecurityClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReserveAsset" ADD CONSTRAINT "ReserveAsset_programId_fkey" FOREIGN KEY ("programId") REFERENCES "IssuerProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReserveLot" ADD CONSTRAINT "ReserveLot_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "ReserveAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReserveValuation" ADD CONSTRAINT "ReserveValuation_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "ReserveAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustodyRecord" ADD CONSTRAINT "CustodyRecord_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "ReserveLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceDocument" ADD CONSTRAINT "EvidenceDocument_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "ReserveLot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceDocument" ADD CONSTRAINT "EvidenceDocument_attestationId_fkey" FOREIGN KEY ("attestationId") REFERENCES "ReserveAttestation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReserveCoverageSnapshot" ADD CONSTRAINT "ReserveCoverageSnapshot_attestationId_fkey" FOREIGN KEY ("attestationId") REFERENCES "ReserveAttestation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreasuryAccount" ADD CONSTRAINT "TreasuryAccount_programId_fkey" FOREIGN KEY ("programId") REFERENCES "IssuerProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreasuryMovement" ADD CONSTRAINT "TreasuryMovement_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "TreasuryAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_programId_fkey" FOREIGN KEY ("programId") REFERENCES "IssuerProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueHealth" ADD CONSTRAINT "VenueHealth_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryAllocation" ADD CONSTRAINT "InventoryAllocation_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryAllocation" ADD CONSTRAINT "InventoryAllocation_marketMakerId_fkey" FOREIGN KEY ("marketMakerId") REFERENCES "MarketMaker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpreadPolicy" ADD CONSTRAINT "SpreadPolicy_marketMakerId_fkey" FOREIGN KEY ("marketMakerId") REFERENCES "MarketMaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiquiditySnapshot" ADD CONSTRAINT "LiquiditySnapshot_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "SecurityClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavReference" ADD CONSTRAINT "NavReference_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "SecurityClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtcQuote" ADD CONSTRAINT "OtcQuote_rfqId_fkey" FOREIGN KEY ("rfqId") REFERENCES "OtcRfq"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtcQuote" ADD CONSTRAINT "OtcQuote_marketMakerId_fkey" FOREIGN KEY ("marketMakerId") REFERENCES "MarketMaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtcTrade" ADD CONSTRAINT "OtcTrade_rfqId_fkey" FOREIGN KEY ("rfqId") REFERENCES "OtcRfq"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtcTrade" ADD CONSTRAINT "OtcTrade_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "OtcQuote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditEvent" ADD CONSTRAINT "AuditEvent_prevEventId_fkey" FOREIGN KEY ("prevEventId") REFERENCES "AuditEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditEvent" ADD CONSTRAINT "AuditEvent_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminAction" ADD CONSTRAINT "AdminAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignedDocument" ADD CONSTRAINT "SignedDocument_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "InvestorProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyFile" ADD CONSTRAINT "PolicyFile_programId_fkey" FOREIGN KEY ("programId") REFERENCES "IssuerProgram"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalRequest" ADD CONSTRAINT "ApprovalRequest_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalRequest" ADD CONSTRAINT "ApprovalRequest_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalRequest" ADD CONSTRAINT "ApprovalRequest_rejectedById_fkey" FOREIGN KEY ("rejectedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReserveReport" ADD CONSTRAINT "ReserveReport_programId_fkey" FOREIGN KEY ("programId") REFERENCES "IssuerProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
