import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { TelemetryWidget } from "../../components/server/TelemetryWidget";
import { PhosphorArrowRight, PhosphorCheck } from "../../components/icons";
import { Breadcrumb } from "../../components/shared/Breadcrumb";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lab",
  description: "Interactive engineering demonstrations, client-side state models, and edge telemetry.",
};

export default function LabIndexPage() {
  return (
    <div className="flex flex-col gap-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Lab" }]} />
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)] mb-3">
          <span>Lab Demos</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Engineering Lab &amp; Demos
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-2xl leading-relaxed">
          Interactive demonstrations of client-side state management, responsive UI composition,
          and live edge telemetry metrics.
        </p>
      </header>

      {/* Snapshot Telemetry Widget */}
      <TelemetryWidget />

      {/* Lab Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group linkhunt-card p-4 sm:p-6 flex flex-col justify-between hover:shadow-card-hover transition-all">
          <div>
            <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border-structural mb-4 bg-surface-terminal">
              <Image
                src="/images/lab-canvas.jpg"
                alt="Component Composition Sandbox"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-fg-accent font-medium mb-2">
              Demo 01 &bull; State Management
            </div>
            <h2 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-fg-accent group-hover:underline transition-colors">
              Interactive Component Canvas
            </h2>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              Client-isolated architecture sandbox with Zustand state management.
              Toggle between Grid, Stack, and Split layouts with zero server round trips.
            </p>
            <div className="space-y-1.5 mb-6">
              {[
                "Sub-50ms instantaneous layout transitions",
                "Capped history buffer preventing memory bloat",
                "Offline-capable state architecture",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                  <PhosphorCheck className="w-3.5 h-3.5 text-status-success shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/lab/canvas"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-fg-accent hover:underline pt-4 border-t border-border-structural min-h-[44px]"
          >
            <span>Open Interactive Canvas</span>
            <PhosphorArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="group linkhunt-card p-4 sm:p-6 flex flex-col justify-between transition-all">
          <div>
            <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border-structural mb-4 bg-surface-terminal">
              <Image
                src="/images/lab-telemetry.jpg"
                alt="Live Edge Telemetry"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-fg-accent font-medium mb-2">
              Demo 02 &bull; Edge Metrics
            </div>
            <h2 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-fg-accent group-hover:underline transition-colors">
              Live Edge Telemetry
            </h2>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              Expanded 24-hour historical telemetry view showing real edge latency,
              bundle sizes, and PoP node health across global distributions.
            </p>
            <div className="space-y-1.5 mb-6">
              {[
                "Low-latency edge distribution metrics",
                "Periodic background data revalidation",
                "Interactive health check verification",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                  <PhosphorCheck className="w-3.5 h-3.5 text-status-success shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/lab/telemetry"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-fg-accent hover:underline pt-4 border-t border-border-structural min-h-[44px]"
          >
            <span>Inspect 24-Hour Telemetry</span>
            <PhosphorArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
