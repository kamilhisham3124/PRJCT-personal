import React from "react";
import Link from "next/link";
import { TelemetryWidget } from "../components/server/TelemetryWidget";
import { getAllCaseStudies } from "../content";

export const dynamic = "force-static";

export default function HomePage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between text-[11px] font-mono border-b border-structural pb-2 text-text-secondary">
        <span className="text-accent-chemical font-bold">[ SPEC: C10H15N // 149.24 g/mol // BATCH: 00892-B ]</span>
        <span className="hidden sm:inline text-text-secondary">COORD: 34.5920° N, 106.3652° W // STATUS: NOMINAL</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 70% Core Data Ledger */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <section className="border-element bg-surface-secondary p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-1 hazard-stripe" />
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-structural pb-3 mb-4">
              <span className="text-xs font-mono uppercase text-accent-chemical tracking-widest font-bold">
                Kamil Hisham // Portfolio
              </span>
              <span className="text-xs font-mono text-text-secondary">Full-Stack Systems Engineer</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-claim font-extrabold tracking-tight text-text-primary leading-tight font-display mb-4">
              Deterministic, production-grade systems engineered to survive scale.
            </h1>
            <p className="text-sm sm:text-base text-text-secondary font-sans max-w-2xl leading-relaxed mb-4">
              Designs robust backend architectures, normalized relational schemas, and responsive edge services. Builds verifiable web applications focused on stability, performance, and clean code discipline under real-world load.
            </p>
            <div className="font-marginalia text-annotation text-accent-chemical">
              {"// verified engineering artifacts and open source code"}
            </div>
          </section>

          <section className="border-structural bg-surface-secondary p-6">
            <div className="flex items-center justify-between border-b border-structural pb-3 mb-4">
              <h2 className="text-xs font-mono uppercase text-accent-chemical font-bold tracking-wider">
                Production Case Studies Ledger
              </h2>
              <span className="text-xs font-mono text-accent-barrel font-bold">[ VERIFIED ARTIFACTS ]</span>
            </div>
            <div className="flex flex-col divide-y divide-structural">
              {caseStudies.map((study, idx) => (
                <div key={study.slug} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <Link href={`/work/${study.slug}`} className="text-lg font-bold font-display text-text-primary hover:text-accent-chemical transition-colors">
                      0{idx + 1}. {study.title}
                    </Link>
                    <span className="text-xs font-mono text-text-secondary">{study.published_at}</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed">{study.summary}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {study.tech_stack.map((t) => (
                        <span key={t} className="px-2 py-0.5 border-element bg-surface-primary text-[11px] font-mono text-text-primary">
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link href={`/work/${study.slug}`} className="text-xs font-mono font-bold text-accent-chemical hover:underline">
                      Inspect Architecture &gt;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: 30% Telemetry & Metadata Rail */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <TelemetryWidget />
            <div className="font-marginalia text-annotation text-accent-chemical px-1">
              {"// edge runtime performance monitoring"}
            </div>
          </div>

          <section className="border-structural bg-surface-secondary p-4">
            <h3 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-3 border-b border-structural pb-2">
              Infrastructure Specification
            </h3>
            <div className="flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-text-secondary">Platform:</span>
                <span className="text-text-primary font-bold">Vercel Edge</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Runtime:</span>
                <span className="text-text-primary">Next.js 15 / Edge</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Database:</span>
                <span className="text-text-primary">Supabase PostgreSQL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Security:</span>
                <span className="text-text-primary">Protected Endpoints</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Accessibility:</span>
                <span className="text-accent-barrel font-bold">WCAG 2.2 Level AA</span>
              </div>
            </div>
          </section>

          <section className="border-structural bg-surface-secondary p-4">
            <h3 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-3 border-b border-structural pb-2">
              Verification Pathways
            </h3>
            <div className="flex flex-col gap-2 font-mono text-xs">
              <Link href="/lab/canvas" className="p-2 border-element bg-surface-primary text-text-primary hover:border-accent-chemical block">
                &gt; Architecture Sandbox
              </Link>
              <Link href="/lab/telemetry" className="p-2 border-element bg-surface-primary text-text-primary hover:border-accent-chemical block">
                &gt; Historical Performance Ledger
              </Link>
              <Link href="/contact" className="p-2 border-element bg-accent-element text-text-primary font-bold block text-center hover:bg-accent-barrel transition-colors">
                Direct Inquiry Interface &gt;
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
