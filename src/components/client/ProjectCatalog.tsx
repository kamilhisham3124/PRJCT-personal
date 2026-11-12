"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, LayoutGrid, List } from "lucide-react";
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

export function ProjectCatalog({ caseStudies }: { caseStudies: CaseStudyItem[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return caseStudies.filter((study) => {
      const matchCat =
        activeCategory === "all" ||
        (activeCategory === "backend" && study.slug === "employee-task-management") ||
        (activeCategory === "fullstack" && study.slug === "gift-delivery-ecommerce");
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        study.title.toLowerCase().includes(q) ||
        study.summary.toLowerCase().includes(q) ||
        study.tech_stack.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [caseStudies, activeCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-6">
      {/* Filtering, Search & View Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-structural)]">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-secondary)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or technologies..."
            aria-label="Filter case studies by keyword"
            className="w-full bg-[var(--surface-primary)] border border-[var(--border-structural)] rounded-lg pl-9 pr-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--border-highlight)] transition-colors min-h-[44px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            aria-label="Filter by project category"
            className="bg-[var(--surface-primary)] border border-[var(--border-structural)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)] min-h-[44px]"
          >
            <option value="all">All Categories</option>
            <option value="backend">Backend &amp; Systems</option>
            <option value="fullstack">Full-Stack Web</option>
          </select>

          {/* Content Switcher (Grid vs List) */}
          <div className="flex items-center rounded-lg border border-[var(--border-structural)] bg-[var(--surface-secondary)] p-0.5" role="group" aria-label="Layout switcher">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view layout"
              aria-pressed={viewMode === "grid"}
              className={`p-2 rounded min-h-[40px] min-w-[40px] inline-flex items-center justify-center transition-colors ${
                viewMode === "grid" ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="List view layout"
              aria-pressed={viewMode === "list"}
              className={`p-2 rounded min-h-[40px] min-w-[40px] inline-flex items-center justify-center transition-colors ${
                viewMode === "list" ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-[var(--text-secondary)] py-8 text-center linkhunt-card">
          No projects matched &ldquo;{searchQuery}&rdquo;. Try another search term.
        </p>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((study) => (
            <ProjectGridCard key={study.slug} study={study} />
          ))}
        </div>
      ) : (
        /* Structural Multi-Column List View */
        <div className="flex flex-col divide-y divide-[var(--border-structural)] border border-[var(--border-structural)] rounded-lg bg-[var(--surface-elevated)] overflow-hidden">
          {filtered.map((study) => (
            <article key={study.slug} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--surface-secondary)]/50 transition-colors">
              <div className="flex flex-col gap-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <Link href={`/work/${study.slug}`} className="text-sm font-semibold text-[var(--text-primary)] hover:underline">{study.title}</Link>
                  <span className="text-[11px] font-mono text-[var(--text-secondary)]">({study.published_at})</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{study.summary}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {study.tech_stack.map((t) => (<span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-secondary)]">{t}</span>))}
                </div>
              </div>
              <Link href={`/work/${study.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold linkhunt-btn-primary px-3 py-1.5 shrink-0 min-h-[44px]">
                <span>Inspect</span><ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </article>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-structural)] text-xs font-mono text-[var(--text-secondary)]">
        <span>Showing {filtered.length} of {caseStudies.length} projects</span>
        <div className="flex items-center gap-1">
          <span className="px-2 py-1 rounded bg-[var(--surface-secondary)] border border-[var(--border-structural)] text-[var(--text-primary)] font-semibold">1</span>
          <span>of 1</span>
        </div>
      </div>
    </div>
  );
}
