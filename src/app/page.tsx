import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TelemetryWidget } from "../components/server/TelemetryWidget";
import { getAllCaseStudies } from "../content";
import { PhosphorArrowRight, PhosphorMapPin } from "../components/icons";
import { Hero3DCanvas } from "../components/client/Hero3DCanvas";
import { SocialProofBar } from "../components/shared/SocialProofBar";
import { TechBadge } from "../components/shared/TechBadge";
import { SubstrateCard } from "../components/shared/SubstrateCard";
import { WritingSection } from "../components/shared/WritingSection";
import { formatMonthYear } from "../lib/utils/formatDate";
import {
  CASE_STUDY_IMAGES,
  getCaseStudyCategory,
} from "../lib/utils/caseStudyMeta";

export const dynamic = "force-static";

export default function HomePage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="flex flex-col gap-5 sm:gap-9 min-w-0">
      {/* Identity & Profile Hero */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pb-4 sm:pb-7 border-b border-border-structural min-w-0">
        <div className="flex flex-col gap-3.5 max-w-xl border-l-2 border-accent-primary pl-4 sm:pl-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-status-success-bg text-status-success-fg border border-status-success-border">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
              <span>Available for full-time engineering roles</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-text-secondary">
              <PhosphorMapPin className="w-3.5 h-3.5 text-fg-accent" />
              <span>India / Remote</span>
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent-border shrink-0 shadow-sm">
              <Image src="/images/avatar.jpg" alt="Kamil Hisham" width={48} height={48} loading="eager" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-fg-accent block">Hi, I&apos;m</span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                Kamil Hisham
              </h1>
            </div>
          </div>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Software engineer specializing in Python, Django REST Framework, and PostgreSQL.
            I design normalized schemas, build deterministic APIs, and engineer dependable full-stack web applications with Next.js.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link href="/work" className="px-5 py-2.5 rounded-lg text-xs linkhunt-btn-primary gap-2">
              <span>Explore Case Studies</span>
              <PhosphorArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/lab" className="px-5 py-2.5 rounded-lg text-xs font-semibold linkhunt-btn-secondary">
              Interactive Systems Lab
            </Link>
          </div>
        </div>

        <div className="self-center sm:self-auto shrink-0">
          <Hero3DCanvas />
        </div>
      </section>

      {/* Social Proof Bar */}
      <SocialProofBar />

      {/* Main Grid: Case Studies (Left) + Substrate & Telemetry (Right) */}
      <div id="case-studies" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start min-w-0">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-2 border-b border-border-structural">
            <h2 className="text-base font-semibold text-text-primary">Featured Case Studies</h2>
            <span className="text-xs font-mono text-text-muted">2 Projects</span>
          </div>

          <div className="flex flex-col gap-4">
            {caseStudies.length === 0 && (
              <p className="text-sm text-text-secondary py-6">No production case studies available.</p>
            )}
            {caseStudies.map((study, idx) => (
              <article key={study.slug} className="group linkhunt-card p-4 sm:p-6 flex flex-col gap-3">
                <Link
                  href={`/work/${study.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative w-full h-36 rounded-lg overflow-hidden border border-border-structural bg-surface-terminal block"
                >
                  <Image
                    src={CASE_STUDY_IMAGES[study.slug] || "/images/case-study-task-management.jpg"}
                    alt={study.title} fill sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                  <Link href={`/work/${study.slug}`} className="text-base sm:text-lg font-semibold text-text-primary group-hover:text-fg-accent hover:underline transition-colors">
                    0{idx + 1}. {study.title}
                  </Link>
                  <span className="text-[11px] font-mono text-text-muted shrink-0">
                    {formatMonthYear(study.published_at)}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{study.summary}</p>
                <div className="flex flex-wrap gap-1.5">
                  {study.tech_stack.map((t) => (<TechBadge key={t} name={t} />))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-2 pt-2.5 border-t border-border-structural text-xs">
                  <span className="text-[11px] font-mono text-fg-accent font-medium">
                    {getCaseStudyCategory(study.slug)}
                  </span>
                  <Link href={`/work/${study.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-fg-accent hover:underline min-h-[44px] whitespace-nowrap shrink-0">
                    <span>View Project</span>
                    <PhosphorArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Rail: Telemetry & Platform Specs */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <TelemetryWidget compact />
          <SubstrateCard />
        </aside>
      </div>

      {/* Technical Writing & Insights */}
      <WritingSection />
    </div>
  );
}
