import React from "react";
import Link from "next/link";
import { TelemetryWidget } from "../../components/server/TelemetryWidget";

export const dynamic = "force-dynamic";

export default function LabIndexPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="border-b border-structural pb-4">
        <span className="text-xs font-mono uppercase text-accent-chemical font-bold tracking-wider">
          [ EXPERIMENTAL SUBSYSTEMS // LAB SUPERSTRUCTURE ]
        </span>
        <h1 className="text-3xl font-extrabold font-display text-text-primary mt-1">
          Systems Engineering Lab
        </h1>
        <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
          Isolated client state sandboxes and live edge execution telemetry
          demonstrating deterministic rendering strategies.
        </p>
      </header>

      {/* Snapshot Widget */}
      <TelemetryWidget />

      {/* Two sub-route pathways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-element bg-surface-secondary p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-1 hazard-stripe" />
          <div>
            <div className="text-xs font-mono uppercase text-accent-chemical mb-2 font-bold">
              ROUTE RT-06 // CLIENT COMPONENT
            </div>
            <h2 className="text-xl font-bold font-display text-text-primary mb-2">
              Interactive Code Canvas
            </h2>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              Client-isolated architecture sandbox with Zustand state management.
              Toggle between Grid, Stack, and Split layouts with zero server round trips.
            </p>
            <div className="text-xs font-mono text-text-secondary space-y-1 mb-4">
              <div>• SLA: Interaction to Next Paint &le; 40ms</div>
              <div>• Memory discipline: State history capped at 10</div>
              <div>• Offline operational resilience</div>
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
              ROUTE RT-07 // INCREMENTAL STATIC REGENERATION
            </div>
            <h2 className="text-xl font-bold font-display text-text-primary mb-2">
              Live Edge Telemetry
            </h2>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              Expanded 24-hour historical telemetry view showing real edge latency,
              bundle sizes, and PoP node health across global distributions.
            </p>
            <div className="text-xs font-mono text-text-secondary space-y-1 mb-4">
              <div>• SLA: Time to First Byte &le; 50ms</div>
              <div>• Cache: 60s ISR revalidation window</div>
              <div>• Manual audit &amp; retry control affordance</div>
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
