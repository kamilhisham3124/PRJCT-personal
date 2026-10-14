# API.md — Executable Contracts, Endpoints & Data Contracts
# kamil-portfolio | Layer 4: API Contracts

> **Authority:** Every internal and external API contract is defined here. Code must match these contracts byte-for-byte. No endpoint, response shape, or error format may diverge.

---

## 1. NEXT.JS SERVER ACTIONS

### `submitContactForm` — `src/lib/actions/submitContactForm.ts`

**Signature:**
```typescript
async function submitContactForm(
  formData: FormData | Record<string, string>
): Promise<ContactFormResult>
```

**Input Contract:**
| Field | Type | Validation |
|---|---|---|
| `name` | `string` | min 1 char, max 100 chars |
| `email` | `string` | valid email format |
| `message` | `string` | min 10 chars, max 2000 chars |

**Response Contract:**
```typescript
type ContactFormResult =
  | { status: "success"; submittedAt: string }         // ISO 8601 timestamp
  | { status: "validation-error"; fieldErrors: Record<string, string> }
  | { status: "server-error" }
```

**Behavior:**
1. Parse `FormData` → extract `name`, `email`, `message`.
2. Validate with `ContactFormInputSchema.safeParse()`.
3. On validation failure: return `{ status: "validation-error", fieldErrors }`.
4. On success: call `supabaseInsertContactMessage(data)`.
5. On Supabase failure: return `{ status: "server-error" }`.
6. On Supabase success: return `{ status: "success", submittedAt: ISO8601 }`.
7. All catch paths: log error with `console.error('[submitContactForm] error:', err)`, return `{ status: "server-error" }`.

---

## 2. ROUTE HANDLERS

### `GET /resume.pdf` — `src/app/resume.pdf/route.ts`

**Response:** Binary PDF file with headers:
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="Kamil_Hisham_Resume.pdf"
Cache-Control: public, max-age=86400
```

**Error response (file not found):**
```
HTTP 404
Content-Type: text/plain
Body: "Resume file not available."
```

---

## 3. EXTERNAL API CONTRACTS

### GitHub REST API — `src/lib/accessors/githubAccessor.ts`

**Endpoint:** `GET https://api.github.com/repos/{owner}/{repo}/commits?per_page={n}`

**Request Headers:**
```
Accept: application/vnd.github.v3+json
User-Agent: kamil-portfolio-systems
Authorization: Bearer {GITHUB_API_TOKEN}  // Optional
```

**Mapped Response (after Zod parse):**
```typescript
{
  commits: Array<{
    sha:        string;   // 7-40 chars
    message:    string;   // First line of commit message, max 500 chars
    authoredAt: string;   // ISO 8601
    verified:   boolean;  // commit.verification.verified
  }>;
  repoUrl:   string;      // https://github.com/{owner}/{repo}
  fetchedAt: string;      // ISO 8601
}
```

**Error Mapping:**
| GitHub Status | Accessor Error |
|---|---|
| 404 | `{ errorType: "repository_not_found", retryable: false }` |
| 403 / 429 | Fallback to in-memory deterministic data |
| Any other non-2xx | `{ errorType: "upstream_unavailable", retryable: true }` |
| Invalid JSON shape | `{ errorType: "schema_invalid", retryable: false }` |
| Network exception | Fallback to in-memory deterministic data |

**Caching:** `next: { revalidate: 3600 }` (1 hour)

**Raw Input Type** (before Zod parse — must be defined, not `any`):
```typescript
interface RawGitHubCommit {
  sha: string;
  commit: {
    message: string;
    author:  { date: string };
    verification: { verified: boolean };
  };
}
```

---

### Supabase REST API — `src/lib/accessors/supabaseAccessor.ts`

#### Read Telemetry Aggregates
**Endpoint:** `GET {SUPABASE_URL}/rest/v1/telemetry_aggregate?select=*`

**Request Headers:**
```
apikey: {SUPABASE_ANON_KEY}
Authorization: Bearer {SUPABASE_ANON_KEY}
```

**Caching:** `next: { revalidate: 60 }`

**Response (after Zod parse):**
```typescript
Array<{
  metric_key:       "total_page_views" | "total_canvas_interactions";
  metric_value:     number;
  last_computed_at: string;  // ISO 8601
}>
```

#### Insert Contact Message
**Endpoint:** `POST {SUPABASE_URL}/rest/v1/contact_messages`

**Request Headers:**
```
Content-Type: application/json
apikey: {SUPABASE_ANON_KEY}
Authorization: Bearer {SUPABASE_ANON_KEY}
Prefer: return=minimal
```

**Request Body:**
```typescript
{
  name:         string;
  email:        string;
  message:      string;
  submitted_at: string;  // ISO 8601
}
```

**Response:**
- `res.ok === true` → return `true`
- `res.ok === false` → return `false`
- Network exception → catch, log, return `false`

**Dev Fallback** (when env vars absent):
- Return in-memory mock data with seeded `{ total_page_views: 1420, total_canvas_interactions: 388 }`.
- **Production rule:** If `SUPABASE_URL` is absent in production environment, return `{ ok: false }` — never serve seeded numbers as real production data.

---

### Vercel Telemetry — `src/lib/accessors/vercelTelemetryAccessor.ts`

**Behavior:** Simulated edge telemetry (no real Vercel API integration — deterministic local generation).

**Output Contract:**
```typescript
{
  edgeLatencyMs: number;    // 0–5000ms
  bundleSizeKb:  number;    // 0–10000KB
  measuredAt:    string;    // ISO 8601
  nodeStatus:    Array<{
    region: string;
    status: "healthy" | "degraded" | "offline";
  }>;
}
```

**History Contract:**
```typescript
Array<{
  timestamp:     string;    // ISO 8601
  edgeLatencyMs: number;
  bundleSizeKb:  number;
}>
```

---

## 4. CONTENT LOADER CONTRACTS — `src/content/index.ts`

### `getResumeContent(): ResumeContent`
- Reads `src/content/resume.json`
- Parses with `ResumeContentSchema.parse()` — throws if invalid
- Returns fully typed `ResumeContent`

### `getAllCaseStudies(): CaseStudyContent[]`
- Reads all case study JSON files from `src/content/case-studies/`
- Parses each with `CaseStudyContentSchema.parse()`
- Returns array in file system order (deterministic)
- Returns `[]` if directory is empty — callers must handle empty state

### `getCaseStudyBySlug(slug: string): CaseStudyContent | null`
- Calls `getAllCaseStudies()` internally
- Returns matched study or `null` — never throws
- Callers must call `notFound()` on `null` return

---

## 5. API CHANGE POLICY

1. Any change to a response shape must be reflected in the corresponding Zod schema and in this document.
2. Any new external API integration requires a new accessor file in `lib/accessors/`, a new validator in `lib/validators/`, and an entry in this document.
3. Existing accessor function signatures are frozen — breaking changes require human sign-off.
4. All accessor functions must return `AccessorResult<T>` — never throw, never return `undefined`.
