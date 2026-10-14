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
      className="bg-white/90 dark:bg-sky-950/70 backdrop-blur-md border border-sky-200/80 dark:border-sky-800/80 p-1.5 rounded-full inline-flex flex-wrap items-center gap-1 shadow-aero-card w-fit max-w-full"
    >
      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600/70 dark:text-sky-400/80 px-3 py-1">
        Index:
      </span>
      {items.map((item) => {
        const isCurrent = currentPath === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            aria-current={isCurrent ? "page" : undefined}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              isCurrent
                ? "bg-gradient-to-b from-sky-400 to-sky-600 text-white shadow-aero-btn border border-sky-300/40"
                : "text-slate-600 dark:text-sky-200 hover:text-sky-900 dark:hover:text-white hover:bg-sky-100/60 dark:hover:bg-sky-900/40"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
