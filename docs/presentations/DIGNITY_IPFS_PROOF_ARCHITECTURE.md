# DIGNITY GLOBAL — IPFS PROOF ARCHITECTURE
### Confidential | April 2026

---

## OVERVIEW

The IPFS proof layer is the evidence infrastructure that converts Dignity's compliance narrative into verifiable, timestamped, tamper-evident institutional proof. Every material claim about reserve quality, attestation, compliance action, and legal status should be anchored — either on IPFS or in an onchain registry — before an institutional investor is asked to rely on it.

---

## PART I — ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────┐
│  SOURCE DOCUMENTS                                        │
│  Engineering reports, legal opinions, audit letters,     │
│  policy docs, board resolutions, reserve snapshots       │
└───────────────────┬─────────────────────────────────────┘
                    │ SHA-256 hash of normalized content
                    ▼
┌─────────────────────────────────────────────────────────┐
│  @dignity/attestation — ProofAnchor records              │
│  Stores: dataType, dataHash, refId, CID (when pinned),   │
│  anchored (bool), anchored_at, version, createdAt        │
└───────────────────┬─────────────────────────────────────┘
                    │ Pin to IPFS network
                    ▼
┌─────────────────────────────────────────────────────────┐
│  IPFS PINNING SERVICE                                    │
│  Options: web3.storage, Pinata, nft.storage, self-hosted │
│  Returns: CID (Content Identifier) — permanent address   │
└───────────────────┬─────────────────────────────────────┘
                    │ Onchain CID registration
                    ▼
┌─────────────────────────────────────────────────────────┐
│  ONCHAIN PROOF REGISTRY (optional but recommended)       │
│  Smart contract: registerProof(dataHash, CID, version)   │
│  Chain: Polygon or Ethereum for permanence               │
│  Indexed via The Graph or Moralis for proof-center UI    │
└───────────────────┬─────────────────────────────────────┘
                    │ Public verification
                    ▼
┌─────────────────────────────────────────────────────────┐
│  PUBLIC PROOF CENTER (apps/web)                          │
│  Coverage gauge, attestation viewer, reserve lot         │
│  browser, CID lookup, hash verification tool             │
└─────────────────────────────────────────────────────────┘
```

---

## PART II — IPFS PINNING SERVICE OPTIONS

| Service | Notes | Recommended Use |
|---------|-------|----------------|
| **Pinata** | Commercial, REST API, webhook on pin, metadata support | Primary production pinning |
| **web3.storage** | Free tier, W3C UCAN-based, JS SDK maturity | Secondary / backup |
| **nft.storage** | Free for NFT/proof data, IPFS + Filecoin | Archive tier |
| **Self-hosted Kubo node** | Full control, operational overhead | Internal dev / CI only |

**Recommendation:** Pinata as primary (commercial-grade uptime, metadata, JWT auth), web3.storage as secondary for redundancy.

---

## PART III — DOCUMENT CATALOGUE AND METADATA MODEL

### 3.1 Document Types

| Document Category | dataType String | Update Cadence | Priority |
|------------------|----------------|---------------|----------|
| Reserve engineering report | `reserve_engineering_report` | Annual or on material change | CRITICAL |
| NI 43-101 technical report | `ni43101_report` | Per report version | CRITICAL |
| S-K 1300 gap memo | `sk1300_gap_memo` | Per revision | HIGH |
| Reserve valuation snapshot | `reserve_valuation_snapshot` | Monthly | HIGH |
| Reserve coverage snapshot | `reserve_coverage_snapshot` | Monthly | HIGH |
| Legal opinion — offering | `legal_opinion_offering` | Per revision | CRITICAL |
| Legal opinion — transfer | `legal_opinion_transfer` | Per revision | CRITICAL |
| Board resolution | `board_resolution` | Per resolution | HIGH |
| Attestation record | `attestation` | Per attestation | HIGH |
| Audit letter | `audit_letter` | Annual | HIGH |
| KYC/AML policy | `kyc_aml_policy` | Per revision | MEDIUM |
| Transfer restriction policy | `transfer_restriction_policy` | Per revision | MEDIUM |
| Redemption policy | `redemption_policy` | Per revision | MEDIUM |
| Monthly investor report | `investor_report_monthly` | Monthly | MEDIUM |
| Monthly LP report | `lp_report_monthly` | Monthly | MEDIUM |
| OTC trade confirmation | `otc_trade_confirmation` | Per trade | MEDIUM |
| Subscription agreement template | `subscription_agreement_template` | Per revision | HIGH |
| Disclosure acceptance record | `disclosure_acceptance` | Per event | HIGH |
| Title / deed of trust | `title_deed_of_trust` | Per execution | CRITICAL |
| UCC lien filing | `ucc_lien_filing` | Per filing | CRITICAL |
| Insurance certificate | `insurance_certificate` | Annual renewal | HIGH |

---

### 3.2 ProofAnchor Metadata Model

Each IPFS-anchored document is recorded as a `ProofAnchor` in the database:

```typescript
interface ProofAnchorRecord {
  id: string;              // UUID
  dataType: string;        // one of the dataType strings above
  dataHash: string;        // SHA-256(normalized document bytes) — hex string
  refId: string;           // FK to parent record (attestationId, reportId, etc.)
  cid: string | null;      // IPFS CID — set after successful pinning
  anchored: boolean;       // true after onchain txHash confirmed
  anchoredAt: Date | null; // timestamp of onchain anchor
  txHash: string | null;   // onchain transaction hash
  version: number;         // monotonic version counter per refId
  createdAt: Date;
}
```

---

### 3.3 Hashing and Signing Workflow

1. **Normalize** the source document (strip volatile metadata, ensure UTF-8, canonical JSON for structured data)
2. **SHA-256 hash** the normalized bytes — this is the `dataHash`
3. **Pin to IPFS** — receive `cid`
4. **Store ProofAnchor** with `dataHash`, `cid`, `refId`, `dataType`
5. **Optionally sign** with issuer private key — signature stored alongside anchor
6. **Register onchain** — call `registerProof(dataHash, cid, version)` on registry contract

**Document normalization rules:**
- PDF: extract text with pdf-parse, normalize whitespace, remove creation metadata
- JSON: deep-sort keys, minify
- Image/binary: use raw bytes as-is
- Word/DOCX: extract text via mammoth, normalize

---

## PART IV — ONCHAIN REGISTRY CONTRACT

### 4.1 Minimum Interface

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IDignityProofRegistry {
    event ProofRegistered(
        bytes32 indexed dataHash,
        string cid,
        uint256 version,
        address indexed registrar,
        uint256 timestamp
    );

    function registerProof(
        bytes32 dataHash,
        string calldata cid,
        uint256 version
    ) external;

    function verifyProof(bytes32 dataHash) external view returns (
        string memory cid,
        uint256 version,
        address registrar,
        uint256 timestamp
    );
}
```

