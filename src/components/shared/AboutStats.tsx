import React from "react";

const STATS = [
  { value: "3NF", label: "Relational Schema", sub: "Strict PostgreSQL normalization" },
  { value: "12", label: "REST Endpoints", sub: "Validated API contract suite" },
  { value: "8.0/10", label: "Engineering CGPA", sub: "B.E. Computer Science (2025)" },
  { value: "100%", label: "WCAG 2.2 AA", sub: "Full keyboard & reader support" },
];

export function AboutStats() {
  return (
    <section aria-label="Key Engineering Metrics" className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="linkhunt-card p-3 sm:p-4 flex flex-col gap-1 text-center sm:text-left"
        >
          <span className="text-lg sm:text-2xl font-bold font-mono tracking-tight text-[var(--text-primary)]">
            {stat.value}
          </span>
          <span className="text-xs font-semibold text-[var(--text-primary)] leading-snug">
            {stat.label}
          </span>
          <span className="text-[11px] text-[var(--text-secondary)] leading-tight">
            {stat.sub}
          </span>
        </div>
      ))}
    </section>
  );
}
