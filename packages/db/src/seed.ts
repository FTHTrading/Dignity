// @dignity/db — seed script
// Loads demo data for local development. Only runs in dev mode.
// Run: pnpm db:seed

import { prisma } from "./index";
import { hashSync } from "bcryptjs";

async function main() {
  console.log("  Dignity — seeding demo data...\n");

  // ── Demo Admin User ─────────────────────────────────────────────────────────
  await prisma.user.upsert({
    where: { email: "admin@dignity.demo" },
    update: {},
    create: {
      email: "admin@dignity.demo",
      name: "Demo Admin",
      role: "SYSTEM_ADMIN",
      active: true,
      passwordHash: hashSync("Demo1234!", 12),
    },
  });

  // ── Issuer Program ──────────────────────────────────────────────────────────
  const program = await prisma.issuerProgram.upsert({
    where: { slug: "dignity" },
    update: {},
    create: {
      slug: "dignity",
      name: "Dignity",
      description:
        "A reserve-backed institutional digital security anchored in physical precious metals. Designed for accredited and institutional investors seeking disciplined exposure to gold-referenced value with institutional-grade compliance and custody.",
      active: true,
      brandSurface: {
        create: {
          tagline: "Reserve. Discipline. Trust.",
          primaryColor: "#C9A84C",
          accentColor: "#1A1A1A",
          legalName: "Dignity Digital Assets LLC",
          jurisdictions: ["US", "GB", "SG", "CH"],
        },
      },
    },
  });

  // ── Security Class ──────────────────────────────────────────────────────────
  const security = await prisma.securityClass.upsert({
    where: { symbol: "DIGAU" },
    update: {},
    create: {
      programId: program.id,
      symbol: "DIGAU",
      name: "Dignity Gold",
      description:
        "DIGAU is a reserve-backed digital security representing a beneficial interest in physical gold held in qualified custody. Each token is referenced to a defined weight of gold bullion.",
      status: "ACTIVE",
      totalSupplyCap: "1000000000000000000000000", // 1M tokens (18 decimals)
      circulatingSupply: "500000000000000000000000", // 500K tokens
      decimals: 18,
      navPerToken: 62.4, // USD per token (demo)
      navUpdatedAt: new Date(),
    },
  });

  // ── Reserve Assets ──────────────────────────────────────────────────────────
  const goldAsset = await prisma.reserveAsset.upsert({
    where: { id: "reserve-gold-primary" },
    update: {},
    create: {
      id: "reserve-gold-primary",
      programId: program.id,
      assetClass: "GOLD_BULLION",
      name: "London Good Delivery Gold Bars",
      description:
        "Allocated physical gold bars meeting LBMA Good Delivery specification, held at approved custodian vault.",
      symbol: "XAU",
      custodian: "Brink's Global Services",
      active: true,
    },
  });

  await prisma.reserveLot.upsert({
    where: { lotNumber: "DIG-AU-2024-001" },
    update: {},
    create: {
      assetId: goldAsset.id,
      lotNumber: "DIG-AU-2024-001",
      status: "ACTIVE",
      quantity: 500,
      unit: "troy_oz",
      acquiredAt: new Date("2024-01-15"),
      acquiredPrice: 2020.5,
      acquiredCurrency: "USD",
      custodianRef: "BRK-AU-PRG-0001",
      locationVault: "London — Vault 7",
    },
  });

  await prisma.reserveLot.upsert({
    where: { lotNumber: "DIG-AU-2024-002" },
    update: {},
    create: {
      assetId: goldAsset.id,
      lotNumber: "DIG-AU-2024-002",
      status: "ACTIVE",
      quantity: 750,
      unit: "troy_oz",
      acquiredAt: new Date("2024-06-01"),
      acquiredPrice: 2310.0,
      acquiredCurrency: "USD",
      custodianRef: "BRK-AU-PRG-0002",
      locationVault: "Zurich — Vault 3",
    },
  });

  // ── Reserve Valuation ───────────────────────────────────────────────────────
  await prisma.reserveValuation.create({
    data: {
      assetId: goldAsset.id,
      valuedAt: new Date(),
      pricePerUnit: 3120.0,
      currency: "USD",
      totalValue: 3_900_000, // 1250 oz × $3120
      source: "LBMA",
      methodology: "LBMA AM Gold Fix — London",
    },
  });

  // ── Treasury Accounts ───────────────────────────────────────────────────────
  await prisma.treasuryAccount.upsert({
    where: { id: "treasury-reserve-main" },
    update: {},
    create: {
      id: "treasury-reserve-main",
      programId: program.id,
      name: "Primary Reserve Account",
      accountType: "RESERVE",
      currency: "USD",
      balance: 3_900_000,
      institution: "First Republic Trust",
      accountRef: "DEMO-RESERVE-001",
    },
  });

  await prisma.treasuryAccount.upsert({
    where: { id: "treasury-operating" },
    update: {},
    create: {
      id: "treasury-operating",
      programId: program.id,
      name: "Operating Account",
      accountType: "OPERATING",
      currency: "USD",
      balance: 250_000,
      institution: "First Republic Trust",
      accountRef: "DEMO-OPS-001",
    },
  });

  await prisma.treasuryAccount.upsert({
    where: { id: "treasury-mm-pool" },
    update: {},
    create: {
      id: "treasury-mm-pool",
      programId: program.id,
      name: "Market Making Pool",
      accountType: "MARKET_MAKING",
      currency: "USD",
      balance: 500_000,
      institution: "First Republic Trust",
      accountRef: "DEMO-MM-001",
    },
  });

  // ── Jurisdiction Rules ──────────────────────────────────────────────────────
  const allowedCountries = ["US", "GB", "SG", "CH", "CA", "AU", "HK", "AE"];
  for (const cc of allowedCountries) {
    await prisma.jurisdictionRule.upsert({
      where: { countryCode: cc },
      update: {},
      create: {
        countryCode: cc,
        allowed: true,
        requiresKyc: true,
        requiresKyb: cc !== "US",
        accreditationRequired: true,
      },
    });
  }

  // ── Demo NAV Reference ──────────────────────────────────────────────────────
  await prisma.navReference.create({
    data: {
      securityId: security.id,
      navPerToken: 62.4,
      currency: "USD",
      methodology: "LBMA AM Fix × allocated oz per token ÷ circulating supply",
      effectiveDate: new Date(),
      source: "issuer",
    },
  });

  // ── Demo Venue ──────────────────────────────────────────────────────────────
  const venue = await prisma.venue.upsert({
    where: { id: "venue-otc-primary" },
    update: {},
    create: {
      id: "venue-otc-primary",
      programId: program.id,
      name: "Dignity OTC Desk",
      venueType: "BILATERAL_OTC",
      status: "ACTIVE",
      jurisdiction: "US",
      approvedAt: new Date("2024-01-01"),
    },
  });

  // ── Demo Market Maker ───────────────────────────────────────────────────────
  const mm = await prisma.marketMaker.upsert({
    where: { id: "mm-primary" },
    update: {},
    create: {
      id: "mm-primary",
      name: "Sovereign Market Partners LLC",
      entityType: "Registered Broker-Dealer",
      status: "ACTIVE",
      approvedAt: new Date("2024-01-01"),
    },
  });

  // ── Demo Attestation ────────────────────────────────────────────────────────
  await prisma.reserveAttestation.upsert({
    where: { id: "attest-q4-2024" },
    update: {},
    create: {
      id: "attest-q4-2024",
      type: "RESERVE_VALUATION",
      status: "VERIFIED",
      attestor: "Clarity Audit LLP",
      attestorType: "third-party-auditor",
      periodStart: new Date("2024-10-01"),
      periodEnd: new Date("2024-12-31"),
      submittedAt: new Date("2025-01-15"),
      verifiedAt: new Date("2025-01-20"),
      summary:
        "Reserve assets confirmed as held in allocated custody. Coverage ratio of 1.04x verified against circulating supply as of period end.",
      totalReserveValue: 3_900_000,
      totalTokenSupply: "500000000000000000000000",
      coverageRatio: 1.04,
    },
  });

  // ── Demo Disclosure ─────────────────────────────────────────────────────────
  await prisma.disclosureVersion.upsert({
    where: { slug_version: { slug: "offering-memorandum", version: "1.0" } },
    update: {},
    create: {
      slug: "offering-memorandum",
      title: "DIGAU — Offering Memorandum",
      version: "1.0",
      content:
        "This document provides material information about the DIGAU digital security. Investment involves risk including loss of principal. For accredited and institutional investors only.",
      effectiveAt: new Date("2024-01-01"),
      hashSha256: "demo-hash-placeholder",
      isPublic: true,
    },
  });

  // ── Additional Venues ────────────────────────────────────────────────────
  await prisma.venue.upsert({
    where: { id: "venue-ats-primary" },
    update: {},
    create: {
      id: "venue-ats-primary",
      programId: program.id,
      name: "Dignity ATS",
      venueType: "ATS",
      status: "PENDING_APPROVAL",
      jurisdiction: "US",
      notes: "FINRA BD-29847 — pending ATS registration. Min trade $5K, max $5M.",
    },
  });

  await prisma.venue.upsert({
    where: { id: "venue-exchange-eu" },
    update: {},
    create: {
      id: "venue-exchange-eu",
      programId: program.id,
      name: "Dignity EU Exchange",
      venueType: "APPROVED_EXCHANGE",
      status: "ACTIVE",
      jurisdiction: "LU",
      notes: "CSSF-AIF-2024-0091 — fully licensed. Min trade €10K.",
    },
  });

  await prisma.venue.upsert({
    where: { id: "venue-otc-broker-sg" },
    update: {},
    create: {
      id: "venue-otc-broker-sg",
      programId: program.id,
      name: "Singapore OTC Desk",
      venueType: "OTC_BROKER",
      status: "UNDER_REVIEW",
      jurisdiction: "SG",
      notes: "MAS-CMS-9034 — under MAS review. Min trade SGD 100K, negotiated fees.",
    },
  });

  // ── Liquidity Snapshots ───────────────────────────────────────────────────
  const snapshots = [
    { bid: 62.10, ask: 62.30, depth: 250000 },
    { bid: 62.20, ask: 62.40, depth: 310000 },
    { bid: 62.15, ask: 62.35, depth: 180000 },
    { bid: 62.05, ask: 62.28, depth: 420000 },
    { bid: 62.28, ask: 62.47, depth: 375000 },
  ];
  for (const snap of snapshots) {
    await prisma.liquiditySnapshot.create({
      data: {
        securityId: security.id,
        totalBidDepthUsd: snap.depth * 0.5,
        totalAskDepthUsd: snap.depth * 0.5,
        weightedMid: (snap.bid + snap.ask) / 2,
        activeMMs: 1,
        activeVenues: 1,
        snapshotAt: new Date(Date.now() - Math.random() * 7 * 86400000),
      },
    });
  }

  // ── Audit Events ──────────────────────────────────────────────────────────
  const auditSeeds = [
    { category: "AUTH" as const, action: "admin_login", actorRole: "SUPER_ADMIN", description: "Super admin authenticated via MFA" },
    { category: "RESERVE" as const, action: "reserve_lot_created", actorRole: "CUSTODY_MANAGER", description: "New gold reserve lot added: 750 troy oz" },
    { category: "RESERVE" as const, action: "attestation_published", actorRole: "CUSTODY_MANAGER", description: "Q4-2024 reserve attestation published, coverage 1.04x" },
    { category: "MARKET_OPS" as const, action: "venue_activated", actorRole: "MARKET_OPS", description: "OTC Desk venue set to ACTIVE" },
    { category: "TREASURY" as const, action: "treasury_reconciliation", actorRole: "TREASURY_OFFICER", description: "Monthly reconciliation run completed — 0 discrepancies" },
    { category: "COMPLIANCE" as const, action: "investor_kyc_approved", actorRole: "COMPLIANCE_OFFICER", description: "Investor KYC approved for institutional account INV-8821" },
  ];
  for (const ev of auditSeeds) {
    await prisma.auditEvent.create({
      data: {
        category: ev.category,
        action: ev.action,
        actorRole: ev.actorRole,
        description: ev.description,
        occurredAt: new Date(Date.now() - Math.random() * 30 * 86400000),
        hashChain: `seed-${Math.random().toString(36).slice(2)}`,
      },
    });
  }

  // ── Approval Requests ────────────────────────────────────────────────────
  await prisma.approvalRequest.upsert({
    where: { id: "ar-mint-001" },
    update: {},
    create: {
      id: "ar-mint-001",
      requestType: "MINT_REQUEST",
      status: "PENDING",
      requestedByRole: "TREASURY_OFFICER",
      title: "Mint 50,000 DIGAU — Q1 2025",
      description: "Institutional subscription tranche backed by 500 oz gold allocated to Reserve Lot #3.",
      payload: { units: 50000, reserveLot: "lot-003", goldOz: 500 },
      requestedAt: new Date(Date.now() - 2 * 86400000),
    },
  });

  await prisma.approvalRequest.upsert({
    where: { id: "ar-venue-001" },
    update: {},
    create: {
      id: "ar-venue-001",
      requestType: "VENUE_TOGGLE",
      status: "PENDING",
      requestedByRole: "MARKET_OPS",
      title: "Activate Dignity ATS",
      description: "Request to toggle venue-ats-primary from PENDING_APPROVAL to ACTIVE following FINRA review.",
      payload: { venueId: "venue-ats-primary", targetStatus: "ACTIVE" },
      requestedAt: new Date(Date.now() - 1 * 86400000),
      expiresAt: new Date(Date.now() + 7 * 86400000),
    },
  });

  await prisma.approvalRequest.upsert({
    where: { id: "ar-redeem-001" },
    update: {},
    create: {
      id: "ar-redeem-001",
      requestType: "REDEMPTION_APPROVE",
      status: "APPROVED",
      requestedByRole: "TREASURY_OFFICER",
      approvedById: null,
      title: "Redemption — INV-7742 / 1,200 DIGAU",
      description: "Investor redemption request for 1,200 DIGAU at NAV $62.40.",
      payload: { investorId: "INV-7742", units: 1200, navAtRequest: 62.40 },
      decisionNote: "Funds verified, identity confirmed, wire initiated.",
      requestedAt: new Date(Date.now() - 5 * 86400000),
      decidedAt: new Date(Date.now() - 3 * 86400000),
    },
  });

  // ── Reserve Reports ───────────────────────────────────────────────────────
  await prisma.reserveReport.upsert({
    where: { id: "rr-q3-2024" },
    update: {},
    create: {
      id: "rr-q3-2024",
      programId: program.id,
      title: "Q3 2024 Reserve Report — DIGAU",
      periodStart: new Date("2024-07-01"),
      periodEnd: new Date("2024-09-30"),
      totalReserveUsd: 3750000,
      coverageRatio: 1.02,
      navPerToken: 61.80,
      circulatingSupply: "484000",
      goldOz: 1200,
      status: "PUBLISHED",
      publishedAt: new Date("2024-10-15"),
      preparedBy: "Dignity Treasury Ops",
      notes: "Regular quarterly disclosure. All reserve lots verified by independent custodian.",
    },
  });

  await prisma.reserveReport.upsert({
    where: { id: "rr-q4-2024" },
    update: {},
    create: {
      id: "rr-q4-2024",
      programId: program.id,
      title: "Q4 2024 Reserve Report — DIGAU",
      periodStart: new Date("2024-10-01"),
      periodEnd: new Date("2024-12-31"),
      totalReserveUsd: 3900000,
      coverageRatio: 1.04,
      navPerToken: 62.40,
      circulatingSupply: "500000",
      goldOz: 1250,
      status: "DRAFT",
      preparedBy: "Dignity Treasury Ops",
      notes: "Pending final sign-off from custody manager before publication.",
    },
  });

  console.log(
    "  Seed complete. Program: Dignity | Security: DIGAU | Demo mode ready.\n"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
