# DIGNITY GLOBAL — INVESTOR DECK SLIDES
### Draft Presentation Script | Confidential | April 2026

---

> **Usage Guide:** Each slide section includes: Slide Title | Headline | Key Points | Notes to presenter  
> Deck design: Dark navy background, gold (#C9A94E) accents, white body text.  
> Target length: 20 slides. Estimated runtime: 25–35 minutes.

---

## SLIDE 1 — COVER

**Slide Title:** Dignity Global  
**Headline:** A Compliance-Forward, U.S. Mining-Backed Digital Security Platform  

**Visual:** Dignity wordmark on dark field. Thin gold rule below headline. Tagline:

> *"Institutional infrastructure for a new asset class."*

**Footnote:** Confidential — For Accredited Investors Only | Not a Public Offering | April 2026

---

## SLIDE 2 — SAFE HARBOR

**Title:** Forward-Looking Statements

This presentation contains forward-looking statements regarding plans, strategies, financial projections, and market opportunities. These statements involve material risks and uncertainties. Actual outcomes may differ materially.

This presentation does not constitute an offer to sell or solicitation of an offer to buy any security. Any such offer will be made only pursuant to the Private Placement Memorandum, subscription agreement, and other definitive documents provided to qualified investors.

**Minimum investor qualification:** Accredited Investor under SEC Rule 501(a)

---

## SLIDE 3 — THE PROBLEM

**Headline:** Mining-Backed Assets Are Real. The Wrappers Are Not.

| What the Market Has | What's Missing |
|---------------------|----------------|
| Unregistered mining tokens with no compliance layer | Verified, disclosed mineral assets |
| Retail-grade exchanges masquerading as institutional | Institutional custody, MM, and proof architecture |
| No reserve proof that survives a diligence call | IPFS-anchored proof documents tied to on-chain registry |
| Fragmented cap table with no transfer controls | Transfer-restricted security token with accredited investor gating |

**Presenter note:** Don't dwell here. Frame the problem fast and move to the asset.

---

## SLIDE 4 — THE ASSET

**Headline:** DIGau — A Digital Security Backed by Mining Assets

**Three pillars:**

1. **The Underlying:** U.S.-based mining property interests — positioned for S-K 1300 technical report once Qualified Person is engaged
2. **The Security:** DIGau is a digital security, not a utility token — issued under Reg D (506(b) or 506(c)) for accredited investors
3. **The Instrument:** NAV-priced, transfer-restricted, with a structured redemption mechanism tied to the reserve pool

**Presenter note:** Be precise — "positioned for" not "compliant with." We are building toward full S-K 1300 disclosure.

---

## SLIDE 5 — WHAT DIGNITY IS TODAY

**Headline:** Platform Infrastructure Exists. Real Data Is Being Loaded.

**Current architecture — PRODUCTION STATE:**

| Layer | Status |
|-------|--------|
| 14-package TypeScript monorepo | ✅ Built + typechecks clean |
| Next.js 15 investor portal | ✅ Running |
| Prisma 5.22 + PostgreSQL schema | ✅ Complete (no live DB yet) |
| Securities token engine (DIGau) | ◑ Schema and state machine built; on-chain TBD |
| Compliance engine (KYC/AML stubs) | ◑ Interfaces built; real provider pending |
| Reserve registry + ProofAnchor | ◑ Schema ready; real docs pending IPFS |
| Treasury (7 account types) | ◑ Model complete; live custody pending |
| Stablecoin rails (USDC/USDT) | ✗ Building now |

**Honest line:** We have built real infrastructure. We are not finished.

---

## SLIDE 6 — THE PLATFORM ARCHITECTURE

**Headline:** Seven Layers — Each Independently Defensible

```
┌─────────────────────────────────────────────────────────┐
│  Investor Portal (Next.js 15, port 3300)                │
├─────────────────────────────────────────────────────────┤
│  Compliance Engine  │  Token Engine   │  Market Ops     │
├─────────────────────────────────────────────────────────┤
│  Treasury (7 acct)  │  Reserve Registry │  Analytics   │
├─────────────────────────────────────────────────────────┤
│  Stablecoin Rails (USDC / USDT)  │  Exchange Adapters  │
├─────────────────────────────────────────────────────────┤
│  Audit Trail  │  Attestation Engine  │  Documents       │
├─────────────────────────────────────────────────────────┤
│  PostgreSQL (Prisma ORM)  │  IPFS (Pinata)              │
└─────────────────────────────────────────────────────────┘
```

**Presenter note:** Show the depth. Most competitors have two layers. We have seven.

---

## SLIDE 7 — THE BOARD

**Headline:** Domain-Matched Leadership at Every Layer

| Board Member | Domain Signal | Infrastructure Pairing |
|---|---|---|
| Angeline Cardinal Bendle | Cultural sovereignty, Indigenous rights | Community engagement, ESG |
| Randy Rowe | Capital markets operations | Exchange adapters, market-ops |
| Todd Reiter | Technology & technical governance | Platform + audit architecture |
| Dr. Michael Repass | Medical / clinical governance | Compliance rigor model |
| Richard Allen Perkins | Legal & regulatory affairs | Securities compliance layer |
| Dr. Dana Hardin | Scientific / technical review | Reserve registry + QP oversight |

**The 20-30% Rule:** Each board member's domain covers 20-30% of institutional execution risk. Six members provide ~100% coverage with intentional overlap at fault lines.

---

## SLIDE 8 — COMPLIANCE POSTURE

**Headline:** Current Score: 33.6 / 100 — Target ≥85 for Full Institutional-Grade Claim

**Compliance domain scorecard:**

| Domain | Score | Status |
|--------|-------|--------|
| KYC / Investor Verification | 38 | Partial |
| AML / Transaction Monitoring | 22 | Early |
| Accredited Investor Verification | 40 | Partial |
| Reg D / S Securities Compliance | 30 | Early |
| Transfer Restrictions | 20 | Early |
| Reserve Proof | 25 | Early |
| Mining Disclosure (S-K 1300) | 0 | Not started |
| Insurance Coverage | 0 | Not started |
| Governance / Controls | 30 | Early |
| Market Integrity | 25 | Early |
| **Aggregate** | **33.6** | **Early-Operational** |

**Milestone thresholds:**
- 0–25: Pre-operational
- 26–50: **Early-Operational (current)**
- 51–70: Compliance-Adequate
- 71–85: Institutional-Grade
- ≥85: Full Institutional

**Presenter note:** Do NOT call it "compliant." Call it "compliance-forward with a documented roadmap."

---

## SLIDE 9 — RESERVE PROOF ARCHITECTURE

**Headline:** Cryptographic Proof Tied to Mining Asset Documentation

**The proof chain:**

```
Source Document → SHA-256 Hash → ProofAnchor record
       ↓
Stored on IPFS (Pinata primary, web3.storage secondary)
       ↓
CID (Content Identifier) registered on-chain
       ↓
Publicly verifiable at: proof.dignitytoken.com (planned)
```

**21 documents in proof catalogue (when complete):**
Engineering reports, title documents, property surveys, NAV certifications, reserve audits, custody statements, compliance certifications, annual reports, board certifications

**Current state:** Schema + platform built. Documents being assembled. IPFS integration next.

---

## SLIDE 10 — STABLECOIN SETTLEMENT RAILS

**Headline:** USDC and USDT as Institutional Settlement Infrastructure

**Two compliance tracks operate in parallel:**

| Track | Instrument | Governing Framework |
|-------|-----------|-------------------|
| Security token compliance | DIGau | Reg D/S, SEC, FINRA |
| Payment rail compliance | USDC / USDT | FinCEN/MSB, OFAC, GENIUS Act |

**Settlement flows:**

- **Subscription:** Investor sends USDC to unique address → monitored → confirmed → tokens issued
- **Redemption:** Approved redemption → treasury sends USDC → investor wallet → position closed
- **LP reload:** Treasury allocates USDC to MM pool → inventory threshold maintained

**Rails supported:** USDC on Ethereum/Polygon/Base/Solana; USDT on Ethereum/Tron/Polygon

---

## SLIDE 11 — LP AND MARKET STRUCTURE

**Headline:** Real Liquidity Requires Real Market Structure

**The Fake vs. Real Liquidity Matrix:**

| Fake Liquidity | Real Liquidity |
|----------------|---------------|
| Wash-traded volume | NAV-anchored bid/offer |
| No redemption mechanism | Structured redemption with gate policy |
| No MM agreement | Executed market maker agreement |
| No OTC desk | OTC RFQ workflow for block trades |
| No circuit breakers | Automated circuit breaker triggers |

**Dignity LP framework (being built):**
- Treasury-seeded MM inventory: target $500K USDC equivalent at launch
- MM spread guidance: ±1.5% of NAV at launch, tightening to ±0.75% at $5M AUM
- Redemption pool: 15% of AUM in USDC at all times
- OTC RFQ desk: manual initially, platform-supported within 90 days

---

## SLIDE 12 — INSURANCE MATRIX

**Headline:** No Insurance = No Institutional LP. Simple.

| Coverage | Status | Urgency |
|----------|--------|---------|
| D&O (Directors & Officers) | ✗ Not in place | **CRITICAL — board exposed** |
| Cyber Liability | ✗ Not in place | High |
| Crime / Fidelity | ✗ Not in place | High |
| E&O / Professional Liability | ✗ Not in place | Medium |
| Specie (mining assets) | ✗ Not in place | Medium |
| Environmental | ✗ Not in place | Regulatory |
| General Liability | Unknown | Medium |

**Minimum viable insurance package (90 days):**
1. D&O — $5-10M limit, securities entity endorsement
2. Cyber — $3-5M limit (ISO 27001-compatible)
3. Crime / Fidelity — $2-5M limit, crypto asset endorsement
4. Legal opinions on all three entity-level exemptions

---

## SLIDE 13 — MINING DISCLOSURE PATH

**Headline:** S-K 1300 Compliance Requires a Qualified Person. We Don't Have One Yet.

**S-K 1300 requirements for SEC reporting issuers:**
- Qualified Person (QP) — P.Eng. or equivalent with 5+ years minerals experience
- Mineral Resource estimate following CIM or JORC standards
- Technical Report Summary (TRS) on SEC-prescribed form
- Annual updates after material changes

**NI 43-101 (Canadian) is not acceptable for U.S. SEC purposes.** However, a QP certified under APEGBC, PGO, or equivalent who also accepts S-K 1300 responsibility can bridge both.

**Dignity's path:**
1. Engage QP (60 days)
2. Commission site visit and data review (90 days)
3. Mineral Resource estimate prepared (180 days)
4. TRS filed with first registration or included in Reg A+ filing
5. Annual update filed thereafter

**Current state:** No QP engaged. No mineral estimate. Mining property details pending legal confirmation.

---

## SLIDE 14 — THE EXECUTION PLAN

**Headline:** 90 / 180 / 360-Day Plan to Institutional-Grade

### 90 Days — Foundation
| Action | Owner | Outcome |
|--------|-------|---------|
| Engage securities counsel | CEO + Board | Legal framework confirmed |
| Bind D&O insurance | CEO + Broker | Board protected |
| Live PostgreSQL instance | Engineering | Platform active |
| Complete stablecoin rails | Engineering | Subscriptions settleable |
| KYC provider integrated | Engineering | Investor verification live |
| OFAC screening live | Engineering | Rail compliance active |

### 180 Days — Disclosure
| Action | Owner | Outcome |
|--------|-------|---------|
| QP engaged + site visit | CEO + QP | S-K 1300 process started |
| IPFS pinning + first proofs | Engineering | Proof architecture live |
| PPM drafted and reviewed | Legal | Investor materials ready |
| First MM agreement signed | Market Ops | Real liquidity seed |
| Compliance score target: ≥50 | All | Compliance-Adequate milestone |

### 360 Days — Institutional
| Action | Owner | Outcome |
|--------|-------|---------|
| S-K 1300 TRS complete | QP | Mining disclosure complete |
| Institutional data room live | All | Fund diligence ready |
| Full insurance package | CEO | All coverage in place |
| First LP onboarded | Market Ops | Real institutional participation |
| Compliance score target: ≥70 | All | Institutional-Grade milestone |

---

## SLIDE 15 — WHAT WE ARE ASKING FOR

**Headline:** Specific Capital for Specific Infrastructure

**Use of proceeds:**

| Category | Amount | Purpose |
|----------|--------|---------|
| Legal & Compliance | $150,000 | Securities counsel, QP engagement, PPM |
| Insurance | $75,000 | D&O + Cyber + Crime policies, first year |
| Engineering | $200,000 | Platform completion, stablecoin rails, production deploy |
| Treasury Seed | $500,000 | MM inventory for launch liquidity |
| Operations | $75,000 | 12 months admin, reporting, compliance ops |
| **Total** | **$1,000,000** | **Pre-launch institutional-grade readiness** |

**Investment structure:** Reg D, 506(b) for accredited investors — subject to finalized PPM and legal review

**Projected compliance score progression:**
- At raise close: ~33 (current)
- 90 days post-close: ~50
- 180 days post-close: ~70
- 360 days post-close: ~85

---

## SLIDE 16 — RISK FACTORS (SUMMARY)

**Headline:** Material Risks — We Name Them Because They're Real

1. **Regulatory Risk:** Securities law interpretation could affect DIGau classification; GENIUS Act evolution may affect stablecoin rails
2. **Mining Asset Risk:** Mineral resource estimate not yet performed; underlying asset value unconfirmed
3. **Liquidity Risk:** Secondary market for DIGau limited until MM infrastructure fully operational
4. **Technology Risk:** Platform is early-operational; production deploy and live DB pending
5. **Key Person Risk:** Small leadership team; board domains partially overlap with execution dependence
6. **Insurance Risk:** No D&O or cyber coverage currently in place; board and platform exposed
7. **Compliance Execution Risk:** Score of 33.6/100 means significant compliance work remains to reach institutional-grade

**Presenter note:** Present this slide directly and without hedging. Investors who get through this slide are serious.

---

## SLIDE 17 — COMPETITIVE POSITIONING

**Headline:** The Only Platform Built Infrastructure-First

| Platform Type | What They Claim | What's Missing |
|---------------|----------------|----------------|
| Retail mining tokens | "Backed by gold reserves" | No proof, no compliance, no QP |
| DeFi gold wrappers | "Decentralized" | No Reg D, no transfer restrictions, no AML |
| Traditional mining equity | "Audited" | No tokenization, no blockchain proof |
| **Dignity** | "Compliance-forward infrastructure" | Insurance + full mining disclosure still in progress |

**Our moat:** The infrastructure layer is the moat. 14 packages, full schema, compliance framework, ProofAnchor architecture — built before capital was raised. No competitor starts here.

---

## SLIDE 18 — TECHNOLOGY STACK DETAIL

**Headline:** Production-Grade, Institutional-Architecture

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 15 App Router | Institutional SSR + API routes |
| Language | TypeScript (strict) | Type safety across all 14 packages |
| ORM | Prisma 5.22 | Schema-first DB with full migration support |
| Package manager | pnpm + Turbo | Monorepo speed + correctness |
| Design | Custom token design system (`@dignity/ui`) | Institutional aesthetic |
| Stablecoin | USDC (Circle API) + USDT (on-chain) | Broadest institutional coverage |
| Proof layer | IPFS (Pinata) + SHA-256 | Cryptographic verification |
| Database | PostgreSQL | Enterprise relational |

---

## SLIDE 19 — THE ASK — ACTION ITEMS FOR TODAY

**For Accredited Investors Who Want to Proceed:**

1. Sign NDA (if not already signed)
2. Request full Private Placement Memorandum (available 90 days post-raise)
3. Complete accredited investor verification (in-portal, post-launch)
4. Schedule 1:1 diligence call with engineering team
5. Review DONE/PARTIAL/NOT DONE status matrix (provided separately)

**For Board Candidates or Advisors:**

- Request board candidate information package
- D&O insurance briefing available separately
- Compensation and governance structure available under NDA

**Email:** [contact@dignitytoken.com — configure in platform]

---

## SLIDE 20 — CLOSE

**Headline:** The Infrastructure Exists. The Rebound Is Now.

> Dignity is not starting from zero.  
> It is starting from a proven infrastructure layer,  
> adding real disclosure, real proof, and real liquidity mechanics  
> to an asset that deserves institutional framing.

> We built the platform before raising the capital.  
> That is not typical. That is intentional.

---

**Dignity Global**  
*compliance-forward | mining-backed | infrastructure-first*

Confidential — For Authorized Recipients Only | April 2026  
Not a public offering. Not an offer to sell or solicitation of an offer to buy.

---

*Document Version: 1.0 — April 2026*  
*Classification: Confidential — Board and Accredited Investor Distribution Only*
