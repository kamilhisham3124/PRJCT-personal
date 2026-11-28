"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PhosphorArrowRight, PhosphorSquaresFour, PhosphorList } from "../icons";
import { TechBadge } from "../shared/TechBadge";
import type { GitHubCommitItem } from "../../lib/validators/githubValidator";
import { ProjectGridCard } from "./ProjectGridCard";
import { formatMonthYear } from "../../lib/utils/formatDate";

export interface CaseStudyItem {
  slug: string;
  title: string;
  summary: string;
  tech_stack: string[];
  published_at: string;
  topCommit?: GitHubCommitItem | null;
}

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "backend", label: "Backend & Systems" },
  { id: "fullstack", label: "Full-Stack Web" },
] as const;

export function ProjectCatalog({ caseStudies }: { caseStudies: CaseStudyItem[] }) {
  const [activeCat, setActiveCat] = useState<"all" | "backend" | "fullstack">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return caseStudies.filter((study) => {
      if (activeCat === "backend") return study.slug === "employee-task-management";
      if (activeCat === "fullstack") return study.slug === "gift-delivery-ecommerce";
      return true;
    });
  }, [caseStudies, activeCat]);

  return (
    <div className="flex flex-col gap-6">
      {/* Curated Category Pills & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-structural)]">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter case studies by category">
          {CATEGORIES.map((cat) => {
            const isActive = activeCat === cat.id;
            const count = cat.id === "all" ? caseStudies.length : 1;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCat(cat.id)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium min-h-[44px] transition-colors ${
                  isActive
                    ? "bg-accent-primary text-fg-on-emphasis border border-transparent font-semibold shadow-card"
                    : "bg-control-rest text-text-secondary hover:text-text-primary border border-border-structural"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${isActive ? "bg-surface-elevated text-fg-accent font-semibold" : "bg-surface-primary text-text-muted"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center self-end sm:self-auto rounded-lg border border-border-structural bg-surface-secondary p-0.5 shrink-0" role="group" aria-label="Layout switcher">
          <button type="button" onClick={() => setViewMode("grid")} aria-label="Grid layout" aria-pressed={viewMode === "grid"} className={`p-2.5 rounded min-h-[44px] min-w-[44px] inline-flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-surface-elevated text-fg-accent border border-accent-border shadow-card" : "text-text-secondary hover:text-text-primary border border-transparent"}`}>
            <PhosphorSquaresFour className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setViewMode("list")} aria-label="List layout" aria-pressed={viewMode === "list"} className={`p-2.5 rounded min-h-[44px] min-w-[44px] inline-flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-surface-elevated text-fg-accent border border-accent-border shadow-card" : "text-text-secondary hover:text-text-primary border border-transparent"}`}>
            <PhosphorList className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((study) => (<ProjectGridCard key={study.slug} study={study} />))}
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-border-structural border border-border-structural rounded-lg bg-surface-elevated overflow-hidden shadow-card">
          {filtered.map((study) => (
            <article key={study.slug} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-secondary transition-colors">
              <div className="flex flex-col gap-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <Link href={`/work/${study.slug}`} className="text-sm font-semibold text-text-primary hover:text-fg-accent hover:underline transition-colors">{study.title}</Link>
                  <span className="text-[11px] font-mono text-text-muted whitespace-nowrap">({formatMonthYear(study.published_at)})</span>
                </div>
                <p className="text-xs text-text-secondary line-clamp-2">{study.summary}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {study.tech_stack.map((t) => (<TechBadge key={t} name={t} size="sm" />))}
                </div>
              </div>
              <Link href={`/work/${study.slug}`} className="inline-flex items-center justify-center gap-1 text-xs font-semibold linkhunt-btn-primary px-3 py-1.5 shrink-0 min-h-[44px] w-full sm:w-auto">
                <span>View Project</span><PhosphorArrowRight className="w-3.5 h-3.5" />
              </Link>
            </article>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-[var(--border-structural)] text-xs font-mono text-[var(--text-secondary)]">
        <span>Showing {filtered.length} of {caseStudies.length} projects</span>
        <div className="flex items-center gap-1">
          <span className="px-2 py-1 rounded bg-[var(--surface-secondary)] border border-[var(--border-structural)] text-[var(--text-primary)] font-semibold">1</span>
          <span>of 1</span>
        </div>
      </div>
    </div>
  );
}
