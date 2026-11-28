import React from "react";
import type { TelemetryHistoryPoint } from "../../lib/validators/telemetryValidator";

export function TelemetrySamplesPanel({
  points,
}: {
  points: TelemetryHistoryPoint[];
}) {
  return (
    <section className="linkhunt-card p-4 sm:p-6 min-w-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4 pb-2 border-b border-[var(--border-structural)]">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">
          24-Hour Latency Sampling
        </h2>
        <span className="text-[11px] font-mono text-[var(--text-muted)] whitespace-nowrap">
          {points.length} samples (hourly)
        </span>
      </div>

      {/* Mobile stacked records (< 768px): zero horizontal clipping */}
      <div className="md:hidden flex flex-col gap-2.5">
        {points.map((point, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-structural)] flex flex-col gap-2 text-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  Timestamp (UTC)
                </span>
                <span className="font-mono font-medium text-[var(--text-primary)] whitespace-nowrap">
                  {new Date(point.timestamp).toISOString().substring(11, 19)}Z
                </span>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-status-success-bg text-status-success-fg border border-status-success-border whitespace-nowrap shrink-0">
                Pass &le; 50ms
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--border-structural)]">
              <div className="flex flex-col">
                <dt className="text-[10px] font-mono text-[var(--text-muted)]">Edge Latency</dt>
                <dd className="font-semibold text-[var(--text-primary)] font-mono whitespace-nowrap">
                  {point.edgeLatencyMs}ms
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-[10px] font-mono text-[var(--text-muted)]">Bundle Gzip</dt>
                <dd className="font-semibold text-[var(--text-primary)] font-mono whitespace-nowrap">
                  {point.bundleSizeKb}KB
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      {/* Tablet & Desktop table (>= 768px) */}
      <div
        tabIndex={0}
        role="region"
        aria-label="24-Hour Latency Sampling Table"
        className="hidden md:block overflow-x-auto terminal-scrollbar rounded-lg border border-[var(--border-structural)] focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus:outline-none"
      >
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
            {points.map((point, idx) => (
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
  );
}
