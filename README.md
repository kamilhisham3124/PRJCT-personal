# Kamil Hisham - Systems Software Engineering Portfolio

Deterministic, verified portfolio website showcasing normalized backend architectures, REST APIs, and edge computing infrastructure. Built strictly under Anti-AI Slop Specification-Driven Engineering Governance.

## Tech Stack & Architecture

- Framework: Next.js 15 (React Server Components, App Router)
- Language: TypeScript (strict mode, zero `any`)
- Styling: Tailwind CSS (Stripe-inspired design system)
- Data Validation: Zod schemas at every boundary
- Accessor Pattern: Isolated data fetchers returning typed `AccessorResult<T>` envelopes
- Specifications: `.context/` hierarchy (PRD, Architecture, Schema, API, Rules)

## Prerequisites

- Node.js 20.x or later
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

When credentials are not supplied, deterministic local mock providers maintain offline functionality in development mode.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Quality Gates & Verification

All code must pass four CI verification gates before shipping:

```bash
# 1. Specification content leak check
npm run audit:leak

# 2. File line-budget verification (max 150 lines per module)
npm run audit:lines

# 3. TypeScript compilation
npm run typecheck

# 4. ESLint analysis
npm run lint

# Or run all gates sequentially
npm test
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
