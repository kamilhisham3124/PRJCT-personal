import React from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

const INSIGHTS = [
  {
    title: "Designing Deterministic REST APIs with Django",
    date: "Feb 2026",
    readingTime: "5 min read",
    excerpt: "Structuring schema validation, standardized error envelopes, and idempotent handlers for backend reliability.",
    href: "https://github.com/kamilhisham3124/PRJCT-personal",
  },
  {
    title: "Zero-Dependency Next.js RSC Architecture",
    date: "Jan 2026",
    readingTime: "4 min read",
    excerpt: "Reducing client bundle footprint and eliminating fragile npm abstractions with native web standards and React Server Components.",
    href: "https://github.com/kamilhisham3124/PRJCT-personal",
  },
  {
    title: "Relational Integrity & Normalization in PostgreSQL",
    date: "Nov 2025",
    readingTime: "6 min read",
    excerpt: "Preventing silent data corruption through strict 3NF models, cascading foreign keys, and ACID transaction boundaries.",
    href: "https://github.com/kamilhisham3124/PRJCT-personal",
  },
];

export function WritingSection() {
  return (
    <section aria-label="Technical Writing and Insights" className="flex flex-col gap-5">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-structural)]">
        <div>
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Technical Writing &amp; Notes</h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">Architectural deep dives on backend engineering and systems.</p>
        </div>
        <BookOpen className="w-4 h-4 text-[var(--text-secondary)]" />
      </div>

      <div className="flex flex-col gap-3">
        {INSIGHTS.map((item) => (
          <article
            key={item.title}
            className="linkhunt-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-card-hover transition-all"
          >
            <div className="flex flex-col gap-1 max-w-xl">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-secondary)]">
                <span>{item.date}</span>
                <span>&bull;</span>
                <span>{item.readingTime}</span>
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] hover:underline">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {item.excerpt}
              </p>
            </div>

            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-primary)] hover:underline shrink-0 min-h-[44px]"
            >
              <span>Read Architecture Note</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
