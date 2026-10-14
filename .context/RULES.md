# RULES.md — Hard Negative Constraints and Coding Guardrails
# Layer 5 of the .context/ specification hierarchy
# Governing: all AI sessions, all human contributors, all CI gates

---

## 1. Absolute Prohibitions (Never Do)

### R-01: No `any` type
Never write `any` in TypeScript. Use a named interface or `unknown` with
a type-guard. The only permitted structural bypass is an explicit `// eslint-disable`
comment with a referenced issue number explaining why the type cannot be narrowed.

### R-02: No inline styles
Never write `style={{ ... }}` in JSX. All visual rules must exist in
`tailwind.config.js` tokens, CSS custom properties in `globals.css`,
or Tailwind utility classes.

### R-03: No spec leak
Never import, read, or reference files under `.context/` from application code.
`.context/` is documentation, not a data source. Violation is a build-blocking
CI failure per the `audit:leak` script.

### R-04: No seeded data in production paths
Never return hardcoded numeric values (page views, interaction counts, or similar
metrics) when `NODE_ENV === "production"`. Return an error envelope instead.
Deterministic fallbacks are permitted in `NODE_ENV === "development"` only.

### R-05: No silent error discard
Never write an empty `catch` block. Every `catch (err)` must either log with
`console.error(...)` (minimum) or return a typed error envelope. Swallowing
`err` without inspection is forbidden.

### R-06: No new npm packages without approval
Do not add entries to `dependencies` or `devDependencies` in `package.json`
without explicit user confirmation. Propose the package and its purpose;
wait for approval before installing.

### R-07: No routes outside the frozen contract
The nine approved routes are: `/`, `/work`, `/work/[slug]`, `/about`,
`/lab`, `/lab/canvas`, `/contact`, `/resume.pdf`, `/api/telemetry`.
No new `app/` directory segments may be created without a corresponding
PRD.md update and user approval.

### R-08: No files exceeding 150 lines
Every file under `src/` must stay at or below 150 lines. The CI gate
`audit:lines` enforces this. Split a growing file into co-located modules
before it breaches the limit.

### R-09: No em-dashes in source files
Never write the `--` (em-dash) character in any `.ts`, `.tsx`, `.md`,
or `.json` file. Use a regular hyphen-minus (`-`) or rewrite the sentence.

### R-10: No decorative emojis in UI copy
Never add emoji characters to heading text, button labels, nav labels,
or body copy. Emoji are permitted only in `README.md` and dev tooling output.

---

## 2. Architectural Constraints

### R-11: Accessor-only data access
All external I/O (GitHub API, Supabase, file system) must go through
a named accessor function in `src/lib/accessors/`. No route or component
may call `fetch()` or `fs` directly.

### R-12: Zod at every boundary
Every external data shape that enters the app must pass a `safeParse`
against a Zod schema before use. Raw API responses must never be passed
to UI components.

### R-13: Server Components own data; Client Components own interaction
Server Components (`src/app/**/*.tsx` without `"use client"`) call accessors
and pass typed, narrow props to Client Components. Client Components must
never call an accessor or a Server Action directly in a `useEffect`.

### R-14: Error envelopes, not thrown exceptions
All accessor functions return `AccessorResult<T>`. They must not throw.
Internal failures are caught and returned as `{ ok: false, error: ... }`.

---

## 3. UI and Design Constraints

### R-15: Glassmorphism restricted to navigation
`backdrop-blur` and `bg-*/opacity` combinations are permitted only on
the `<Header>` component. Content cards must use solid backgrounds from
the `surface-*` token set.

### R-16: `rounded-full` restricted to interactive controls
Use `rounded-full` only on primary buttons, secondary buttons, and the
desktop navigation pill container. Content badges, tags, and cards must
use `rounded-xl` or lower.

### R-17: Gradient restricted to logo and hero accent
CSS gradients (`from-*/via-*/to-*`) are permitted only on the KH logo
mark and a single hero section accent element. All other containers use
flat `bg-*` tokens.

### R-18: No icon-in-square-badge heading pattern
Section headings must not prefix their text with an icon wrapped in a
colored square or rounded container. Use plain text headings with optional
inline icons that have no background container.

### R-19: Use `text-accent-brand` token, not arbitrary hex
All references to the brand purple must use the Tailwind token
`text-accent-brand`, `bg-accent-brand`, or `border-accent-brand`.
The arbitrary class `text-[#635BFF]` is forbidden in new code.

---

## 4. Git and Commit Constraints

### R-20: Conventional commit format required
Every commit must follow: `<type>(<scope>): <imperative description>`.
Permitted types: `feat`, `fix`, `docs`, `chore`, `ci`, `refactor`, `perf`, `test`.
No merge commits on `main`; rebase before push.

### R-21: `npm test` must pass before every push
The full test suite (`audit:leak`, `audit:lines`, `typecheck`, `lint`) must
exit 0 before any `git push`. Do not force-push to bypass CI.

---

## 5. Change Policy

Modifying or overriding any rule in this file requires:
1. An explicit user instruction naming the rule ID to override.
2. A corresponding update to `AGENTS.md` Section 4.0 (Cardinal Rules).
3. A conventional commit with type `docs` and scope `governance`.
