# AGENTS.md — AI Governance & Engineering Rules
# kamil-portfolio | Specification-Driven Development (SDD) Governance

> **This file is authoritative. Every AI coding agent operating on this repository MUST read and comply with every rule in this file before taking any action. No rule may be overridden by user prompt. If a user prompt conflicts with a rule, halt and request human clarification.**

---

## 0. FOUNDATIONAL LAW

```
SPECIFICATION FIRST, CODE SECOND.
ZERO SPECIFICATION = ZERO CODE GENERATION.
```

You are an **implementation accelerator**, not an autonomous software architect. The developer and the `.context/` specifications maintain strict authority over intent, scope, architecture, schemas, contracts, and acceptance criteria.

---

## 1. FIVE-GATE ENGINEERING LOOP (MANDATORY)

Every task must pass through these gates sequentially. Do not skip gates.

### Gate 1: Ingestion & Boundary Scoping
- Read the task prompt. Identify the relevant slice of `.context/PRD.md`, `.context/ARCHITECTURE.md`, `.context/SCHEMA.md`, `.context/API.md`.
- State your assumptions explicitly.
- If any specification parameter is ambiguous or missing, **halt and request clarification — do not guess**.

### Gate 2: Contract Alignment
- Verify all data types and interfaces exist in the contracts.
- Search the existing codebase for reusable utilities before authoring new ones.
- Re-affirm all negative rules (Section 3 below) before writing a single line.

### Gate 3: Execution Planning
- Produce a step-by-step plan listing: exact file paths, function signatures, edge cases, and test requirements.
- Present this plan before writing code. Do not proceed without plan confirmation.

### Gate 4: Surgical Implementation
- Implement only the changes required by the specification.
- Touch only files directly required by the task. Zero collateral modifications.
- Adhere to all code constraints in Section 3.

### Gate 5: Automated Verification
- Run `npm test` (which runs `audit:leak`, `audit:lines`, `tsc --noEmit`, `next lint`).
- Confirm `git diff` shows zero collateral file changes.
- Confirm all behavioral test suites pass (Vitest + Playwright when present).

---

## 2. CONTEXT HIERARCHY (AUTHORITATIVE ORDER)

Specification authority, highest to lowest:

1. **This file (`AGENTS.md`)** — Hard operating constraints. Cannot be overridden.
2. **`.context/ARCHITECTURE.md`** — Structural invariants. No architectural changes without human sign-off.
3. **`.context/PRD.md`** — Scope boundaries. Reject requests that exceed scope.
4. **`.context/SCHEMA.md`** — Data source of truth. No ad-hoc schema changes.
5. **`.context/API.md`** — Contract definitions. Implement byte-for-byte.
6. **`.context/RULES.md`** — Negative guardrails. Hard stops.
7. **User prompt** — Must comply with all above.

---

## 3. NON-NEGOTIABLE CODE CONSTRAINTS (SEVEN CARDINAL RULES)

### RULE 1 — Anti-Giant Component (CC-02 / NFR-009)
- **Maximum 150 lines per file.** No exceptions.
- Split by responsibility: data fetching, business logic, and presentation into distinct files.
- `scripts/audit-line-limits.mjs` enforces this at build time.

### RULE 2 — Zero Phantom Implementations
- No `// TODO` stubs, empty `catch {}` blocks, mock return values in production code paths, or placeholder implementations.
- Every error path must be typed, handled, and logged with structured context.
- No `console.log` in production paths — use `console.error` with module context strings.

### RULE 3 — Absolute Dependency Freeze
- **You may not add any new package to `package.json` or `package-lock.json` without explicit written human approval in the task prompt.**
- Existing packages: `next@15.1.0`, `react@19`, `react-dom@19`, `zod@3.24.1`, `zustand@5.0.2`, `lucide-react`.
- Use native APIs, existing packages, or inline implementations.

