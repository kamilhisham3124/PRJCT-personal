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

export function ProjectGridCard({ study }: { study: CaseStudyItem }) {
  const categoryLabel = getCaseStudyCategory(study.slug);
  const formattedDate = formatMonthYear(study.published_at);

  return (
    <article className="group linkhunt-card p-5 sm:p-6 flex flex-col justify-between hover:shadow-card-hover transition-all">
      <div>
        <Link
          href={`/work/${study.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative w-full h-44 rounded-lg overflow-hidden border border-border-structural mb-4 bg-surface-terminal block"
        >
          <Image
            src={CASE_STUDY_IMAGES[study.slug] || "/images/case-study-task-management.jpg"}
            alt={study.title}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-border-structural">
          <span className="text-[11px] font-mono text-fg-accent font-medium">{categoryLabel}</span>
          {study.topCommit?.verified && (
            <span className="inline-flex items-center gap-1 bg-status-success-bg text-status-success-fg border border-status-success-border rounded-md px-2 py-0.5 text-[10px] font-mono">
              <PhosphorShieldCheck className="w-3 h-3" />Verified
            </span>
          )}
        </div>
        <h2 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-fg-accent group-hover:underline transition-colors">
          <Link href={`/work/${study.slug}`}>{study.title}</Link>
        </h2>
        <p className="text-sm text-text-secondary mb-4 leading-relaxed line-clamp-2">{study.summary}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {study.tech_stack.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-border-structural text-xs">
        <span className="text-text-muted font-mono text-[11px] whitespace-nowrap shrink-0">{formattedDate}</span>
        <Link href={`/work/${study.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-fg-accent hover:underline min-h-[44px] whitespace-nowrap shrink-0">
          <span>View Case Study</span>
          <PhosphorArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
