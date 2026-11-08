import React from "react";
import { VercelTelemetryResponse } from "../../lib/validators/telemetryValidator";
import { Zap, Cpu, Server, AlertCircle } from "lucide-react";

export interface TelemetryDisplayProps {
  data?: VercelTelemetryResponse;
  state: "loading" | "success" | "error" | "stale";
  lastUpdatedAt?: string;
  onRetry?: () => void;
}

export function TelemetryDisplay({
  data,
  state,
  lastUpdatedAt,
  onRetry,
}: TelemetryDisplayProps) {
  if (state === "loading") {
    return (
      <div
        className="linkhunt-card p-5"
        style={{ minHeight: "130px" }}
        role="region"
        aria-label="System telemetry dashboard"
      >
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-[var(--text-secondary)] mb-4">
          <span className="animate-spin inline-block w-3 h-3 border-2 border-zinc-400 border-t-transparent rounded-full" />
          <span>Loading edge telemetry...</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="h-16 rounded-lg bg-[var(--surface-secondary)] animate-pulse" />
          <div className="h-16 rounded-lg bg-[var(--surface-secondary)] animate-pulse" />
          <div className="h-16 rounded-lg bg-[var(--surface-secondary)] animate-pulse" />
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div
        className="rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/40 p-5"
        role="region"
        aria-label="System telemetry dashboard"
      >
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 mb-1">
          <AlertCircle className="w-4 h-4" />
          <span>Telemetry Currently Unavailable</span>
        </div>
        <p className="text-xs text-[var(--text-secondary)]">
          Telemetry stream connection interrupted. Fallback active.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 text-xs font-semibold text-[var(--text-primary)] hover:underline min-h-[44px]"
          >
            Retry Connection
          </button>
        )}
      </div>
    );
  }

  const healthyNodes =
    data?.nodeStatus.filter((n) => n.status === "healthy").length ?? 0;
  const totalNodes = data?.nodeStatus.length ?? 0;

  return (
    <div
      className="linkhunt-card p-5"
      role="region"
      aria-label="System telemetry dashboard"
    >
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-[var(--border-structural)]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-primary)]">
            Live Edge Telemetry
          </span>
        </div>
        {lastUpdatedAt && (
          <span className="text-[11px] font-mono text-[var(--text-secondary)]" suppressHydrationWarning>
            {new Date(lastUpdatedAt).toLocaleTimeString()}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" aria-live="polite">
        <div className="p-3.5 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-structural)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium mb-1">
            <Zap className="w-3.5 h-3.5 text-emerald-500" />
            <span>Edge Latency</span>
          </div>
          <div className="text-xl font-bold text-[var(--text-primary)] font-mono">
            {data ? Math.round(data.edgeLatencyMs) : "--"}
            <span className="text-xs font-normal text-[var(--text-secondary)] ml-1">ms</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-structural)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium mb-1">
            <Server className="w-3.5 h-3.5 text-emerald-500" />
            <span>Active Nodes</span>
          </div>
          <div className="text-xl font-bold text-[var(--text-primary)] font-mono">
            {healthyNodes}/{totalNodes}
            <span className="text-xs font-normal text-[var(--text-secondary)] ml-1">healthy</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-structural)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium mb-1">
            <Cpu className="w-3.5 h-3.5 text-emerald-500" />
            <span>Bundle Gzip</span>
          </div>
          <div className="text-xl font-bold text-[var(--text-primary)] font-mono">
            {data?.bundleSizeKb ? data.bundleSizeKb.toFixed(1) : "--"}
            <span className="text-xs font-normal text-[var(--text-secondary)] ml-1">KB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
