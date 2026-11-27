import React from "react";
import type { CaseStudyContent } from "../../lib/validators/contentValidator";
import { PhosphorLightning } from "../icons";

export function ExecutiveBriefCard({ study }: { study: CaseStudyContent }) {
  const topMetric = study.verifiable_metrics?.[0];

  return (
    <section
      aria-label="Executive Brief"
      className="linkhunt-card p-4 sm:p-5 bg-surface-secondary border border-border-structural rounded-xl my-4"
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-structural">
        <div className="flex items-center gap-2">
          <PhosphorLightning className="w-4 h-4 text-fg-accent shrink-0" />
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-primary">
            Executive Brief &bull; 30-Second Summary
          </h2>
        </div>
        <span className="text-[11px] font-mono text-fg-accent font-medium">Recruiter Overview</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {study.problem_statement && (
          <div className="flex flex-col gap-1">
            <span className="font-mono font-medium text-[var(--text-secondary)] uppercase text-[10px]">
              Constraint &amp; Problem
            </span>
            <p className="text-[var(--text-primary)] leading-relaxed">
              {study.problem_statement}
            </p>
          </div>
        )}

        {study.architecture_overview && (
          <div className="flex flex-col gap-1">
            <span className="font-mono font-medium text-[var(--text-secondary)] uppercase text-[10px]">
              Engineered Solution
            </span>
            <p className="text-[var(--text-primary)] leading-relaxed">
              {study.architecture_overview}
            </p>
          </div>
        )}

        {topMetric && (
          <div className="flex flex-col gap-1 md:col-span-2 pt-2 border-t border-[var(--border-structural)]">
            <span className="font-mono font-medium text-[var(--text-secondary)] uppercase text-[10px]">
              Primary Verifiable Outcome
            </span>
            <p className="font-mono font-semibold text-[var(--text-primary)]">
              {topMetric.value} ({topMetric.metric})
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
