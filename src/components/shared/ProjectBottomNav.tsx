import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageSquare } from "lucide-react";

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
      className="mt-8 pt-6 border-t border-[var(--border-structural)] flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {prevProject ? (
          <Link
            href={`/work/${prevProject.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-[var(--border-structural)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="truncate max-w-[140px] sm:max-w-[180px]">{prevProject.title}</span>
          </Link>
        ) : (
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-[var(--border-structural)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Case Studies</span>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-[var(--border-structural)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-colors min-h-[44px]"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Discuss Project</span>
        </Link>
        {nextProject && (
          <Link
            href={`/work/${nextProject.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold linkhunt-btn-primary min-h-[44px]"
          >
            <span>Next: {nextProject.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </nav>
  );
}

