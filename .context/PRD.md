# PRD.md — Product Requirements Document
# kamil-portfolio | Layer 1: Product Requirements & Acceptance Criteria

> **Authority:** This document defines the product scope, user goals, and acceptance criteria. The AI may not implement features outside this scope. If a user request expands scope, halt and request human sign-off.

---

## 1. PRODUCT IDENTITY

**Product:** Personal Engineering Portfolio — Kamil Hisham  
**Owner:** Kamil Hisham (kamil.hisham3124@gmail.com)  
**Purpose:** A high-performance, production-grade portfolio website that communicates Kamil's technical depth, systems engineering skills, and production track record to hiring managers and engineering leads.  
**Target Audience:** Software engineering recruiters, senior engineers, engineering directors, CTOs.  
**Primary Conversion Goal:** Generate qualified inbound contact (email/LinkedIn) from engineering roles.

---

## 2. PROBLEM STATEMENT

Hiring managers reviewing a portfolio need to quickly assess:
1. Does this engineer have production experience (not just toy projects)?
2. Do they understand architecture, data modeling, and system design?
3. Can I contact them easily?
4. Is their online presence consistent with their claimed skill level?

**Anti-Goals:**
- This is not a blog platform.
- This is not a SaaS product.
- This is not a job board listing.
- This is not a social network.

---

## 3. FEATURE SCOPE (FROZEN)

### In Scope — Version 1.0

| Feature | Route | User Goal |
|---|---|---|
| Hero & Summary | `/` | Quickly understand who Kamil is and what he builds. |
| Case Study Index | `/work` | Browse production projects with git-verified evidence. |
| Case Study Detail | `/work/[slug]` | Deep-dive into architecture, schema, and problem statement of a specific project. |
| About / Resume | `/about` | Review experience, education, skills. Download PDF resume. |
| Interactive Lab — Index | `/lab` | Explore technical sandboxes and live telemetry. |
| Interactive Lab — Canvas | `/lab/canvas` | Experience deterministic client state management (Zustand). |
| Interactive Lab — Telemetry | `/lab/telemetry` | View live edge latency and infrastructure metrics. |
| Contact | `/contact` | Send a qualified technical inquiry. |
| Resume PDF | `/resume.pdf` | Download CV directly. |

### Out of Scope — Version 1.0

- Blog posts, articles, or written content beyond project summaries.
- User authentication or personalized views.
- Comments, social sharing, or engagement features.
- Job board or availability calendar.
- CMS or admin panel.
- Analytics dashboard (telemetry is demonstrative, not business analytics).

---

## 4. CONTENT CONTRACTS

### Case Studies (currently 2)
1. **employee-task-management** — Django REST Framework + PostgreSQL task management system.
2. **gift-delivery-ecommerce** — SQLite-normalized e-commerce system with MVC separation.

Each case study must contain: `slug`, `title`, `summary`, `tech_stack`, `github_repo`, `published_at`, `problem_statement`, `architecture_overview`, `database_design`, `verifiable_metrics`.

### Resume
Must contain: `name`, `contact` (phone, email, github, linkedin), `persona_statement`, `experience_entries` (array), `education` (degree, institution, cgpa), `skills` (array).

---

## 5. ACCEPTANCE CRITERIA (DEFINITION OF DONE)

A feature is complete when ALL of the following are true:

- [ ] Route renders with HTTP 200 and correct Content-Type.
- [ ] All data is sourced from validated Zod schemas — no untyped data in UI.
- [ ] Error state renders correctly when data source is unavailable.
- [ ] Loading state renders correctly during async operations.
- [ ] Empty state renders when data collection is empty.
- [ ] All interactive elements are keyboard-navigable with visible focus.
- [ ] No WCAG 2.2 Level AA violations (contrast, labels, semantics, focus).
- [ ] Page renders correctly at 375px (mobile), 768px (tablet), 1280px (desktop).
- [ ] `npm test` passes with zero errors (`audit:leak`, `audit:lines`, `typecheck`, `lint`).
- [ ] No new packages added to `package.json` without explicit approval.
- [ ] No files in `.context/` imported by application code.

---

## 6. NON-FUNCTIONAL REQUIREMENTS

| NFR | Requirement | Measurement |
|---|---|---|
| NFR-001 | First Load JS ≤ 120KB per route | Next.js build output |
| NFR-002 | Edge latency SLA ≤ 50ms (P95) | Vercel edge telemetry |
| NFR-003 | WCAG 2.2 Level AA conformance | Automated + manual audit |
| NFR-004 | Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1 | Lighthouse |
| NFR-005 | Zero TypeScript errors (`tsc --noEmit`) | CI gate |
| NFR-006 | Zero ESLint warnings (`next lint`) | CI gate |
| NFR-007 | Zero specification content leaks | `audit-spec-leak.mjs` |
| NFR-008 | Resume PDF served within 2s | Route handler response time |
| NFR-009 | All source files ≤ 150 lines | `audit-line-limits.mjs` |

---

## 7. OUT-OF-SCOPE CONTENT RULE

The AI must **never** render any of the following as visitor-facing UI text:
- Content from `.context/` specification documents
- DOC-*, RT-*, RLS-*, BND-* reference codes
- Engineering governance prose (this document, ARCHITECTURE.md, SCHEMA.md, etc.)
- Build directive instructions

These are build-time planning materials. They must never appear in HTML, RSC payloads, or static asset output.
