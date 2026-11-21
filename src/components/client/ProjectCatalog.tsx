"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PhosphorArrowRight, PhosphorSquaresFour, PhosphorList } from "../icons";
import type { GitHubCommitItem } from "../../lib/validators/githubValidator";
import { ProjectGridCard } from "./ProjectGridCard";

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
                  isActive ? "bg-[var(--text-primary)] text-[var(--surface-primary)] font-semibold shadow-sm" : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-structural)]"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${isActive ? "bg-[var(--surface-primary)]/20 text-[var(--surface-primary)]" : "bg-[var(--surface-primary)] text-[var(--text-secondary)]"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center self-end sm:self-auto rounded-lg border border-[var(--border-structural)] bg-[var(--surface-secondary)] p-0.5 shrink-0" role="group" aria-label="Layout switcher">
          <button type="button" onClick={() => setViewMode("grid")} aria-label="Grid layout" aria-pressed={viewMode === "grid"} className={`p-2.5 rounded min-h-[44px] min-w-[44px] inline-flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
            <PhosphorSquaresFour className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => setViewMode("list")} aria-label="List layout" aria-pressed={viewMode === "list"} className={`p-2.5 rounded min-h-[44px] min-w-[44px] inline-flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
            <PhosphorList className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((study) => (<ProjectGridCard key={study.slug} study={study} />))}
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-[var(--border-structural)] border border-[var(--border-structural)] rounded-lg bg-[var(--surface-elevated)] overflow-hidden">
          {filtered.map((study) => (
            <article key={study.slug} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--surface-secondary)]/50 transition-colors">
              <div className="flex flex-col gap-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <Link href={`/work/${study.slug}`} className="text-sm font-semibold text-[var(--text-primary)] hover:underline">{study.title}</Link>
                  <span className="text-[11px] font-mono text-[var(--text-secondary)]">({study.slug === "employee-task-management" ? "Feb 2026" : "May 2025"})</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{study.summary}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {study.tech_stack.map((t) => (<span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-secondary)]">{t}</span>))}
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
