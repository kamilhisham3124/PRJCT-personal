import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PhosphorArrowRight, PhosphorShieldCheck } from "../icons";
import { TechBadge } from "../shared/TechBadge";
import type { CaseStudyItem } from "./ProjectCatalog";
import { formatMonthYear } from "../../lib/utils/formatDate";
import {
  CASE_STUDY_IMAGES,
  getCaseStudyCategory,
} from "../../lib/utils/caseStudyMeta";

export function ProjectListCard({ study }: { study: CaseStudyItem }) {
  const categoryLabel = getCaseStudyCategory(study.slug);
  const formattedDate = formatMonthYear(study.published_at);

  return (
    <article className="p-3.5 sm:p-5 flex flex-col gap-3 hover:bg-surface-secondary transition-colors min-w-0">
      <div className="flex items-start gap-3 sm:gap-4 min-w-0">
        <Link
          href={`/work/${study.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative w-16 h-16 sm:w-36 sm:h-24 rounded-lg overflow-hidden border border-border-structural bg-surface-terminal shrink-0 block"
        >
          <Image
            src={CASE_STUDY_IMAGES[study.slug] || "/images/case-study-task-management.jpg"}
            alt={study.title}
            fill
            sizes="(max-width: 640px) 64px, 144px"
            className="object-cover"
          />
        </Link>

        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-border-structural">
            <span className="text-[11px] font-mono text-fg-accent font-medium">
              {categoryLabel}
            </span>
            {study.topCommit?.verified && (
              <span className="inline-flex items-center gap-1 bg-status-success-bg text-status-success-fg border border-status-success-border rounded-md px-2 py-0.5 text-[10px] font-mono whitespace-nowrap shrink-0">
                <PhosphorShieldCheck className="w-3 h-3 shrink-0" />
                Verified
              </span>
            )}
          </div>
          <Link
            href={`/work/${study.slug}`}
            className="text-sm sm:text-base font-semibold text-text-primary hover:text-fg-accent hover:underline transition-colors leading-snug"
          >
            {study.title}
          </Link>
          <p className="hidden sm:block text-xs text-text-secondary leading-relaxed line-clamp-2">
            {study.summary}
          </p>
        </div>
      </div>

      <p className="sm:hidden text-xs text-text-secondary leading-relaxed line-clamp-2 min-w-0">
        {study.summary}
      </p>

      <div className="flex flex-wrap gap-1 min-w-0">
        {study.tech_stack.map((t) => (
          <TechBadge key={t} name={t} size="sm" />
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-border-structural text-xs">
        <span className="text-[11px] font-mono text-text-muted whitespace-nowrap shrink-0">
          {formattedDate}
        </span>
        <Link
          href={`/work/${study.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-fg-accent hover:underline min-h-[44px] whitespace-nowrap shrink-0"
        >
          <span>View Case Study</span>
          <PhosphorArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
