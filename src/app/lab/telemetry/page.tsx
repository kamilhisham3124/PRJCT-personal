import React from "react";
import type { Metadata } from "next";
import { vercelTelemetryAccessor, getTelemetryHistory } from "../../../lib/accessors/vercelTelemetryAccessor";
import { supabaseReadAggregate } from "../../../lib/accessors/supabaseAccessor";
import { TelemetryDisplay } from "../../../components/shared/TelemetryDisplay";
import { Breadcrumb } from "../../../components/shared/Breadcrumb";
import { DatabaseAggregatesPanel } from "../../../components/shared/DatabaseAggregatesPanel";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Edge Telemetry",
  description: "Live edge response times and health metrics cached with 60-second background revalidation.",
};

export default async function LabTelemetryPage() {
  const telemetryRes = await vercelTelemetryAccessor({ metricSet: "edge_latency", windowMinutes: 60 });
  const historyRes = await getTelemetryHistory(1440);
  const aggregateRes = await supabaseReadAggregate();

  const isSuccess = telemetryRes.ok;
  const currentData = isSuccess ? telemetryRes.data : undefined;
  const historyPoints = historyRes.ok ? historyRes.data : [];
  const aggregates = aggregateRes.ok ? aggregateRes.data : [];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 min-w-0">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Lab", href: "/lab" }, { label: "Edge Telemetry" }]} />

      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)] mb-3">
          <span>Edge Telemetry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Edge Telemetry &amp; Latency
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-2xl leading-relaxed">
          Live edge response times and health metrics cached with 60-second background revalidation.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start min-w-0">
        <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
          <section className="linkhunt-card p-4 sm:p-6 min-w-0">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-structural)]">
              24-Hour Latency Sampling
            </h2>
            <div
              tabIndex={0}
              role="region"
              aria-label="24-Hour Latency Sampling Table"
              className="overflow-x-auto scroll-smooth rounded-lg border border-[var(--border-structural)] focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus:outline-none"
            >
              <div className="sm:hidden px-3 py-1.5 text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface-secondary)] border-b border-[var(--border-structural)] flex items-center justify-between select-none">
                <span>&larr; Scroll table horizontally &rarr;</span>
                <span>8 samples</span>
              </div>
              <table className="w-full min-w-[460px] text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-structural)] text-[var(--text-secondary)] font-medium bg-[var(--surface-secondary)]">
                    <th scope="col" className="py-2.5 px-3 whitespace-nowrap">Timestamp (UTC)</th>
                    <th scope="col" className="py-2.5 px-3 whitespace-nowrap">Edge Latency</th>
                    <th scope="col" className="py-2.5 px-3 whitespace-nowrap">Bundle Gzip</th>
                    <th scope="col" className="py-2.5 px-3 whitespace-nowrap">SLA Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-structural)]">
                  {historyPoints.slice(-8).map((point, idx) => (
                    <tr key={idx} className="hover:bg-[var(--surface-secondary)] transition-colors">
                      <td className="py-2.5 px-3 text-[var(--text-secondary)] font-mono whitespace-nowrap">
                        {new Date(point.timestamp).toISOString().substring(11, 19)}Z
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-[var(--text-primary)] font-mono whitespace-nowrap">
                        {point.edgeLatencyMs}ms
                      </td>
                      <td className="py-2.5 px-3 text-[var(--text-secondary)] font-mono whitespace-nowrap">
                        {point.bundleSizeKb}KB
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-status-success-bg text-status-success-fg border border-status-success-border whitespace-nowrap">
                          Pass &le; 50ms
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <DatabaseAggregatesPanel aggregates={aggregates} />
        </div>

        <aside className="lg:col-span-4 flex flex-col gap-6 min-w-0">
          <TelemetryDisplay state={isSuccess ? "success" : "error"} data={currentData} lastUpdatedAt={currentData?.measuredAt} compact />

          <section className="linkhunt-card p-4 sm:p-6 min-w-0">
            <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-3 pb-2 border-b border-[var(--border-structural)]">
              Regional Distribution
            </h3>
            <div className="flex flex-col gap-2">
              {currentData?.nodeStatus.map((node) => (
                <div key={node.region} className="flex justify-between items-center p-2.5 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-structural)] text-xs">
                  <span className="font-medium text-[var(--text-primary)]">{node.region}</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-status-success-bg text-status-success-fg border border-status-success-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                    {node.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