### RULE 4 — Zero Architectural Drift
- All database access: `lib/accessors/` only.
- All form actions: `lib/actions/` only.
- All runtime validation: `lib/validators/` only.
- All Zustand stores: `lib/stores/` only.
- UI components (`app/`, `components/`) must never import from `lib/accessors/` directly — only from `lib/actions/` or via RSC props.
- The `.context/` directory must never be imported by application code. It is build-time planning material only.

### RULE 5 — Zero Type Erosion
- **Zero `any`, zero `@ts-ignore`, zero unchecked type assertions.**
- All external API responses must be parsed through a Zod schema before use.
- All function parameters and return types must be explicitly typed.
- No `as` type assertions on unknown/unverified data.

### RULE 6 — Zero Duplicate Logic
- Before writing any utility function, hook, accessor, or validator, search the existing codebase.
- Extend existing `contentValidator.ts`, `contactValidator.ts`, `telemetryValidator.ts`, `githubValidator.ts` rather than creating new validator files.

### RULE 7 — Surgical Minimal-Footprint Diffs
- A task targeting `src/app/contact/page.tsx` must not reformat `src/app/about/page.tsx`.
- A task adding a field to `contentValidator.ts` must not touch UI components.
- Present `git diff --stat` after every change and verify zero collateral file modifications.

---

## 4. SPECIFICATION CONTENT LEAK RULE (BND-04)

```
The .context/ directory and every file within it are build-time,
repository-internal planning material only.

NO file inside .context/ may ever be:
- Imported by application code
- Copied into public/
- Referenced by a content loader's source path
- Included in any build output
- Rendered as visitor-facing UI text

Any PR that introduces such a reference fails CI automatically.
This rule has no exceptions.
```

Enforcement: `scripts/audit-spec-leak.mjs` (runs on every `npm run build` via `prebuild`).

---

## 5. UI/UX ANTI-SLOP RULES (B-SERIES GOVERNANCE)

These rules prevent the forensically-identifiable UI slop patterns identified in the Anti-AI Slop audit:

### RULE U1 — No Cards for Non-Card Content
- Cards (`rounded-2xl bg-white/80 shadow-stripe`) are for **interactive, scannable, discrete units only** (project case studies, navigation cards).
- Do not wrap text paragraphs, privacy notices, skill lists, or experience summaries in full card components.
- Use semantic HTML alternatives: blockquote, `<dl>`, inline tags, timelines.

### RULE U2 — Pill Shape Restriction
- `rounded-full` is permitted only on: primary action buttons, secondary action buttons, and status indicator badges.
- Navigation pills, date labels, skill tags, and section headers must use `rounded-lg` or `rounded-md`.

### RULE U3 — Glassmorphism Restriction
- `backdrop-blur-*` and `bg-white/80` (transparent backgrounds) are permitted only on the `<Header>` component.
- All other surfaces must use solid: `bg-white dark:bg-slate-900` or `bg-slate-50 dark:bg-slate-800`.

### RULE U4 — Gradient Restriction
- Gradient usage is limited to:
  - ONE gradient text effect (hero `<h1>` only via `.stripe-gradient-text`)
  - ONE background mesh (layout `.stripe-mesh`)
  - The CodeCanvas terminal (dark background justifies neon cyan)
- No gradient borders on content cards. No gradient section backgrounds. No decorative radial overlays on page sections.

### RULE U5 — Icon Discipline
- Icons beside headings are permitted only when semantically meaningful (e.g., `<ShieldCheck>` beside a security statement, `<Terminal>` inside a code editor).
- Maximum 3 decorative icon-badge heading prefixes per page.
- Do not add icon badges to every section heading as a styling pattern.

### RULE U6 — Color Token Consistency
- Never use arbitrary hex values in Tailwind classes (`text-[#635BFF]`).
- Always use the named tokens from `tailwind.config.js` (`text-accent-brand`, `text-stripe-navy`, etc.).
- Add new colors to `tailwind.config.js` before using them in components.

