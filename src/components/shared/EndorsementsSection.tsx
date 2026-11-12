import React from "react";
import { Quote } from "lucide-react";

const ENDORSEMENTS = [
  {
    quote: "Kamil demonstrates rare technical discipline in schema design and API contracts. His migrations are deterministic, and his PRs are always backed by thorough verification.",
    author: "Senior Engineering Mentor",
    role: "Technical Lead",
    organization: "Clovion Tech Solutions",
  },
  {
    quote: "Exceptional attention to edge cases and system reliability. When building REST endpoints, he designs for idempotency and predictable error states from day one.",
    author: "Academic Systems Evaluator",
    role: "Department of Computer Science",
    organization: "PET Engineering College",
  },
];

export function EndorsementsSection() {
  return (
    <section aria-label="Peer Endorsements" className="flex flex-col gap-5">
      <div className="pb-2 border-b border-[var(--border-structural)]">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">Peer Endorsements</h2>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">Third-party perspective on technical rigor and engineering execution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ENDORSEMENTS.map((item, idx) => (
          <blockquote
            key={idx}
            className="linkhunt-card p-5 sm:p-6 flex flex-col justify-between hover:shadow-card-hover transition-all"
          >
            <div>
              <Quote className="w-5 h-5 text-[var(--text-muted)] mb-3 opacity-60" />
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>
            <footer className="pt-4 border-t border-[var(--border-structural)] mt-4">
              <cite className="not-italic">
                <span className="text-xs font-semibold text-[var(--text-primary)] block">
                  {item.author}
                </span>
                <span className="text-[11px] font-mono text-[var(--text-secondary)] block">
                  {item.role} &bull; {item.organization}
                </span>
              </cite>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
