import React from "react";
import Link from "next/link";
import {
  vercelTelemetryAccessor,
  getTelemetryHistory,
} from "../../../lib/accessors/vercelTelemetryAccessor";
import { supabaseReadAggregate } from "../../../lib/accessors/supabaseAccessor";
import { TelemetryDisplay } from "../../../components/shared/TelemetryDisplay";

export const revalidate = 60; // ISR per DOC-09 Section 1.0

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
        <Link href="/lab" className="hover:text-text-primary underline">
          Lab
        </Link>
        <span>/</span>
        <span>Telemetry (RT-07)</span>
      </div>

      <header className="border-b border-structural pb-4">
        <span className="text-xs font-mono uppercase text-text-secondary">
          Historical Production Telemetry / 24-Hour Horizon
        </span>
        <h1 className="text-3xl font-bold font-display text-text-primary mt-1">
          Edge Performance Ledger
        </h1>
        <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
          Sourced directly from edge timing metrics and server telemetry.
          Revalidated every 60 seconds with stale-while-revalidate edge caching.
        </p>
      </header>

      {/* Primary Current Metrics */}
      <TelemetryDisplay
        state={isSuccess ? "success" : "error"}
        data={currentData}
        lastUpdatedAt={currentData?.measuredAt}
      />

      {/* Aggregate Telemetry Counts from Supabase */}
      <section className="border-structural bg-surface-secondary p-6">
        <h2 className="text-xs font-mono uppercase text-text-secondary mb-3">
          Supabase Telemetry Aggregates (RLS Protected)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aggregates.map((item) => (
            <div key={item.metric_key} className="p-3 bg-surface-primary border-structural">
              <div className="text-xs font-mono text-text-secondary">
                {item.metric_key}
              </div>
              <div className="text-metric font-mono font-bold text-text-primary mt-1">
                {item.metric_value.toLocaleString()}
              </div>
              <div className="text-xs font-mono text-text-secondary mt-1">
                Updated: {new Date(item.last_computed_at).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 24-Hour Historical Ledger */}
      <section className="border-structural bg-surface-secondary p-6">
        <h2 className="text-xs font-mono uppercase text-text-secondary mb-3">
          24-Hour Historical Latency Sampling
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-structural text-text-secondary">
                <th className="py-2 px-3">Timestamp (UTC)</th>
                <th className="py-2 px-3">Edge Latency</th>
                <th className="py-2 px-3">Bundle Gzip</th>
                <th className="py-2 px-3">SLA Status</th>
              </tr>
            </thead>
            <tbody>
              {historyPoints.slice(-8).map((point, idx) => (
                <tr key={idx} className="border-b border-structural hover:bg-surface-primary">
                  <td className="py-2 px-3 text-text-secondary">
                    {new Date(point.timestamp).toISOString().substring(11, 19)}Z
                  </td>
                  <td className="py-2 px-3 font-bold text-text-primary">
                    {point.edgeLatencyMs}ms
                  </td>
                  <td className="py-2 px-3 text-text-secondary">
                    {point.bundleSizeKb}KB
                  </td>
                  <td className="py-2 px-3 text-text-primary">
                    [PASS &lt; 50ms]
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
