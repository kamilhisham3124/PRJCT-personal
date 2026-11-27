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
      role="region"
      tabIndex={0}
      aria-label="Case studies navigation index"
      className="bg-[var(--surface-secondary)] border border-[var(--border-structural)] p-1 rounded-lg flex items-center gap-1 w-full overflow-x-auto scroll-smooth focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus:outline-none"
    >
      <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-[var(--text-secondary)] px-2.5 py-1 shrink-0">
        Index:
      </span>
      {items.map((item) => {
        const isCurrent = currentPath === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            aria-current={isCurrent ? "page" : undefined}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors min-h-[44px] inline-flex items-center shrink-0 ${
              isCurrent
                ? "bg-surface-elevated text-fg-accent border border-accent-border shadow-card font-semibold"
                : "text-text-secondary hover:text-text-primary border border-transparent"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
