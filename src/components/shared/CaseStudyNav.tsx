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
      className="border-element bg-surface-secondary p-3 flex flex-wrap gap-2 text-xs font-mono"
    >
      <span className="text-accent-chemical uppercase self-center mr-2 font-bold">
        INDEX //
      </span>
      {items.map((item) => {
        const isCurrent = currentPath === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            aria-current={isCurrent ? "page" : undefined}
            className={`px-2.5 py-1 border transition-colors ${
              isCurrent
                ? "border-element bg-accent-element text-text-primary font-bold"
                : "border-structural bg-surface-primary text-text-secondary hover:text-text-primary hover:border-element"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
