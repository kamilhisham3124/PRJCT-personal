import React from "react";
import Link from "next/link";
import { CodeCanvas } from "../../../components/client/CodeCanvas";
import { LayoutGrid, ChevronRight, Zap, Shield, Sparkles } from "lucide-react";

export default function LabCanvasPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link href="/lab" className="hover:text-[#635BFF] transition-colors">Lab</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">Interactive Canvas</span>
      </div>

      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-[#635BFF] dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-3">
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Interactive State Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
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
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-stripe">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-[#635BFF] mb-3">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
            Deterministic Latency
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Zero network dependency once mounted. The canvas continues functioning
            identically when offline, isolating presentation from network jitter.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-stripe">
          <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 flex items-center justify-center text-[#00D4FF] mb-3">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
            State Isolation
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Zustand state store is isolated to this subtree, and state history is
            capped to prevent unbounded memory growth.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-stripe">
          <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-[#7A73FF] mb-3">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
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
