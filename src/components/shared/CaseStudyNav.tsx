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
      className="bg-[var(--surface-secondary)] border border-[var(--border-structural)] p-1 rounded-lg flex items-center gap-1 w-full overflow-x-auto scroll-smooth"
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
