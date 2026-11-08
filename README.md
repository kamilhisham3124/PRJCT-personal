# Kamil Hisham — Developer Portfolio

Personal portfolio website showcasing full-stack web applications, REST APIs, and relational database architectures built with Next.js 15, Python/Django, TypeScript, and Tailwind CSS.

## Tech Stack & Architecture

- **Frontend & Routing:** Next.js 15 (App Router, React Server Components)
- **Language & Typings:** TypeScript (strict mode, zero `any`)
- **Styling:** Tailwind CSS with custom design tokens and responsive dark mode
- **Data Validation:** Zod schemas for all forms, APIs, and content boundaries
- **Data Access:** Typed Accessor pattern returning predictable `AccessorResult<T>` envelopes
- **Specifications:** Local SDD documentation hierarchy (`.context/`)

## Prerequisites

- Node.js 22.x or later
- npm 10.x or later

## Environment Variables

Copy the example environment configuration or define the following in `.env.local`:

```bash
# Optional: GitHub personal access token for live commit validation
GITHUB_API_TOKEN=

# Optional: Supabase credentials for production contact submissions and telemetry
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

When credentials are omitted, local mock providers ensure complete offline functionality during development.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Quality Gates & Verification

All code must pass automated CI verification gates before shipping:

```bash
# 1. Specification content leak check (BND-04)
npm run audit:leak

# 2. File line-budget verification (max 150 lines per module)
npm run audit:lines

# 3. Leaked secret & credential scanning
npm run audit:secrets

# 4. Native Node unit test suite
npm run test:unit

# 5. TypeScript strict compilation (zero any)
npm run typecheck

# 6. ESLint analysis
npm run lint

# Run all local test gates sequentially
npm test

# Additional diagnostic & operational tools:
npm run audit:bundle      # Asset and production chunk size verification
npm run test:smoke        # Automated route health probe
npm run diagnose:author   # Git author & commit attribution verification
```

## Production Build

```bash
npm run build
npm start
```

## Governance

Refer to the permanent engineering guidelines:
- [AGENTS.md](AGENTS.md) - Cardinal rules and automated engineering loop
- [.context/PRD.md](.context/PRD.md) - Product requirements document
- [.context/ARCHITECTURE.md](.context/ARCHITECTURE.md) - 3-layer system design and data contracts
- [.context/SCHEMA.md](.context/SCHEMA.md) - Zod schemas and database definitions
- [.context/API.md](.context/API.md) - REST and server action contracts
- [.context/RULES.md](.context/RULES.md) - Hard negative constraints and coding guardrails
