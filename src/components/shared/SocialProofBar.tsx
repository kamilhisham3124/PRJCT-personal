import React from "react";
import { TechBadge } from "./TechBadge";

const TECH_ECOSYSTEM = [
  "Python",
  "Django REST",
  "PostgreSQL",
  "Next.js 15",
  "TypeScript",
  "Docker",
  "Redis",
  "Supabase",
];

export function SocialProofBar() {
  return (
    <section aria-label="Core Technologies" className="py-2.5 border-y border-border-structural">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-text-secondary shrink-0 select-none">
          Core Technologies
        </span>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {TECH_ECOSYSTEM.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
