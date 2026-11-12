import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-1">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-[var(--border-highlight)]" aria-hidden="true" />}
              {isLast || !item.href ? (
                <span className="font-semibold text-[var(--text-primary)]" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-[var(--text-primary)] transition-colors hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
