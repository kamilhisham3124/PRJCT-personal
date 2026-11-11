import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TelemetryWidget } from "../components/server/TelemetryWidget";
import { getAllCaseStudies } from "../content";
import { ArrowRight, MapPin } from "lucide-react";
import { Hero3DCanvas } from "../components/client/Hero3DCanvas";

export const dynamic = "force-static";

const CASE_STUDY_IMAGES: Record<string, string> = {
  "employee-task-management": "/images/case-study-task-management.jpg",
  "gift-delivery-ecommerce": "/images/case-study-ecommerce.jpg",
};

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
              <span>India / Remote</span>
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--border-structural)] shrink-0 shadow-sm">
              <Image
                src="/images/avatar.jpg"
                alt="Kamil Hisham"
                width={48}
                height={48}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Kamil Hisham
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Software engineer building robust web applications and REST APIs with Python, Django,
            PostgreSQL, and Next.js. Focused on clean architecture and dependable systems.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/work" className="px-5 py-2.5 rounded-lg text-xs font-semibold linkhunt-btn-primary gap-2">
              <span>Explore Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/lab" className="px-5 py-2.5 rounded-lg text-xs font-semibold linkhunt-btn-secondary">
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
            <span className="text-xs font-mono text-[var(--text-secondary)]">2 Projects</span>
          </div>

          <div className="flex flex-col gap-4">
            {caseStudies.length === 0 && (
              <p className="text-sm text-[var(--text-secondary)] py-6">No production case studies available.</p>
            )}
            {caseStudies.map((study, idx) => (
              <article key={study.slug} className="group linkhunt-card p-5 sm:p-6 flex flex-col gap-3 hover:shadow-card-hover transition-all">
                <div className="relative w-full h-36 rounded-lg overflow-hidden border border-[var(--border-structural)] bg-zinc-900">
                  <Image
                    src={CASE_STUDY_IMAGES[study.slug] || "/images/case-study-task-management.jpg"}
                    alt={study.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
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
                    <span>View Project</span>
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
              Tech Stack &amp; Platform
            </h3>
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between items-center"><span className="text-[var(--text-secondary)]">Edge Platform</span><span className="font-medium text-[var(--text-primary)]">Vercel Global Edge</span></div>
              <div className="flex justify-between items-center"><span className="text-[var(--text-secondary)]">Runtime Engine</span><span className="font-medium text-[var(--text-primary)]">Next.js 15 RSC</span></div>
              <div className="flex justify-between items-center"><span className="text-[var(--text-secondary)]">Database Layer</span><span className="font-medium text-[var(--text-primary)]">Supabase PostgreSQL</span></div>
              <div className="flex justify-between items-center"><span className="text-[var(--text-secondary)]">Accessibility</span><span className="font-medium text-emerald-600 dark:text-emerald-400">WCAG 2.2 AA</span></div>
            </div>
          </section>

          <section className="linkhunt-card p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">Interactive Demos</h3>
            <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">Client-side state transitions and live edge telemetry.</p>
            <div className="flex flex-col gap-2">
              <Link href="/lab/canvas" className="w-full text-center py-2 px-3 rounded-lg bg-[var(--surface-secondary)] text-xs font-medium hover:border-[var(--border-highlight)] border border-[var(--border-structural)] transition-colors min-h-[44px] inline-flex items-center justify-center">
                Component Canvas &rarr;
              </Link>
              <Link href="/lab/telemetry" className="w-full text-center py-2 px-3 rounded-lg bg-[var(--surface-secondary)] text-xs font-medium hover:border-[var(--border-highlight)] border border-[var(--border-structural)] transition-colors min-h-[44px] inline-flex items-center justify-center">
                24-Hour Telemetry &rarr;
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}