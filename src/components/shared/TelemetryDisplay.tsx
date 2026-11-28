import React from "react";
import { VercelTelemetryResponse } from "../../lib/validators/telemetryValidator";
import {
  PhosphorLightning,
  PhosphorCpu,
  PhosphorHardDrives,
  PhosphorWarningCircle,
} from "../icons";

export interface TelemetryDisplayProps {
  data?: VercelTelemetryResponse;
  state: "loading" | "success" | "error" | "stale";
  lastUpdatedAt?: string;
  compact?: boolean;
  onRetry?: () => void;
}

export function TelemetryDisplay({
  data,
  state,
  lastUpdatedAt,
  compact = false,
  onRetry,
}: TelemetryDisplayProps) {
  if (state === "loading") {
    return (
      <div className="linkhunt-card p-4 sm:p-5 min-h-[130px]" role="region" aria-label="System telemetry dashboard">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-text-secondary mb-4">
          <span className="animate-spin inline-block w-3 h-3 border-2 border-border-highlight border-t-transparent rounded-full" />
          <span>Loading edge telemetry...</span>
        </div>
        <div className={compact ? "space-y-2" : "grid grid-cols-1 sm:grid-cols-3 gap-3"}>
          <div className="h-12 rounded-lg bg-surface-secondary animate-pulse" />
          <div className="h-12 rounded-lg bg-surface-secondary animate-pulse" />
          <div className="h-12 rounded-lg bg-surface-secondary animate-pulse" />
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="rounded-xl border border-status-error-border bg-status-error-bg p-4 sm:p-5" role="region" aria-label="System telemetry dashboard">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-status-error-fg mb-1">
          <PhosphorWarningCircle className="w-4 h-4" />
          <span>Telemetry Currently Unavailable</span>
        </div>
        <p className="text-xs text-text-secondary">Telemetry stream connection interrupted. Fallback active.</p>
        {onRetry && (
          <button onClick={onRetry} className="mt-3 text-xs font-semibold text-fg-accent hover:underline min-h-[44px]">
            Retry Connection
          </button>
        )}
      </div>
    );
  }

  const healthyNodes = data?.nodeStatus.filter((n) => n.status === "healthy").length ?? 0;
  const totalNodes = data?.nodeStatus.length ?? 0;

  const metrics = [
    { label: "Edge Latency", icon: PhosphorLightning, value: data ? `${Math.round(data.edgeLatencyMs)}` : "--", unit: "ms" },
    { label: "Active Nodes", icon: PhosphorHardDrives, value: `${healthyNodes}/${totalNodes}`, unit: "healthy" },
    { label: "Bundle Gzip", icon: PhosphorCpu, value: data?.bundleSizeKb ? data.bundleSizeKb.toFixed(1) : "--", unit: "KB" },
  ];

  return (
    <div className="linkhunt-card p-4 sm:p-5" role="region" aria-label="System telemetry dashboard">
      <div className="flex flex-col gap-1 mb-3 pb-2.5 border-b border-border-structural">
        <span className="text-xs font-mono font-semibold uppercase tracking-normal text-text-primary whitespace-nowrap">
          Edge Telemetry Snapshot
        </span>
        {lastUpdatedAt && (
          <span className="text-[11px] font-mono text-text-muted">
            Snapshot: Benchmark baseline
          </span>
        )}
      </div>

      {compact ? (
        <div className="space-y-2">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-surface-secondary border border-border-structural text-xs min-w-0">
                <div className="flex items-center gap-2 text-text-secondary font-medium min-w-0">
                  <Icon className="w-3.5 h-3.5 text-status-success shrink-0" />
                  <span className="truncate">{m.label}</span>
                </div>
                <div className="font-mono font-bold text-text-primary whitespace-nowrap shrink-0">
                  {m.value} <span className="font-normal text-text-muted text-[10px]">{m.unit}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="flex items-center justify-between gap-2 sm:block p-2.5 sm:p-3.5 rounded-lg bg-surface-secondary border border-border-structural">
                <div className="flex items-center gap-2 sm:gap-1.5 text-xs text-text-secondary font-medium sm:mb-1">
                  <Icon className="w-3.5 h-3.5 text-status-success shrink-0" />
                  <span>{m.label}</span>
                </div>
                <div className="text-sm sm:text-xl font-bold text-text-primary font-mono whitespace-nowrap">
                  {m.value}
                  <span className="text-[10px] sm:text-xs font-normal text-text-muted ml-1">{m.unit}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[10px] font-mono text-[var(--text-secondary)] pt-2.5 mt-2.5 border-t border-[var(--border-structural)]">
        Simulated telemetry based on Vercel deployment benchmarks and static asset analysis.
      </p>
    </div>
  );
}
