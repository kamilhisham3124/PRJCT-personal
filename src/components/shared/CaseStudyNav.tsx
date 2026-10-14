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
      className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 p-1.5 rounded-full inline-flex flex-wrap items-center gap-1 shadow-sm w-fit max-w-full"
    >
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1">
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
                ? "bg-[#635BFF] text-white shadow-stripe-btn"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
