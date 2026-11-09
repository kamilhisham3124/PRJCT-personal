import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { CodeCanvas } from "../../../components/client/CodeCanvas";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive Canvas",
  description: "Interactive component canvas demonstrating modular React architecture and synchronous client state management.",
};

export default function LabCanvasPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
        <Link href="/lab" className="hover:text-[var(--text-primary)] transition-colors">
          Lab
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[var(--text-primary)] font-medium">Interactive Canvas</span>
      </div>

      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)] mb-3">
          <span>Client State</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Interactive Component Canvas
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-2xl leading-relaxed">
          Demonstrates modular React component composition and client-side state management.
          Layout transitions update synchronously in Zustand without network requests.
        </p>
      </header>

      {/* Interactive Workbench */}
      <CodeCanvas initialLayout="grid" />

      {/* Architectural Justification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="linkhunt-card p-5">
          <div className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
            01 &bull; Fast Interaction
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
            Zero Network Overhead
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Zero network dependency once mounted. The canvas continues functioning
            identically when offline, isolating presentation from network jitter.
          </p>
        </div>

        <div className="linkhunt-card p-5">
          <div className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
            02 &bull; State Scope
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
            State Isolation
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Zustand state store is isolated to this subtree, and state history is
            capped to prevent unbounded memory growth.
          </p>
        </div>

        <div className="linkhunt-card p-5">
          <div className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
            03 &bull; Accessibility
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
            Keyboard Operability
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Fully keyboard navigable with Tab, Enter, and Space. Accessible attributes
            and live regions provide screen-reader parity.
          </p>
        </div>
      </div>
    </div>
  );
}
