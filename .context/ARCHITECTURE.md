# ARCHITECTURE.md — System Design & Structural Invariants
# kamil-portfolio | Layer 2: Architecture & Boundaries

> **Authority:** Structural decisions. No architectural change may be made without human sign-off. The AI may implement within existing architecture but may not reorganize layers.

---

## 1. ARCHITECTURAL STYLE

**Pattern:** Three-Layer Separation of Concerns  
**Framework:** Next.js 15 (App Router, React Server Components)  
**Rendering Model:** Hybrid — Static (SSG/ISR) for content, Dynamic for real-time data  

```
┌─────────────────────────────────────────────────┐
│                PRESENTATION LAYER                │
│  src/app/**  +  src/components/**               │
│  React Server Components + Client Components     │
│  RULE: Zero direct DB/API calls. Receive props. │
├─────────────────────────────────────────────────┤
│               APPLICATION LAYER                  │
│  src/lib/actions/**  (Server Actions)            │
│  src/lib/validators/** (Zod Schemas)             │
│  src/lib/stores/**   (Zustand Client State)      │
│  RULE: Orchestrates, validates, never renders.  │
├─────────────────────────────────────────────────┤
│                 DATA ACCESS LAYER                 │
│  src/lib/accessors/**                            │
│  (githubAccessor, supabaseAccessor, vercel...)   │
│  RULE: Single responsibility — fetch + parse.   │
│  Returns AccessorResult<T>. Never throws.       │
└─────────────────────────────────────────────────┘
```

---

## 2. COMPONENT BOUNDARY RULES

### Server Components (RSC) — Default
All components are Server Components unless marked `"use client"`.

**Permitted in RSC:**
- Importing and calling `lib/accessors/*`
- Importing `content/index.ts`
- Passing data as typed props to Client Components

**Forbidden in RSC:**
- `useState`, `useEffect`, `useRef`, browser APIs
- Importing `.context/*` files
- Dynamic user-specific data without explicit `no-store` cache

### Client Components — Explicit `"use client"`
Only the following are Client Components:
- `src/components/client/CodeCanvas.tsx` — Zustand + responsive layout
- `src/components/client/ContactForm.tsx` — Form state + Server Action call
- `src/components/shared/Header.tsx` — Mobile menu toggle state

**Forbidden in Client Components:**
- Importing `lib/accessors/*` directly
- Calling `lib/actions/*` except via `<form action>` or explicit Server Action import
- `process.env` access (use props or Server Action)

---

## 3. DATA FLOW INVARIANTS

```
External API (GitHub / Vercel / Supabase)
        ↓
  lib/accessors/*.ts
  [fetch + typed parse + AccessorResult<T>]
        ↓
  Server Component (RSC)
  [await accessor → extract typed fields → pass props]
        ↓
  Client Component or Shared Component
  [renders typed props only — no raw accessor data]
```

**Critical invariant:** No accessor result object may be spread directly into a component prop. Only explicitly named, typed fields from the `data` object may cross the RSC-to-client boundary.

---

## 4. ACCESSOR CONTRACT

Every accessor must:
1. Return `AccessorResult<T>` — never `throw`.
2. Implement at least 3 distinct error states: `network_failure`, `schema_invalid`, `upstream_unavailable`.
3. Parse all external data through a Zod schema before returning `{ ok: true, data }`.
4. Implement a typed fallback path (local cache or in-memory mock) for development.
5. Log errors with structured context string: `[accessorName] error context: ...`.

```typescript
// Canonical return type — do not change
export type AccessorResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { errorType: string; occurredAt: string; retryable: boolean } };
```

---

## 5. RENDERING STRATEGY (FROZEN)

| Route | Strategy | Revalidation | Rationale |
|---|---|---|---|
| `/` | Static (`force-static`) | Manual deploy | Case studies are authored content. |
| `/work` | Static (`force-static`) | Manual deploy | Case study index is authored. |
| `/work/[slug]` | Static (`generateStaticParams`) | Manual deploy | Detail pages are authored. |
| `/about` | Static (`force-static`) | Manual deploy | Resume data is authored. |
| `/lab` | Dynamic (`force-dynamic`) | Per-request | Telemetry must be fresh. |
| `/lab/canvas` | Static (default) | Manual deploy | No server data needed. |
| `/lab/telemetry` | ISR (`revalidate: 60`) | 60 seconds | Edge metrics. |
| `/contact` | Static (`force-static`) | Manual deploy | Form is client-side. |
| `/resume.pdf` | Dynamic (route handler) | Per-request | File served on demand. |

