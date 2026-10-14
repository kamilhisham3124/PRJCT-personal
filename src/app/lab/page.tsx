import React from "react";
import Link from "next/link";
import { TelemetryWidget } from "../../components/server/TelemetryWidget";
import { Cpu, LayoutGrid, Activity, ArrowRight, Check } from "lucide-react";

export const dynamic = "force-dynamic";

export default function LabIndexPage() {
  return (
    <div className="flex flex-col gap-10">
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-[#635BFF] dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-4 shadow-sm">
          <Cpu className="w-3.5 h-3.5" />
          <span>Experimental Systems</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Systems Engineering Lab
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 mt-3 max-w-2xl leading-relaxed">
          Interactive client state sandboxes and live edge execution telemetry
          demonstrating deterministic rendering strategies.
        </p>
      </header>

      {/* Snapshot Telemetry Widget */}
      <TelemetryWidget />

      {/* Lab Subsystems */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-7 shadow-stripe hover:shadow-stripe-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#635BFF] to-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-[#635BFF] mb-4">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#635BFF] transition-colors">
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
                  <Check className="w-3.5 h-3.5 text-[#00D4FF]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/lab/canvas"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635BFF] hover:text-[#5349e0] pt-4 border-t border-slate-100 dark:border-slate-800 group-hover:translate-x-0.5 transition-all"
          >
            <span>Open Interactive Canvas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-7 shadow-stripe hover:shadow-stripe-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 flex items-center justify-center text-[#00D4FF] mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#635BFF] transition-colors">
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
                  <Check className="w-3.5 h-3.5 text-[#00D4FF]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/lab/telemetry"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635BFF] hover:text-[#5349e0] pt-4 border-t border-slate-100 dark:border-slate-800 group-hover:translate-x-0.5 transition-all"
          >
            <span>Inspect 24-Hour Telemetry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
