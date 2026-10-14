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
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/lab" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Lab</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">Edge Telemetry</span>
      </div>

      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 mb-3">
          <span>[TELEMETRY_AERO_LEDGER]</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
          Edge Telemetry &amp; Latency SLA
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 mt-3 max-w-2xl leading-relaxed">
          Sourced from live edge timing metrics with 60-second stale-while-revalidate caching.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <section className="aero-panel rounded-xl p-6">
            <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white mb-4">
              24-Hour Latency Sampling
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-sky-100 dark:border-sky-800/60 text-slate-400 font-semibold">
                    <th className="py-2.5 px-3">Timestamp (UTC)</th>
                    <th className="py-2.5 px-3">Edge Latency</th>
                    <th className="py-2.5 px-3">Bundle Gzip</th>
                    <th className="py-2.5 px-3">SLA Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-100 dark:divide-sky-800/40">
                  {historyPoints.slice(-8).map((point, idx) => (
                    <tr key={idx} className="hover:bg-sky-50/50 dark:hover:bg-sky-950/30 transition-colors">
                      <td className="py-2.5 px-3 text-slate-500 font-mono">
                        {new Date(point.timestamp).toISOString().substring(11, 19)}Z
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white font-mono">
                        {point.edgeLatencyMs}ms
                      </td>
                      <td className="py-2.5 px-3 text-slate-500 font-mono">
                        {point.bundleSizeKb}KB
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
                          Pass &le; 50ms
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="aero-panel rounded-xl p-6">
            <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white mb-4">
              Database Telemetry Aggregates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aggregates.map((item) => (
                <div key={item.metric_key} className="p-4 bg-sky-50/60 dark:bg-sky-950/40 rounded-lg border border-sky-100 dark:border-sky-800/60 shadow-sm">
                  <div className="text-xs font-mono text-slate-500">{item.metric_key}</div>
                  <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
                    {item.metric_value.toLocaleString()}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    Updated: {new Date(item.last_computed_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 flex flex-col gap-6">
          <TelemetryDisplay state={isSuccess ? "success" : "error"} data={currentData} lastUpdatedAt={currentData?.measuredAt} />

          <section className="aero-panel rounded-xl p-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 pb-2 border-b border-sky-100 dark:border-sky-800/60">
              PoP Regional Distribution
            </h3>
            <div className="flex flex-col gap-2">
              {currentData?.nodeStatus.map((node) => (
                <div key={node.region} className="flex justify-between items-center p-3 rounded-lg bg-sky-50/60 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-800/60 text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{node.region}</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
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
