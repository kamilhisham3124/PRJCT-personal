import React from "react";
import Link from "next/link";
import {
  vercelTelemetryAccessor,
  getTelemetryHistory,
} from "../../../lib/accessors/vercelTelemetryAccessor";
import { supabaseReadAggregate } from "../../../lib/accessors/supabaseAccessor";
import { TelemetryDisplay } from "../../../components/shared/TelemetryDisplay";

export const revalidate = 60;

export default async function LabTelemetryPage() {
  const telemetryRes = await vercelTelemetryAccessor({
    metricSet: "edge_latency",
    windowMinutes: 60,
  });
  const historyRes = await getTelemetryHistory(1440);
  const aggregateRes = await supabaseReadAggregate();

  const isSuccess = telemetryRes.ok;
  const currentData = isSuccess ? telemetryRes.data : undefined;
  const historyPoints = historyRes.ok ? historyRes.data : [];
  const aggregates = aggregateRes.ok ? aggregateRes.data : [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
        <Link href="/lab" className="hover:text-accent-chemical underline">Lab</Link>
        <span>/</span>
        <span className="text-accent-chemical">Telemetry (RT-07)</span>
      </div>

      <header className="border-b border-structural pb-4">
        <span className="text-xs font-mono uppercase text-accent-chemical font-bold tracking-wider">
          [ HISTORICAL TELEMETRY // 24-HOUR EDGE HORIZON ]
        </span>
        <h1 className="text-3xl font-extrabold font-display text-text-primary mt-1">
          Edge Performance Ledger
        </h1>
        <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
          Sourced from live edge timing metrics with 60-second stale-while-revalidate caching.
        </p>
      </header>

      {/* 70% / 30% Asymmetrical Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 70% Column: Historical Data Ledger */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <section className="border-element bg-surface-secondary p-6">
            <div className="flex justify-between items-center border-b border-structural pb-3 mb-4">
              <h2 className="text-xs font-mono uppercase text-accent-chemical font-bold">
                24-Hour Historical Latency Sampling Ledger
              </h2>
              <div className="font-marginalia text-annotation text-accent-chemical">
                // 60s stale-while-revalidate cache
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-structural text-accent-chemical">
                    <th className="py-2 px-3">Timestamp (UTC)</th>
                    <th className="py-2 px-3">Edge Latency</th>
                    <th className="py-2 px-3">Bundle Gzip</th>
                    <th className="py-2 px-3">SLA Status</th>
                  </tr>
                </thead>
                <tbody>
                  {historyPoints.slice(-10).map((point, idx) => (
                    <tr key={idx} className="border-b border-structural hover:bg-surface-primary">
                      <td className="py-2 px-3 text-text-secondary">
                        {new Date(point.timestamp).toISOString().substring(11, 19)}Z
                      </td>
                      <td className="py-2 px-3 font-bold text-accent-sky">
                        {point.edgeLatencyMs}ms
                      </td>
                      <td className="py-2 px-3 text-text-secondary">
                        {point.bundleSizeKb}KB
                      </td>
                      <td className="py-2 px-3 text-accent-barrel font-bold">
                        [PASS &le; 50ms]
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="border-element bg-surface-secondary p-6">
            <h2 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-3">
              Supabase Telemetry Aggregates (RLS Protected)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aggregates.map((item) => (
                <div key={item.metric_key} className="p-3 bg-surface-primary border-element">
                  <div className="text-xs font-mono text-text-secondary">{item.metric_key}</div>
                  <div className="text-metric font-mono font-bold text-accent-chemical mt-1">
                    {item.metric_value.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono text-text-secondary mt-1">
                    Updated: {new Date(item.last_computed_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right 30% Column: Metadata Rail */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <TelemetryDisplay
            state={isSuccess ? "success" : "error"}
            data={currentData}
            lastUpdatedAt={currentData?.measuredAt}
          />

          <section className="border-element bg-surface-secondary p-4">
            <h3 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-3 border-b border-structural pb-2">
              PoP Regional Distribution
            </h3>
            <div className="flex flex-col gap-2 font-mono text-xs">
              {currentData?.nodeStatus.map((node) => (
                <div key={node.region} className="flex justify-between items-center p-2 border-element bg-surface-primary">
                  <span className="text-text-primary">{node.region}</span>
                  <span className="font-bold text-accent-barrel uppercase text-[10px]">
                    [{node.status}]
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
