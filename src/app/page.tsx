import React from "react";
import Link from "next/link";
import { TelemetryWidget } from "../components/server/TelemetryWidget";
import { getAllCaseStudies } from "../content";
import { ArrowRight, Sparkles, Layers, Globe } from "lucide-react";

export const dynamic = "force-static";

export default function HomePage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="flex flex-col gap-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-4 sm:py-6">
        <div className="flex flex-col items-start gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-[#635BFF] dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Stack Systems &amp; Infrastructure</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.1] stripe-gradient-text">
            Deterministic systems engineered to survive scale.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
            Designs normalized relational schemas, resilient backend architectures, and high-performance edge compute platforms engineered for stability under real-world load.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link href="/work" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#635BFF] hover:bg-[#5349e0] shadow-stripe-btn transition-all group">
              <span>Explore Architecture Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/lab" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[#0A2540] dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 shadow-sm transition-all">
              Interactive Lab
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Split: 70% / 30% */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 70% Case Studies */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
            <h2 className="text-lg font-bold font-display text-[#0A2540] dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#635BFF]" />
              <span>Production Case Studies</span>
            </h2>
            <span className="text-xs font-semibold text-slate-500">Verified Deployments</span>
          </div>

          <div className="flex flex-col gap-4">
            {caseStudies.map((study, idx) => (
              <article key={study.slug} className="group p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-stripe hover:shadow-stripe-hover focus-within:ring-2 focus-within:ring-[#635BFF]/50 focus-within:ring-offset-2 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                  <Link href={`/work/${study.slug}`} className="text-xl font-bold font-display text-[#0A2540] dark:text-white group-hover:text-[#635BFF] transition-colors">
                    0{idx + 1}. {study.title}
                  </Link>
                  <span className="text-xs font-mono text-slate-400">{study.published_at}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{study.summary}</p>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {study.tech_stack.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link href={`/work/${study.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-[#635BFF] group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Column: 30% Telemetry & Substrate Rail */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <TelemetryWidget />

          <section className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 backdrop-blur-xl shadow-stripe">
            <h3 className="text-xs font-bold text-[#0A2540] dark:text-white uppercase tracking-wider mb-3 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#635BFF]" />
              <span>Platform Substrate</span>
            </h3>
            <div className="flex flex-col gap-2.5 text-xs font-medium">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Edge Platform</span>
                <span className="font-semibold text-[#0A2540] dark:text-white">Vercel Global Edge</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Runtime Engine</span>
                <span className="font-semibold text-[#0A2540] dark:text-white">Next.js 15 RSC</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Database Layer</span>
                <span className="font-semibold text-[#0A2540] dark:text-white">Supabase PostgreSQL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Accessibility</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">WCAG 2.2 Level AA</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-slate-900/40 p-5 shadow-stripe">
            <h3 className="text-sm font-bold text-[#0A2540] dark:text-white mb-2">Explore the Sandbox</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              Experience deterministic state transitions and synchronous layout composition engines.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/lab/canvas" className="w-full text-center py-2 px-3 rounded-xl bg-white dark:bg-slate-800 text-xs font-semibold text-[#0A2540] dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm hover:border-[#635BFF] transition-all">
                Interactive Canvas Engine &gt;
              </Link>
              <Link href="/lab/telemetry" className="w-full text-center py-2 px-3 rounded-xl bg-white dark:bg-slate-800 text-xs font-semibold text-[#0A2540] dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm hover:border-[#635BFF] transition-all">
                24-Hour Telemetry Ledger &gt;
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
