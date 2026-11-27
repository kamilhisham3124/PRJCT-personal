import React from "react";
import Link from "next/link";
import {
  TechVercelIcon,
  TechNextjsIcon,
  TechSupabaseIcon,
  PhosphorShieldCheck,
} from "../icons";

export function SubstrateCard() {
  return (
    <section className="linkhunt-card p-4 sm:p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] pb-2 border-b border-[var(--border-structural)]">
          Site Architecture &amp; Stack
        </h3>
        <div className="flex flex-col gap-2 pt-2.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Edge Platform</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-[var(--text-primary)]">
              <TechVercelIcon className="w-3.5 h-3.5 text-[var(--text-secondary)] shrink-0" aria-hidden="true" />
              <span>Vercel Global Edge</span>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Runtime Engine</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-[var(--text-primary)]">
              <TechNextjsIcon className="w-3.5 h-3.5 text-[var(--text-secondary)] shrink-0" aria-hidden="true" />
              <span>Next.js 15 RSC</span>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Database Layer</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-[var(--text-primary)]">
              <TechSupabaseIcon className="w-3.5 h-3.5 text-[var(--text-secondary)] shrink-0" aria-hidden="true" />
              <span>Supabase PostgreSQL</span>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Accessibility</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-status-success-fg">
              <PhosphorShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>WCAG 2.2 AA</span>
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-border-structural">
        <h4 className="text-xs font-semibold text-text-primary mb-1">Interactive Demos</h4>
        <p className="text-xs text-text-secondary mb-2.5 leading-relaxed">Client state machines and edge metrics.</p>
        <div className="flex flex-col gap-2">
          <Link href="/lab/canvas" className="w-full text-center py-2 px-3 rounded-lg bg-control-rest text-xs font-medium text-text-primary hover:bg-control-hover hover:border-border-highlight hover:text-fg-accent border border-control-border transition-colors min-h-[44px] inline-flex items-center justify-center">
            Component Canvas &rarr;
          </Link>
          <Link href="/lab/telemetry" className="w-full text-center py-2 px-3 rounded-lg bg-control-rest text-xs font-medium text-text-primary hover:bg-control-hover hover:border-border-highlight hover:text-fg-accent border border-control-border transition-colors min-h-[44px] inline-flex items-center justify-center">
            24-Hour Telemetry &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
