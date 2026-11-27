import React from "react";
import Link from "next/link";

export interface CaseStudyNavItem {
  path: string;
  label: string;
}

export interface CaseStudyNavProps {
  items: CaseStudyNavItem[];
  currentPath: string;
}

export function CaseStudyNav({ items, currentPath }: CaseStudyNavProps) {
  return (
    <nav
      aria-label="Case studies navigation index"
      className="bg-[var(--surface-secondary)] border border-[var(--border-structural)] p-1.5 md:p-1 rounded-lg flex flex-col md:flex-row md:flex-wrap md:items-center gap-1 w-full"
    >
      <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-[var(--text-secondary)] px-2.5 pt-1 pb-0.5 md:py-1 shrink-0">
        Index:
      </span>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-1 w-full md:w-auto min-w-0">
        {items.map((item) => {
          const isCurrent = currentPath === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              aria-current={isCurrent ? "page" : undefined}
              className={`px-3 py-2 md:py-1.5 rounded-md text-xs font-medium transition-colors min-h-[44px] w-full md:w-auto inline-flex items-center whitespace-normal leading-snug ${
                isCurrent
                  ? "bg-surface-elevated text-fg-accent border border-accent-border shadow-card font-semibold"
                  : "text-text-secondary hover:text-text-primary border border-transparent"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
