# Design System & Icon Standards
# kamil-portfolio | Mineral Ink & Viridian (Primer Primitives Aligned)

## 1. Icon Architecture & Principles

All icons and symbols in the portfolio adhere to the following non-negotiable principles:

- **Local Vector Source**: All icons are inline SVG components typed with `IconProps` (`React.SVGProps<SVGSVGElement>`). Zero external icon fonts, emojis, or remote image CDNs.
- **Brand Authenticity**: Technology stack items use verified brand silhouettes from Simple Icons or official specifications (Python, Django, PostgreSQL, SQLite, Next.js, TypeScript, JavaScript, HTML5, CSS3, Docker, Redis, Supabase, Git, Postman, Vercel). No improvised glyphs or Lucide substitutes for tech brands.
- **Semantic Fallback Hierarchy**:
  1. Exact Brand Mark (`TechIcons.tsx`, `PlatformIcons.tsx`).
  2. Semantic Discipline Symbol (`PhosphorHardDrives` for APIs, `PhosphorDatabase` for data schemas, `PhosphorShieldCheck` for RBAC/security, `PhosphorTerminalWindow` for CLI).
  3. Universal Stack Fallback (`PhosphorStack` for general software modules).

---

## 2. Color Tokens & Contrast (Primer Primitives)

Icons use semantic design tokens mapped in `src/app/tokens.css` ensuring WCAG 2.2 AA contrast ($\ge 4.5:1$):

- **Default Supporting Icons**: `text-text-secondary` (`#afb8c1` dark / `#57606a` light). Contrast ratio $\ge 5.5:1$.
- **Interactive / Active Icons**: `text-fg-accent` (`#3fb950` viridian / `#0969da` blue).
- **Hover Transitions**: `group-hover:text-text-primary` (`#f0f6fc` dark / `#1f2328` light).
- **Status Indicators**: `text-status-success-fg`, `text-status-error-fg`, `text-status-warning-fg`.

---

## 3. Sizing, Spacing & Layout Matrix

| Context | Icon Size | Badge / Target Size | Spacing | Token Classes |
|---|---|---|---|---|
| **Compact Badges** | 12×12px | `text-[10px]` | `gap-1` | `w-3 h-3 shrink-0` |
| **Standard Badges** | 14×14px | `text-xs` (12px) | `gap-1.5` | `w-3.5 h-3.5 shrink-0` |
| **Controls / Buttons** | 16×16px | $\ge 44\times 44$px touch | `gap-2` | `w-4 h-4 shrink-0` |
| **Feature Discipline** | 20×20px | 40×40px badge | `gap-3` | `w-5 h-5 shrink-0` |

### Collision & Wrapping Prevention
Every badge component (`TechBadge`) mandates:
- `whitespace-nowrap shrink-0 max-w-full`: Prevents text wrap fractures and keeps the icon aligned on one line.
- `truncate` on text label: Prevents overflow on ultra-narrow mobile viewports ($\le 320$px).

---

## 4. Accessibility & Assistive Technology Rules

1. **Decorative Accompanying Icons**: Marked `aria-hidden="true"`. The adjacent visible text conveys meaning without duplicate announcements.
2. **Icon-Only Controls**: Must have explicit `aria-label` or `aria-labelledby`, visible focus rings (`focus-visible:ring-2`), and $\ge 44\times 44$px interactive bounding box.
3. **Reduced Motion**: Respects `prefers-reduced-motion: reduce`; no infinite spinning or distracting icon animations.
