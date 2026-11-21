import React from "react";
import {
  PhosphorShieldCheck,
  PhosphorEnvelopeSimple,
  PhosphorArrowUpRight,
} from "../icons";

export function EndorsementsSection() {
  return (
    <section aria-label="Professional References and Verification" className="flex flex-col gap-4">
      <div className="pb-2 border-b border-[var(--border-structural)]">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">
          Engineering References &amp; Verification
        </h2>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
          Professional supervision and academic verification available upon request for hiring diligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="linkhunt-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PhosphorShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                Industry Supervision
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
              Direct technical references from engineering leads at Clovion Tech Solutions Pvt. Ltd. confirming REST API delivery, PostgreSQL schema design, and Git collaboration are available.
            </p>
          </div>
          <div className="pt-3 border-t border-[var(--border-structural)]">
            <span className="text-[11px] font-mono text-[var(--text-secondary)]">
              Clovion Tech Solutions &bull; Nagercoil, India
            </span>
          </div>
        </div>

        <div className="linkhunt-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PhosphorShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                Academic Evaluation
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
              Academic credentials, coursework evaluations, and degree verification from the Department of Computer Science &amp; Engineering at PET Engineering College are fully documented.
            </p>
          </div>
          <div className="pt-3 border-t border-[var(--border-structural)]">
            <span className="text-[11px] font-mono text-[var(--text-secondary)]">
              PET Engineering College &bull; CGPA: 8.0/10
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg bg-[var(--surface-secondary)]/60 border border-[var(--border-structural)] text-xs">
        <span className="text-[var(--text-secondary)]">
          Need contact details for references or official transcripts?
        </span>
        <a
          href="mailto:kamil.hisham3124@gmail.com?subject=Reference%20and%20Credential%20Verification%20-%20Kamil%20Hisham"
          className="inline-flex items-center gap-1.5 font-semibold text-[var(--text-primary)] hover:underline min-h-[44px]"
        >
          <PhosphorEnvelopeSimple className="w-3.5 h-3.5" />
          <span>Request Verification Contacts</span>
          <PhosphorArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
