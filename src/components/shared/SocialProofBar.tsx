import React from "react";

const TECH_ECOSYSTEM = [
  { name: "Python", category: "Language" },
  { name: "Django REST", category: "Framework" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Next.js 15", category: "Frontend / RSC" },
  { name: "TypeScript", category: "Language" },
  { name: "Docker", category: "Containers" },
  { name: "Redis", category: "Cache / Queue" },
  { name: "Supabase", category: "Storage & Auth" },
];

export function SocialProofBar() {
  return (
    <section aria-label="Core Technical Substrate" className="py-2 border-y border-[var(--border-structural)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] shrink-0">
          Core Technical Substrate
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {TECH_ECOSYSTEM.map((tech) => (
            <span
              key={tech.name}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)] transition-colors hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)]"
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
