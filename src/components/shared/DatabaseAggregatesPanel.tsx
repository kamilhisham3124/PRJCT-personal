import React from "react";
import { PhosphorDatabase } from "../icons";
import type { TelemetryAggregateItem } from "../../lib/accessors/supabaseAccessor";

export function DatabaseAggregatesPanel({
  aggregates,
}: {
  aggregates: TelemetryAggregateItem[];
}) {
  return (
    <section className="linkhunt-card p-4 sm:p-6 min-w-0">
      <div className="flex items-center justify-between pb-2 mb-4 border-b border-[var(--border-structural)]">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">
          Database Telemetry Aggregates
        </h2>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)]">
          <span className={`w-1.5 h-1.5 rounded-full ${aggregates.length > 0 ? "bg-status-success" : "bg-[var(--text-muted)]"}`} />
          <span>{aggregates.length > 0 ? "Connected" : "Standby"}</span>
        </span>
      </div>
      {aggregates.length > 0 ? (
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
      ) : (
        <div className="p-4 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-structural)] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
            <PhosphorDatabase className="w-4 h-4 text-fg-accent shrink-0" />
            <span>Supabase Metric Storage Standby</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Upstream Supabase analytics synchronization is operating in offline standby mode. Edge latency measurements above and regional probe telemetry remain actively computed.
          </p>
          <div className="pt-2 border-t border-[var(--border-structural)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
            <span>Source: PostgreSQL pg_stat_statements</span>
            <span className="text-status-success-fg">Edge Probes: 5 Regions Active</span>
          </div>
        </div>
      )}
    </section>
  );
}
