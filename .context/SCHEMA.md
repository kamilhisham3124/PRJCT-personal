# SCHEMA.md — Data Source of Truth
# kamil-portfolio | Layer 3: Canonical Data Models & Database Entities

> **Authority:** All database entities, content schemas, and data shapes are defined here. No code may add columns, change field types, or alter relationships without updating this document first.

---

## 1. CONTENT SCHEMAS (Zod — `src/lib/validators/contentValidator.ts`)

### CaseStudyContent

```typescript
CaseStudyContentSchema = z.object({
  slug:                  z.string().min(1),          // URL-safe identifier
  title:                 z.string().max(100),          // Display title
  summary:               z.string().max(280),          // 1-2 sentence abstract
  tech_stack:            z.array(z.string()).min(1),   // Ordered technology list
  github_repo:           z.string().url(),             // Full GitHub repo URL
  preview_url:           z.string().url().optional(),  // Live preview URL if any
  published_at:          z.string(),                   // ISO date string YYYY-MM-DD
  problem_statement:     z.string().optional(),        // Business problem narrative
  architecture_overview: z.string().optional(),        // System design narrative
  database_design:       z.string().optional(),        // Schema/storage narrative
  verifiable_metrics:    z.array(z.object({           // Production evidence
    metric: z.string(),
    value:  z.string(),
  })).optional(),
});
```

**Invariants:**
- `slug` must be kebab-case, unique across all case studies.
- `github_repo` must point to a real, public GitHub repository.
- `tech_stack` order: primary language first, then frameworks, then infrastructure.
- `summary` must be human-authored, specific to this project — not AI-generated generic copy.

### ResumeContent

```typescript
ResumeContentSchema = z.object({
  name: z.string(),
  contact: z.object({
    phone:           z.string(),
    email:           z.string().email(),
    github:          z.string().url(),
    github_username: z.string(),
    linkedin:        z.string().url(),
  }),
  persona_statement:   z.string(),                 // 2-3 sentence professional positioning
  experience_entries:  z.array(ExperienceEntrySchema),
  education: z.object({
    degree:          z.string(),
    institution:     z.string(),
    location:        z.string(),
    graduation_date: z.string(),
    cgpa:            z.string(),
  }),
  skills: z.array(z.string()),                     // Ordered by proficiency
});

ExperienceEntrySchema = z.object({
  role:          z.string(),
  organization:  z.string(),
  location:      z.string().optional(),
  start_date:    z.string(),                       // "Month YYYY" format
  end_date:      z.string().nullable(),            // null = "Present"
  summary:       z.string(),                       // 2-4 sentence role summary
});
```

---

## 2. SUPABASE DATABASE SCHEMA

### Table: `contact_messages`

```sql
CREATE TABLE contact_messages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL CHECK (char_length(name) >= 1 AND char_length(name) <= 100),
  email        TEXT NOT NULL CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
  message      TEXT NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 2000),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Invariants:**
- `email` is validated both client-side (Zod) and server-side (Supabase CHECK constraint).
- No `user_id` or session data is stored — contact is anonymous by design.
- Row-level security: INSERT allowed for `anon` role, SELECT allowed only for `service_role`.
- No DELETE or UPDATE permitted from application code. Data retention: 90 days.

### Table: `telemetry_aggregate`

```sql
CREATE TABLE telemetry_aggregate (
  metric_key       TEXT PRIMARY KEY CHECK (metric_key IN ('total_page_views', 'total_canvas_interactions')),
  metric_value     BIGINT NOT NULL DEFAULT 0,
  last_computed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Invariants:**
- Only 2 rows exist — one per `metric_key` enum value.
- Updated by a Supabase Edge Function on a schedule (not by application code directly).
- Application code reads aggregate only — never writes directly.

---

## 3. GITHUB ACCESSOR RESPONSE SCHEMA (Zod — `src/lib/validators/githubValidator.ts`)

```typescript
GitHubCommitSchema = z.object({
  sha:        z.string().min(7).max(40),
  message:    z.string().max(500),
  authoredAt: z.string(),   // ISO 8601
  verified:   z.boolean(),
});

GitHubAccessorResponseSchema = z.object({
  commits:   z.array(GitHubCommitSchema).max(10),
  repoUrl:   z.string().url(),
  fetchedAt: z.string(),
});
```

---

## 4. VERCEL TELEMETRY RESPONSE SCHEMA (Zod — `src/lib/validators/telemetryValidator.ts`)

```typescript
NodeStatusSchema = z.object({
  region: z.string(),
  status: z.enum(["healthy", "degraded", "offline"]),
});

VercelTelemetryResponseSchema = z.object({
  edgeLatencyMs: z.number().min(0).max(5000),
  bundleSizeKb:  z.number().min(0).max(10000),
  measuredAt:    z.string(),
  nodeStatus:    z.array(NodeStatusSchema),
});
```

---

## 5. CONTACT FORM SCHEMA (Zod — `src/lib/validators/contactValidator.ts`)

```typescript
ContactFormInputSchema = z.object({
  name:    z.string().min(1, "Name is required").max(100),
  email:   z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

ContactFormResult =
  | { status: "success"; submittedAt: string }
  | { status: "validation-error"; fieldErrors: Record<string, string> }
  | { status: "server-error" };
```

---

## 6. ZUSTAND CANVAS STORE SCHEMA (`src/lib/stores/canvasStore.ts`)

```typescript
CanvasLayout = "grid" | "stack" | "split";

CanvasStoreState = {
  layout:     CanvasLayout;          // Current active layout
  history:    CanvasLayout[];        // Max 10 entries, oldest first
  setLayout:  (next: CanvasLayout) => void;
  reset:      () => void;            // Reverts to history[0] or "grid"
  initialize: (initial: CanvasLayout) => void;
};
```

**Invariants:**
- `history` never exceeds 10 entries.
- `setLayout` is a no-op if `next === state.layout` (prevents duplicate history entries).
- `initialize` always resets history to `[]`.

---

## 7. ERROR ENVELOPE SCHEMA (Zod — `src/lib/validators/errorEnvelope.ts`)

```typescript
AccessorResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      error: {
        errorType: "network_failure" | "schema_invalid" | "upstream_unavailable" | "repository_not_found";
        occurredAt: string;  // ISO 8601
        retryable:  boolean;
      };
    };
```

---

## 8. SCHEMA CHANGE POLICY

1. Any change to a Zod schema must be reflected in this document first.
2. Any new Supabase table requires a migration file in `supabase/migrations/`.
3. No `ALTER TABLE` that removes or renames a column without a data migration.
4. All new columns must have explicit `NOT NULL` constraints or documented nullable rationale.
5. The AI may not generate SQL migration files — these require human authorship and review.
