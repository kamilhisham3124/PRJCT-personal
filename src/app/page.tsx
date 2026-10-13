import React from "react";
import Link from "next/link";
import { TelemetryWidget } from "../components/server/TelemetryWidget";
import { getAllCaseStudies } from "../content";

export const dynamic = "force-static";

export default function HomePage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="flex flex-col gap-8">
      {/* 70% / 30% Asymmetrical Layout Split at BP-03+ (DOC-18 Section 5.0) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 70% Data Ledger (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Priority Tier 1: Stated Differentiating Claim (DOC-17 Section 1.0) */}
          <section className="border-structural bg-surface-primary p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-structural pb-3 mb-4">
              <span className="text-xs font-mono uppercase text-text-secondary tracking-widest">
                Kamil Hisham / Technical Baseline
              </span>
              <span className="text-xs font-mono text-text-secondary">
                Persona: Full-Stack Systems Engineer (AI/Infra)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-claim font-bold tracking-tight text-text-primary leading-tight font-display mb-4">
              Deterministic, production-grade systems engineered to survive scale.
            </h1>

            <p className="text-base text-text-secondary font-display max-w-2xl leading-relaxed mb-4">
              Constructs deterministic backend architectures, normalized relational
              schemas, and low-latency edge services. Delivers verifiable systems in
              the category where stochastic AI-generated code fails under production load.
            </p>

            {/* Marginalia Annotation 1 of 3 (DOC-18 Section 2.1) */}
            <div className="font-marginalia text-annotation text-text-secondary">
              // verifiable engineering evidence: zero descriptive marketing claims
            </div>
          </section>

          {/* Primary Production Data Ledger (70% column core) */}
          <section className="border-structural bg-surface-secondary p-6">
            <div className="flex items-center justify-between border-b border-structural pb-3 mb-4">
              <h2 className="text-xs font-mono uppercase text-text-secondary">
                Production Case Studies Ledger
              </h2>
              <span className="text-xs font-mono text-text-secondary">
                Git &amp; CI Verified
              </span>
            </div>

            <div className="flex flex-col divide-y divide-structural">
              {caseStudies.map((study, idx) => (
                <div key={study.slug} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <Link
                      href={`/work/${study.slug}`}
                      className="text-lg font-bold font-display text-text-primary hover:underline"
                    >
                      0{idx + 1}. {study.title}
                    </Link>
                    <span className="text-xs font-mono text-text-secondary">
                      {study.published_at}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                    {study.summary}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {study.tech_stack.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 border-structural bg-surface-primary text-xs font-mono text-text-secondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/work/${study.slug}`}
                      className="text-xs font-mono font-bold underline text-text-primary hover:text-text-secondary"
                    >
                      Inspect Architecture &gt;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: 30% Telemetry & Infrastructure Metadata Rail (lg:col-span-4) */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Priority Tier 1: Co-located Live Telemetry (DOC-17 Section 1.0) */}
          <div className="flex flex-col gap-2">
            <TelemetryWidget />
            {/* Marginalia Annotation 2 of 3 */}
            <div className="font-marginalia text-annotation text-text-secondary px-1">
              // measured live from edge runtime: 60s revalidation
            </div>
          </div>

          {/* Infrastructure Substrate Card */}
          <section className="border-structural bg-surface-secondary p-4">
            <h3 className="text-xs font-mono uppercase text-text-secondary mb-3 border-b border-structural pb-2">
              Infrastructure Specification
            </h3>
            <div className="flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-text-secondary">Platform:</span>
                <span className="text-text-primary font-bold">Vercel Edge Network</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Runtime:</span>
                <span className="text-text-primary">Next.js 15 / RSC Edge</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Database:</span>
                <span className="text-text-primary">Supabase PostgreSQL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Security:</span>
                <span className="text-text-primary">Row-Level Security</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">WCAG Target:</span>
                <span className="text-text-primary font-bold">2.2 Level AA (0 errors)</span>
              </div>
            </div>
          </section>

          {/* Direct Verification Pathways */}
          <section className="border-structural bg-surface-secondary p-4">
            <h3 className="text-xs font-mono uppercase text-text-secondary mb-3 border-b border-structural pb-2">
              Verification Pathways
            </h3>
            <div className="flex flex-col gap-2 font-mono text-xs">
              <Link
                href="/lab/canvas"
                className="p-2 border-structural bg-surface-primary text-text-primary hover:bg-surface-secondary block"
              >
                &gt; Architecture Sandbox (RT-06)
              </Link>
              <Link
                href="/lab/telemetry"
                className="p-2 border-structural bg-surface-primary text-text-primary hover:bg-surface-secondary block"
              >
                &gt; Historical Telemetry Ledger (RT-07)
              </Link>
              <Link
                href="/contact"
                className="p-2 border-structural bg-text-primary text-surface-primary font-bold block text-center"
              >
                Direct Inquiry Interface (RT-08) &gt;
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
