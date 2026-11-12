import React from "react";
import type { ExperienceEntry } from "../../lib/validators/contentValidator";

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-[var(--text-primary)] pb-2 border-b border-[var(--border-structural)]">
        Work Experience
      </h2>
      <div className="relative border-l border-[var(--border-structural)] ml-3 pl-6 space-y-8">
        {entries.map((exp, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--text-primary)] ring-4 ring-[var(--surface-primary)]" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {exp.role} <span className="text-[var(--text-secondary)] font-normal">@ {exp.organization}</span>
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)] w-fit">
                {exp.start_date} - {exp.end_date || "Present"}
              </span>
            </div>
            <ul className="space-y-1.5 text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              {exp.summary.split(". ").filter(Boolean).map((clause, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2">
                  <span className="text-[var(--text-primary)] font-bold select-none">&bull;</span>
                  <span>{clause.endsWith(".") ? clause : `${clause}.`}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
