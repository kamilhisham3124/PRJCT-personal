import React from "react";

const STATS = [
  { value: "100%", label: "WCAG 2.2 AA", sub: "Accessibility conformance" },
  { value: "10+", label: "SQL Tables", sub: "Strict 3NF normalization" },
  { value: "50+", label: "Endpoints", sub: "Deterministic REST contracts" },
  { value: "0", label: "Bloated Deps", sub: "Lean, verifiable codebases" },
];

export function AboutStats() {
  return (
    <section aria-label="Key Engineering Metrics" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="linkhunt-card p-4 flex flex-col gap-1 text-center sm:text-left"
        >
          <span className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)]">
            {stat.value}
          </span>
          <span className="text-xs font-semibold text-[var(--text-primary)]">
            {stat.label}
          </span>
          <span className="text-[11px] text-[var(--text-secondary)]">
            {stat.sub}
          </span>
        </div>
      ))}
    </section>
  );
}
