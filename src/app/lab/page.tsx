import React from "react";
import Link from "next/link";
import { TelemetryWidget } from "../../components/server/TelemetryWidget";

export const dynamic = "force-dynamic";

export default function LabIndexPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="border-b border-structural pb-4">
        <span className="text-xs font-mono uppercase text-text-secondary">
          Experimental &amp; Dynamic Subsystems / RT-05
        </span>
        <h1 className="text-3xl font-bold font-display text-text-primary mt-1">
          Systems Engineering Lab
        </h1>
        <p className="text-sm text-text-secondary mt-2 max-w-2xl">
          Isolated client state sandboxes and live edge execution telemetry
          demonstrating deterministic rendering strategies.
        </p>
      </header>

      {/* Snapshot Widget */}
      <TelemetryWidget />

      {/* Two sub-route entry pathways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-structural bg-surface-secondary p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-text-secondary mb-2">
              Route RT-06 / Client Component
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
            className="text-xs font-mono font-bold underline text-text-primary hover:text-text-secondary"
          >
            Open Interactive Canvas &gt;
          </Link>
        </div>

        <div className="border-structural bg-surface-secondary p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-text-secondary mb-2">
              Route RT-07 / Incremental Static Regeneration
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
            className="text-xs font-mono font-bold underline text-text-primary hover:text-text-secondary"
          >
            Inspect 24-Hour Telemetry &gt;
          </Link>
        </div>
      </div>
    </div>
  );
}
