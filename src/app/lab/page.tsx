import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TelemetryWidget } from "../../components/server/TelemetryWidget";
import { ArrowRight, Check } from "lucide-react";

export const dynamic = "force-dynamic";

export default function LabIndexPage() {
  return (
    <div className="flex flex-col gap-10">
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)] mb-3">
          <span>[SYSTEMS_LAB]</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Engineering Lab &amp; State Sandboxes
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-2xl leading-relaxed">
          Interactive client state sandboxes and live edge execution telemetry
          demonstrating deterministic rendering strategies.
        </p>
      </header>

      {/* Snapshot Telemetry Widget */}
      <TelemetryWidget />

      {/* Lab Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group linkhunt-card p-6 flex flex-col justify-between hover:shadow-card-hover transition-all">
          <div>
            <div className="relative w-full h-40 rounded-lg overflow-hidden border border-[var(--border-structural)] mb-4 bg-zinc-900">
              <Image
                src="/images/lab-canvas.jpg"
                alt="Component Composition Sandbox"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] font-medium mb-2">
              Module 01 // Interactive State
            </div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:underline">
              Component Composition Sandbox
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              Client-isolated architecture sandbox with Zustand state management.
              Toggle between Grid, Stack, and Split layouts with zero server round trips.
            </p>
            <div className="space-y-1.5 mb-6">
              {[
                "Sub-50ms instantaneous layout transitions",
                "Capped history buffer preventing memory bloat",
                "Offline-capable state architecture",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/lab/canvas"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-primary)] hover:underline pt-4 border-t border-[var(--border-structural)] min-h-[44px]"
          >
            <span>Open Interactive Canvas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="group linkhunt-card p-6 flex flex-col justify-between hover:shadow-card-hover transition-all">
          <div>
            <div className="relative w-full h-40 rounded-lg overflow-hidden border border-[var(--border-structural)] mb-4 bg-zinc-900">
              <Image
                src="/images/lab-telemetry.jpg"
                alt="Live Edge Telemetry"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] font-medium mb-2">
              Module 02 // Performance Ledger
            </div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:underline">
              Live Edge Telemetry
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              Expanded 24-hour historical telemetry view showing real edge latency,
              bundle sizes, and PoP node health across global distributions.
            </p>
            <div className="space-y-1.5 mb-6">
              {[
                "Low-latency edge distribution metrics",
                "Periodic background data revalidation",
                "Interactive health check verification",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/lab/telemetry"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-primary)] hover:underline pt-4 border-t border-[var(--border-structural)] min-h-[44px]"
          >
            <span>Inspect 24-Hour Telemetry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}