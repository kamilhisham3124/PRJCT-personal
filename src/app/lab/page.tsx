import React from "react";
import Link from "next/link";
import { TelemetryWidget } from "../../components/server/TelemetryWidget";
import { ArrowRight, Check } from "lucide-react";

export const dynamic = "force-dynamic";

export default function LabIndexPage() {
  return (
    <div className="flex flex-col gap-10">
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-sky-50 dark:bg-sky-950/60 text-aero-sky dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] mb-4">
          <span>[SYSTEMS_AERO_LAB]</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
          Systems Engineering Lab
        </h1>
        <p className="text-base text-slate-600 dark:text-sky-100/90 mt-3 max-w-2xl leading-relaxed">
          Interactive client state sandboxes and live edge execution telemetry
          demonstrating deterministic rendering strategies.
        </p>
      </header>

      {/* Snapshot Telemetry Widget */}
      <TelemetryWidget />

      {/* HyperUI Lab Subsystem Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group aero-panel rounded-xl p-7 hover:border-aero-sky transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-aero-sky dark:text-sky-300 font-semibold mb-2">
              Module 01 // Interactive State
            </div>
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-aero-sky transition-colors">
              Interactive Code Canvas
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Client-isolated architecture sandbox with Zustand state management.
              Toggle between Grid, Stack, and Split layouts with zero server round trips.
            </p>
            <div className="space-y-2 mb-6">
              {[
                "Sub-50ms instantaneous layout transitions",
                "Capped history buffer preventing memory bloat",
                "Offline-capable state architecture",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/lab/canvas"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-aero-sky hover:underline pt-4 border-t border-sky-100 dark:border-sky-800/60 group-hover:translate-x-0.5 transition-transform"
          >
            <span>Open Interactive Canvas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="group aero-panel rounded-xl p-7 hover:border-aero-sky transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-aero-sky dark:text-sky-300 font-semibold mb-2">
              Module 02 // Performance Ledger
            </div>
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-aero-sky transition-colors">
              Live Edge Telemetry
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Expanded 24-hour historical telemetry view showing real edge latency,
              bundle sizes, and PoP node health across global distributions.
            </p>
            <div className="space-y-2 mb-6">
              {[
                "Low-latency edge distribution metrics",
                "Periodic background data revalidation",
                "Interactive health check verification",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/lab/telemetry"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-aero-sky hover:underline pt-4 border-t border-sky-100 dark:border-sky-800/60 group-hover:translate-x-0.5 transition-transform"
          >
            <span>Inspect 24-Hour Telemetry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
