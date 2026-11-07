import React from "react";
import Link from "next/link";
import { TelemetryWidget } from "../components/server/TelemetryWidget";
import { getAllCaseStudies } from "../content";
import { ArrowRight, MapPin } from "lucide-react";
import { Hero3DCanvas } from "../components/client/Hero3DCanvas";

export const dynamic = "force-static";

export default function HomePage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="flex flex-col gap-10">
      {/* LinkHunt Identity & Profile Hero */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-4 border-b border-[var(--border-structural)]">
        <div className="flex flex-col gap-3 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for engineering roles</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Singapore / Remote</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Kamil Hisham
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Full-stack systems engineer designing normalized relational schemas, resilient backend
            architectures, and high-performance edge compute platforms.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/work" className="px-5 py-2.5 rounded-full text-xs font-semibold linkhunt-btn-primary gap-2">
              <span>Explore Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/lab" className="px-5 py-2.5 rounded-full text-xs font-semibold linkhunt-btn-secondary">
              Interactive Lab
            </Link>
          </div>
        </div>

        <Hero3DCanvas />
      </section>

      {/* Main Grid: Case Studies (Left) + Substrate & Telemetry (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-structural)]">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">Featured Case Studies</h2>
            <span className="text-xs font-mono text-[var(--text-secondary)]">[ACID_STORAGE]</span>
          </div>

          <div className="flex flex-col gap-4">
            {caseStudies.length === 0 && (
              <p className="text-sm text-[var(--text-secondary)] py-6">No production case studies available.</p>
            )}
            {caseStudies.map((study, idx) => (
              <article key={study.slug} className="group linkhunt-card p-5 sm:p-6 flex flex-col gap-3 hover:shadow-card-hover transition-all">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <Link href={`/work/${study.slug}`} className="text-lg font-semibold text-[var(--text-primary)] group-hover:underline">
                    0{idx + 1}. {study.title}
                  </Link>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">{study.published_at}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{study.summary}</p>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-structural)]">
                  <div className="flex flex-wrap gap-1.5">
                    {study.tech_stack.map((t) => (
                      <span key={t} className="linkhunt-badge">{t}</span>
                    ))}
                  </div>
                  <Link href={`/work/${study.slug}`} className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-primary)] hover:underline">
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Rail: Telemetry & Platform Specs */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <TelemetryWidget />

          <section className="linkhunt-card p-5">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3 pb-2 border-b border-[var(--border-structural)]">
              Platform Substrate
            </h3>
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between items-center"><span className="text-[var(--text-secondary)]">Edge Platform</span><span className="font-medium text-[var(--text-primary)]">Vercel Global Edge</span></div>
              <div className="flex justify-between items-center"><span className="text-[var(--text-secondary)]">Runtime Engine</span><span className="font-medium text-[var(--text-primary)]">Next.js 15 RSC</span></div>
              <div className="flex justify-between items-center"><span className="text-[var(--text-secondary)]">Database Layer</span><span className="font-medium text-[var(--text-primary)]">Supabase PostgreSQL</span></div>
              <div className="flex justify-between items-center"><span className="text-[var(--text-secondary)]">Accessibility</span><span className="font-medium text-emerald-600 dark:text-emerald-400">WCAG 2.2 AA</span></div>
            </div>
          </section>

          <section className="linkhunt-card p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">Systems Sandbox</h3>
            <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">Deterministic client state machines and live SLA latency monitoring.</p>
            <div className="flex flex-col gap-2">
              <Link href="/lab/canvas" className="w-full text-center py-2 px-3 rounded-lg bg-[var(--surface-secondary)] text-xs font-medium hover:border-[var(--border-highlight)] border border-[var(--border-structural)] transition-colors min-h-[44px] inline-flex items-center justify-center">
                Interactive Canvas Engine &rarr;
              </Link>
              <Link href="/lab/telemetry" className="w-full text-center py-2 px-3 rounded-lg bg-[var(--surface-secondary)] text-xs font-medium hover:border-[var(--border-highlight)] border border-[var(--border-structural)] transition-colors min-h-[44px] inline-flex items-center justify-center">
                24-Hour Telemetry Ledger &rarr;
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
