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
    <div className="linkhunt-card p-4 sm:p-5 min-w-0">
      <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-text-secondary pb-3 mb-3.5 border-b border-border-structural">
        Key Metrics
      </h3>
      <dl className="flex flex-col gap-3">
        {metrics.map((m) => (
          <div
            key={m.metric}
            className="flex flex-col md:flex-row md:items-baseline md:justify-between lg:flex-col lg:items-start gap-1.5 md:gap-6 lg:gap-1 p-3 rounded-lg bg-surface-secondary border border-border-structural text-xs min-w-0"
          >
            <dt className="text-[11px] font-mono text-text-secondary font-medium shrink-0">
              {m.metric}
            </dt>
            <dd className="font-semibold text-text-primary font-mono leading-snug break-words md:text-right lg:text-left">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