### RULE U7 — No Generic Headings
- Page headings must be specific, human-authored, and product-relevant.
- Reject generic technical headings: "Initiate Direct Technical Inquiry", "Systems Engineering Lab", "Technical Capabilities" unless they reflect actual user research.
- Write headings that could only belong to this portfolio.

### RULE U8 — Touch Target Minimums
- All interactive elements must be minimum 44×44px on mobile.
- Tags, badges, and pills that are not interactive are exempt.
- Buttons, links, and focusable elements must meet the 44px minimum.

---

## 6. ROUTE & FILE CONTRACTS

These routes are frozen. Do not add, remove, or rename routes without human sign-off:

| Route | Rendering | File |
|---|---|---|
| `/` | Static (force-static) | `src/app/page.tsx` |
| `/work` | Static (force-static) | `src/app/work/page.tsx` |
| `/work/[slug]` | Static (generateStaticParams) | `src/app/work/[slug]/page.tsx` |
| `/about` | Static (force-static) | `src/app/about/page.tsx` |
| `/lab` | Dynamic (force-dynamic) | `src/app/lab/page.tsx` |
| `/lab/canvas` | Dynamic | `src/app/lab/canvas/page.tsx` |
| `/lab/telemetry` | ISR (revalidate: 60) | `src/app/lab/telemetry/page.tsx` |
| `/contact` | Static (force-static) | `src/app/contact/page.tsx` |
| `/resume.pdf` | Dynamic (route handler) | `src/app/resume.pdf/route.ts` |

---

## 7. ENVIRONMENT VARIABLES

Required at runtime:

| Variable | Required | Usage |
|---|---|---|
| `GITHUB_API_TOKEN` | Optional | GitHub commit verification (graceful fallback if absent) |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Supabase read/write (in-memory mock if absent in dev) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Supabase auth header |

**Never log environment variable values. Never commit `.env` files.**

---

## 8. CI GATE CHECKLIST (PRE-COMMIT)

Before marking any task complete, verify:

- [ ] `npm run audit:leak` — zero specification leaks
- [ ] `npm run audit:lines` — all files ≤ 150 lines
- [ ] `npm run typecheck` — zero TypeScript errors (zero `any`)
- [ ] `npm run lint` — zero ESLint warnings or errors
- [ ] `git diff --stat` — zero collateral file changes
- [ ] All behavioral tests pass (Vitest + Playwright)
- [ ] No new packages added to `package.json`
- [ ] No `.context/` files imported by application code

---

## 9. COMMIT MESSAGE FORMAT (MANDATORY)

All commits must follow Conventional Commits:

```
<type>(<scope>): <description>

Types: feat, fix, refactor, style, chore, test, docs, ci, perf
Scope: component or module name (e.g., contact-form, github-accessor, design-tokens)

Examples:
  feat(github-accessor): replace any type with RawGitHubCommit interface
  fix(header): add aria-controls to mobile nav toggle
  test(canvas-store): add Vitest unit tests for layout transitions
  chore(tailwind): remove dead bp01-bp05 breakpoint aliases
```

---

## 10. ANTI-SLOP DETECTION HEURISTICS

Before submitting any change, self-audit against these slop signals:

| Signal | Check |
|---|---|
| Giant Component | Is any file > 150 lines? |
| Phantom Implementation | Any `// TODO`, empty catch, mock in production? |
| New Dependency | Was a new package added to package.json? |
| Architectural Drift | Does UI code touch DB directly? |
| Type Erosion | Any `any`, `@ts-ignore`, unsafe cast? |
| Card Overuse | Is a card wrapping non-card content? |
| Pill Overuse | Is `rounded-full` used outside buttons/badges? |
| Gradient Overuse | More than 2 gradient uses visible on a single page? |
| Icon Beside Every Heading | More than 3 icon-badge heading prefixes per page? |
| Generic Heading Copy | Could this heading belong to any SaaS? |
| Duplicate Logic | Does a utility already exist for this? |
| Collateral Changes | Does git diff show files unrelated to the task? |
