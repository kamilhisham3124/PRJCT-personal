import React from "react";
import Link from "next/link";
import { vercelTelemetryAccessor, getTelemetryHistory } from "../../../lib/accessors/vercelTelemetryAccessor";
import { supabaseReadAggregate } from "../../../lib/accessors/supabaseAccessor";
import { TelemetryDisplay } from "../../../components/shared/TelemetryDisplay";
import { ChevronRight } from "lucide-react";

export const revalidate = 60;

export default async function LabTelemetryPage() {
  const telemetryRes = await vercelTelemetryAccessor({ metricSet: "edge_latency", windowMinutes: 60 });
  const historyRes = await getTelemetryHistory(1440);
  const aggregateRes = await supabaseReadAggregate();

  const isSuccess = telemetryRes.ok;
  const currentData = isSuccess ? telemetryRes.data : undefined;
  const historyPoints = historyRes.ok ? historyRes.data : [];
  const aggregates = aggregateRes.ok ? aggregateRes.data : [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
        <Link href="/lab" className="hover:text-[var(--text-primary)] transition-colors">
          Lab
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[var(--text-primary)] font-medium">Edge Telemetry</span>
      </div>

      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)] mb-3">
          <span>[TELEMETRY_LEDGER]</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Edge Telemetry &amp; Latency SLA
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-2xl leading-relaxed">
          Sourced from live edge timing metrics with 60-second stale-while-revalidate caching.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <section className="linkhunt-card p-6">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-structural)]">
              24-Hour Latency Sampling
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-structural)] text-[var(--text-secondary)] font-medium">
                    <th className="py-2.5 px-3">Timestamp (UTC)</th>
                    <th className="py-2.5 px-3">Edge Latency</th>
                    <th className="py-2.5 px-3">Bundle Gzip</th>
                    <th className="py-2.5 px-3">SLA Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-structural)]">
                  {historyPoints.slice(-8).map((point, idx) => (
                    <tr key={idx} className="hover:bg-[var(--surface-secondary)] transition-colors">
                      <td className="py-2.5 px-3 text-[var(--text-secondary)] font-mono">
                        {new Date(point.timestamp).toISOString().substring(11, 19)}Z
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-[var(--text-primary)] font-mono">
                        {point.edgeLatencyMs}ms
                      </td>
                      <td className="py-2.5 px-3 text-[var(--text-secondary)] font-mono">
                        {point.bundleSizeKb}KB
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                          Pass &le; 50ms
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="linkhunt-card p-6">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-structural)]">
              Database Telemetry Aggregates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aggregates.map((item) => (
                <div key={item.metric_key} className="p-4 bg-[var(--surface-secondary)] rounded-lg border border-[var(--border-structural)]">
                  <div className="text-xs font-mono text-[var(--text-secondary)]">{item.metric_key}</div>
                  <div className="text-xl font-bold text-[var(--text-primary)] font-mono mt-1">
                    {item.metric_value.toLocaleString()}
                  </div>
                  <div className="text-[11px] font-mono text-[var(--text-secondary)] mt-1" suppressHydrationWarning>
                    Updated: {new Date(item.last_computed_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 flex flex-col gap-6">
          <TelemetryDisplay state={isSuccess ? "success" : "error"} data={currentData} lastUpdatedAt={currentData?.measuredAt} />

          <section className="linkhunt-card p-6">
            <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-3 pb-2 border-b border-[var(--border-structural)]">
              Regional Distribution
            </h3>
            <div className="flex flex-col gap-2">
              {currentData?.nodeStatus.map((node) => (
                <div key={node.region} className="flex justify-between items-center p-2.5 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-structural)] text-xs">
                  <span className="font-medium text-[var(--text-primary)]">{node.region}</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