**Invariant:** Never change a Static route to Dynamic without explicit human approval. Dynamic routes increase cold-start latency and infrastructure cost.

---

## 6. DIRECTORY ROLES (FROZEN)

```
kamil-portfolio/
├── src/
│   ├── app/                  # Next.js App Router — routes only
│   │   ├── page.tsx          # Home
│   │   ├── layout.tsx        # Root layout (HTML shell, fonts, global styles)
│   │   ├── globals.css       # Design tokens + global utility classes
│   │   ├── icon.svg          # Favicon
│   │   ├── about/            # /about route
│   │   ├── contact/          # /contact route
│   │   ├── lab/              # /lab route + canvas + telemetry subroutes
│   │   ├── resume.pdf/       # Route handler for PDF download
│   │   └── work/             # /work route + [slug] subroute
│   ├── components/
│   │   ├── client/           # "use client" components only
│   │   ├── server/           # Async RSC wrapper components
│   │   └── shared/           # Pure presentational components (no data fetching)
│   ├── content/
│   │   ├── index.ts          # Content loader — parses + validates JSON data
│   │   ├── resume.json       # Resume data (source of truth)
│   │   └── case-studies/     # Case study JSON files
│   └── lib/
│       ├── accessors/        # External data fetchers (GitHub, Supabase, Vercel)
│       ├── actions/          # Next.js Server Actions ("use server")
│       ├── stores/           # Zustand client state stores
│       └── validators/       # Zod schema definitions
├── public/                   # Static assets (images, fonts, favicon)
│   └── resume/               # PDF resume file
├── scripts/                  # Build-time governance scripts
│   ├── audit-spec-leak.mjs   # Prevents .context/ content in app source
│   └── audit-line-limits.mjs # Enforces 150-line ceiling
├── .context/                 # BUILD-TIME ONLY — never imported by app code
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── SCHEMA.md
│   ├── API.md
│   └── RULES.md
├── AGENTS.md                 # AI governance rules
└── .github/workflows/        # CI/CD pipeline definitions
```

**Critical rule:** `.context/` must never sit inside `app/`, `public/`, or `pages/`. It must never be added to any content loader's glob pattern.

---

## 7. STATE MANAGEMENT

**Server state:** React Server Components with Next.js `fetch` caching.  
**Client state:** Zustand — one store per isolated feature domain.  
**No React Context** for cross-component data sharing (use RSC prop drilling or Zustand).  
**No Redux** — not in scope, not permitted.

### Canvas Store Invariants
- History array capped at 10 entries (`slice(-10)`).
- `reset()` returns to the initial layout (first history entry or `"grid"`).
- Layout must be one of: `"grid" | "stack" | "split"`.

---

## 8. DESIGN SYSTEM ARCHITECTURE

### Design Tokens (Single Source of Truth: `tailwind.config.js`)

| Token Name | Value | Usage |
|---|---|---|
| `accent-brand` | `#635BFF` | Primary brand color — buttons, active states, key links |
| `accent-cyan` | `#00D4FF` | Restricted to CodeCanvas terminal context only |
| `accent-purple` | `#7A73FF` | Secondary brand accent — limit to 2 uses per page |
| `stripe-navy` | `#0A2540` | Dark text, deep backgrounds |
| `stripe-slate` | `#425466` | Secondary text |
| `stripe-light` | `#F6F9FC` | Page background |

### Component Shape Hierarchy
| Component Role | Border Radius |
|---|---|
| Primary/secondary action buttons | `rounded-full` |
| Status indicator badges only | `rounded-full` |
| Content cards | `rounded-lg` (8px) |
| Header, elevated surfaces | `rounded-xl` (12px) |
| Input fields | `rounded-xl` (12px) |
| Tags (non-interactive) | `rounded-md` (6px) |

### Glassmorphism Restriction
`backdrop-blur-*` and `bg-white/80` permitted only on `<Header>`. All other surfaces use solid backgrounds.

### Gradient Restriction
Maximum 2 gradient uses per page: (1) Hero h1 text gradient, (2) Layout background mesh. No gradient borders on content cards.