**Deployment:** Polygon PoS (low gas fees, EVM compatible, institutional familiarity).

---

## PART V — VERSIONING POLICY

| Rule | Detail |
|------|--------|
| Each document type has a monotonic version per `refId` | Version 1 is the first anchor; superseded documents get version++ |
| Supersession does not delete | Old versions remain accessible via their CID — tamper evidence |
| Version 0 = unversioned hint | Reserved for legacy imports; new documents start at version 1 |
| Hash collision detection | System rejects attempts to register the same dataHash with a different CID |
| Revocation | Revoked documents recorded with `revoked: true` flag + revocation reason; CID remains accessible |

---

## PART VI — PROOF CENTER UI PRESENTATION

### 6.1 Public Interface Elements

| Element | Data Source | Display |
|---------|------------|---------|
| Coverage gauge | `ReserveCoverageSnapshot` (latest) | Gauge: reserve USD / token supply |
| Current NAV | `NavReference` (latest) | NAV per token with date |
| Last attestation date | `ReserveAttestation` (latest VERIFIED) | Date + attestor name |
| IPFS CID browser | `ProofAnchor` (anchored=true) | Table: document type, hash, CID, date, link |
| Hash verifier | User input | Enter hash → returns anchor record or "no record" |
| Reserve lot summary | `ReserveLot` + `ReserveValuation` | Active lots, quantity, current value |
| Evidence documents | `EvidenceDocument` (linked to attentations) | Name, type, CID link if anchored |

### 6.2 Verification User Flow

```
User visits proof-center
       ↓
Coverage gauge loads current snapshot (demo data in dev, live Prisma in prod)
       ↓
"Verify a document" tab
       ↓
User enters document hash (SHA-256 hex string)
       ↓
API: GET /api/v1/public/proof?hash=<hex>
       ↓
Returns: ProofAnchor record or 404
       ↓
If found: display CID link, onchain tx (if any), timestamp, document type, version
If not found: "No record found for this hash"
```

---

## PART VII — IMPLEMENTATION ROADMAP

| Phase | Description | Timeline | Prerequisite |
|-------|-------------|----------|-------------|
| 1 — Database ready | ProofAnchor model in Prisma; attestation system operational | Done ✅ | — |
| 2 — IPFS pinning script | CLI script: pin file → store CID in ProofAnchor | 30 days | Pinata account |
| 3 — Admin pin workflow | Admin UI — upload doc → auto-hash → pin → store | 45 days | Phase 2 |
| 4 — Public proof center live data | Connect proof-center UI to real ProofAnchor records | 60 days | Phase 3 |
| 5 — Onchain registry contract | Deploy registry to Polygon; registerProof on pin | 60 days | Security review |
| 6 — First real attestation | Reserve snapshot → pin → anchor → publish | 90 days | Phase 4 + reserve data |
| 7 — Monthly cadence operational | Reserve snapshot + LP report → auto-pin monthly | 120 days | Phase 6 |

---

*Document Version: 1.0 — April 2026*  
*Classification: Confidential*
