import React from "react";
import Link from "next/link";

export function SubstrateCard() {
  return (
    <section className="linkhunt-card p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] pb-2 border-b border-[var(--border-structural)]">
          Architecture &amp; Substrate
        </h3>
        <div className="flex flex-col gap-2 pt-2.5 text-xs">
          <div className="flex justify-between items-center"><span className="text-[var(--text-secondary)]">Edge Platform</span><span className="font-medium text-[var(--text-primary)]">Vercel Global Edge</span></div>
          <div className="flex justify-between items-center"><span className="text-[var(--text-secondary)]">Runtime Engine</span><span className="font-medium text-[var(--text-primary)]">Next.js 15 RSC</span></div>
          <div className="flex justify-between items-center"><span className="text-[var(--text-secondary)]">Database Layer</span><span className="font-medium text-[var(--text-primary)]">Supabase PostgreSQL</span></div>
          <div className="flex justify-between items-center"><span className="text-[var(--text-secondary)]">Accessibility</span><span className="font-medium text-emerald-600 dark:text-emerald-400">WCAG 2.2 AA</span></div>
        </div>
      </div>

      <div className="pt-3 border-t border-[var(--border-structural)]">
        <h4 className="text-xs font-semibold text-[var(--text-primary)] mb-1">Interactive Demos</h4>
        <p className="text-xs text-[var(--text-secondary)] mb-2.5 leading-relaxed">Client state machines and edge metrics.</p>
        <div className="flex flex-col gap-2">
          <Link href="/lab/canvas" className="w-full text-center py-2 px-3 rounded-lg bg-[var(--surface-secondary)] text-xs font-medium hover:border-[var(--border-highlight)] border border-[var(--border-structural)] transition-colors min-h-[44px] inline-flex items-center justify-center">
            Component Canvas &rarr;
          </Link>
          <Link href="/lab/telemetry" className="w-full text-center py-2 px-3 rounded-lg bg-[var(--surface-secondary)] text-xs font-medium hover:border-[var(--border-highlight)] border border-[var(--border-structural)] transition-colors min-h-[44px] inline-flex items-center justify-center">
            24-Hour Telemetry &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
