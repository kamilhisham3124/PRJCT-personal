import React from "react";

export interface MetricItem {
  metric: string;
  value: string;
}

export interface MetricsCardProps {
  metrics?: MetricItem[];
}

export function MetricsCard({ metrics }: MetricsCardProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="linkhunt-card p-6">
      <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--text-secondary)] pb-3 mb-4 border-b border-[var(--border-structural)]">
        Key Metrics
      </h3>
      <div className="flex flex-col gap-2.5">
        {metrics.map((m) => (
          <div
            key={m.metric}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-structural)] text-xs"
          >
            <span className="text-[var(--text-secondary)] font-medium">{m.metric}</span>
            <span className="font-semibold text-[var(--text-primary)] font-mono">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

