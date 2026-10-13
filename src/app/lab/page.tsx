import React from "react";
import Link from "next/link";
import { TelemetryWidget } from "../../components/server/TelemetryWidget";

export const dynamic = "force-dynamic";

export default function LabIndexPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="border-b border-structural pb-4">
        <span className="text-xs font-mono uppercase text-accent-chemical font-bold tracking-wider">
          [ SYSTEMS LAB // EXPERIMENTAL SUBSYSTEMS ]
        </span>
        <h1 className="text-3xl font-extrabold font-display text-text-primary mt-1">
          Systems Engineering Lab
        </h1>
        <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
          Interactive client state sandboxes and live edge execution telemetry
          demonstrating deterministic rendering strategies.
        </p>
      </header>

      {/* Snapshot Widget */}
      <TelemetryWidget />

      {/* Sub-route pathways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-element bg-surface-secondary p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-1 hazard-stripe" />
          <div>
            <div className="text-xs font-mono uppercase text-accent-chemical mb-2 font-bold">
              INTERACTIVE PROTOTYPE // STATE ENGINE
            </div>
            <h2 className="text-xl font-bold font-display text-text-primary mb-2">
              Interactive Code Canvas
            </h2>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              Client-isolated architecture sandbox with Zustand state management.
              Toggle between Grid, Stack, and Split layouts with zero server round trips.
            </p>
            <div className="text-xs font-mono text-text-secondary space-y-1 mb-4">
              <div>• Sub-50ms instantaneous layout transitions</div>
              <div>• Capped history buffer preventing memory bloat</div>
              <div>• Offline-capable state architecture</div>
            </div>
          </div>
          <Link
            href="/lab/canvas"
            className="text-xs font-mono font-bold text-accent-chemical hover:underline pt-2 border-t border-structural"
          >
            Open Interactive Canvas &gt;
          </Link>
        </div>

        <div className="border-element bg-surface-secondary p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-1 hazard-stripe" />
          <div>
            <div className="text-xs font-mono uppercase text-accent-chemical mb-2 font-bold">
              PERFORMANCE MONITORING // EDGE NETWORK
            </div>
            <h2 className="text-xl font-bold font-display text-text-primary mb-2">
              Live Edge Telemetry
            </h2>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              Expanded 24-hour historical telemetry view showing real edge latency,
              bundle sizes, and PoP node health across global distributions.
            </p>
            <div className="text-xs font-mono text-text-secondary space-y-1 mb-4">
              <div>• Low-latency edge distribution metrics</div>
              <div>• Periodic background data revalidation</div>
              <div>• Interactive health check verification</div>
            </div>
          </div>
          <Link
            href="/lab/telemetry"
            className="text-xs font-mono font-bold text-accent-chemical hover:underline pt-2 border-t border-structural"
          >
            Inspect 24-Hour Telemetry &gt;
          </Link>
        </div>
      </div>
    </div>
  );
}
