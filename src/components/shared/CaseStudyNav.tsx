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
      role="navigation"
      aria-label="Case studies index"
      className="bg-[var(--surface-secondary)] border border-[var(--border-structural)] p-1 rounded-lg inline-flex flex-wrap items-center gap-1 w-fit max-w-full"
    >
      <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-[var(--text-secondary)] px-2.5 py-1">
        Index:
      </span>
      {items.map((item) => {
        const isCurrent = currentPath === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            aria-current={isCurrent ? "page" : undefined}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors min-h-[36px] inline-flex items-center ${
              isCurrent
                ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-card font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
