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
      className="border-structural bg-surface-secondary p-3 flex flex-wrap gap-2 text-xs font-mono"
    >
      <span className="text-text-secondary uppercase self-center mr-2">
        Index:
      </span>
      {items.map((item) => {
        const isCurrent = currentPath === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            aria-current={isCurrent ? "page" : undefined}
            className={`px-2.5 py-1 border-structural transition-colors ${
              isCurrent
                ? "bg-text-primary text-surface-primary font-bold"
                : "bg-surface-primary text-text-primary hover:bg-surface-secondary"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
