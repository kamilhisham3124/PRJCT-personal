import React from "react";
import Link from "next/link";
import { PhosphorArrowLeft, PhosphorArrowRight, PhosphorChatDots } from "../icons";

export interface ProjectNavTarget {
  slug: string;
  title: string;
}

export interface ProjectBottomNavProps {
  prevProject?: ProjectNavTarget | null;
  nextProject?: ProjectNavTarget | null;
}

export function ProjectBottomNav({ prevProject, nextProject }: ProjectBottomNavProps) {
  return (
    <nav
      role="navigation"
      aria-label="Case study page progression"
      className="mt-8 pt-6 border-t border-[var(--border-structural)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full"
    >
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {prevProject ? (
          <Link
            href={`/work/${prevProject.slug}`}
            className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-control-border bg-control-rest text-text-secondary hover:text-fg-accent hover:border-border-highlight hover:bg-control-hover transition-colors min-h-[44px] w-full sm:w-auto"
          >
            <PhosphorArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate max-w-[140px] sm:max-w-[180px]">{prevProject.title}</span>
          </Link>
        ) : (
          <Link
            href="/work"
            className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-control-border bg-control-rest text-text-secondary hover:text-fg-accent hover:border-border-highlight hover:bg-control-hover transition-colors min-h-[44px] w-full sm:w-auto"
          >
            <PhosphorArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span>All Case Studies</span>
          </Link>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto justify-end">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-control-border bg-control-rest text-text-secondary hover:text-fg-accent hover:border-border-highlight hover:bg-control-hover transition-colors min-h-[44px] w-full sm:w-auto"
        >
          <PhosphorChatDots className="w-3.5 h-3.5 shrink-0" />
          <span>Discuss Project</span>
        </Link>
        {nextProject && (
          <Link
            href={`/work/${nextProject.slug}`}
            className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold linkhunt-btn-primary min-h-[44px] w-full sm:w-auto"
          >
            <span className="truncate max-w-[140px] sm:max-w-[180px]">Next: {nextProject.title}</span>
            <PhosphorArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        )}
      </div>
    </nav>
  );
}

