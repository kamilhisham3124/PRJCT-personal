"use client";

import React, { useState, useMemo } from "react";
import { PhosphorSquaresFour, PhosphorList } from "../icons";
import type { GitHubCommitItem } from "../../lib/validators/githubValidator";
import { ProjectGridCard } from "./ProjectGridCard";
import { ProjectListCard } from "./ProjectListCard";

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

const PAGE_SIZE = 10;

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

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const activeFilterLabel =
    activeCat === "backend"
      ? "Backend"
      : activeCat === "fullstack"
        ? "Full-Stack"
        : null;
  const countCopy = activeFilterLabel
    ? `${filtered.length} ${filtered.length === 1 ? "project" : "projects"} (filter: ${activeFilterLabel})`
    : `${filtered.length} ${filtered.length === 1 ? "project" : "projects"}`;

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-3 pb-3 border-b border-[var(--border-structural)]">
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

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border-muted">
          <span className="text-xs font-medium text-text-secondary min-w-0">
            {countCopy}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-text-muted hidden sm:inline">View:</span>
            <div className="flex items-center rounded-lg border border-border-structural bg-surface-secondary p-0.5 shrink-0" role="group" aria-label="Layout switcher">
              <button type="button" onClick={() => setViewMode("grid")} aria-label="Grid layout" aria-pressed={viewMode === "grid"} className={`p-2.5 rounded min-h-[44px] min-w-[44px] inline-flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-surface-elevated text-fg-accent border border-accent-border shadow-card" : "text-text-secondary hover:text-text-primary border border-transparent"}`}>
                <PhosphorSquaresFour className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => setViewMode("list")} aria-label="List layout" aria-pressed={viewMode === "list"} className={`p-2.5 rounded min-h-[44px] min-w-[44px] inline-flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-surface-elevated text-fg-accent border border-accent-border shadow-card" : "text-text-secondary hover:text-text-primary border border-transparent"}`}>
                <PhosphorList className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((study) => (<ProjectGridCard key={study.slug} study={study} />))}
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-border-structural border border-border-structural rounded-lg bg-surface-elevated overflow-hidden shadow-card">
          {filtered.map((study) => (<ProjectListCard key={study.slug} study={study} />))}
        </div>
      )}

      {pageCount > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-[var(--border-structural)] text-xs font-mono text-[var(--text-secondary)]">
          <span>{countCopy}</span>
          <div className="flex items-center gap-1">
            <span className="px-2 py-1 rounded bg-[var(--surface-secondary)] border border-[var(--border-structural)] text-[var(--text-primary)] font-semibold">1</span>
            <span>of {pageCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
