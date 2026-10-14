import React from "react";
import Link from "next/link";
import { CodeCanvas } from "../../../components/client/CodeCanvas";
import { ChevronRight } from "lucide-react";

export default function LabCanvasPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/lab" className="hover:text-accent-brand transition-colors">Lab</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">Interactive Canvas</span>
      </div>

      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-accent-brand dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-3">
          <span>[STATE_ENGINE_SANDBOX]</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
          Component Composition Sandbox
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 mt-3 max-w-2xl leading-relaxed">
          Demonstrates modular React component composition and client state management.
          Layout switches update the view synchronously via Zustand without network overhead.
        </p>
      </header>

      {/* Interactive Workbench */}
      <CodeCanvas initialLayout="grid" />

      {/* Architectural Justification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent-brand mb-1.5">
            01 // Latency
          </div>
          <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-2">
            Deterministic Latency
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Zero network dependency once mounted. The canvas continues functioning
            identically when offline, isolating presentation from network jitter.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent-brand mb-1.5">
            02 // Boundary
          </div>
          <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-2">
            State Isolation
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Zustand state store is isolated to this subtree, and state history is
            capped to prevent unbounded memory growth.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent-brand mb-1.5">
            03 // Input
          </div>
          <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-2">
            Keyboard Operability
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Fully keyboard navigable with Tab, Enter, and Space. Accessible attributes
            and live regions provide screen-reader parity.
          </p>
        </div>
      </div>
    </div>
  );
}
