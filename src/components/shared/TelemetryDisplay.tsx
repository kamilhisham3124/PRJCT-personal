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
        className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
        style={{ minHeight: "130px" }}
        role="region"
        aria-label="System telemetry dashboard"
      >
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-accent-brand mb-4">
          <span className="animate-spin inline-block w-3 h-3 border-2 border-accent-brand border-t-transparent rounded-full" />
          <span>INITIALIZING_EDGE_SENSORS...</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="h-16 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
          <div className="h-16 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
          <div className="h-16 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div
        className="rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/40 p-5 shadow-sm"
        role="region"
        aria-label="System telemetry dashboard"
      >
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 mb-1">
          <AlertCircle className="w-4 h-4" />
          <span>EDGE_TELEMETRY_DEGRADED</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Telemetry stream connection interrupted. Fallback active.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 text-xs font-semibold text-accent-brand hover:underline"
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
      className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-colors"
      role="region"
      aria-label="System telemetry dashboard"
    >
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Live Edge Telemetry
          </span>
        </div>
        {lastUpdatedAt && (
          <span className="text-[11px] font-mono text-slate-400">
            {new Date(lastUpdatedAt).toLocaleTimeString()}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" aria-live="polite">
        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <Zap className="w-3.5 h-3.5 text-accent-brand" />
            <span>Edge Latency</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {data ? Math.round(data.edgeLatencyMs) : "--"}
            <span className="text-xs font-normal text-slate-400 ml-1">ms</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <Cpu className="w-3.5 h-3.5 text-accent-brand" />
            <span>Gzip Bundle</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {data ? data.bundleSizeKb.toFixed(1) : "--"}
            <span className="text-xs font-normal text-slate-400 ml-1">KB</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <Server className="w-3.5 h-3.5 text-emerald-500" />
            <span>Active PoPs</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {healthyNodes}
            <span className="text-xs font-normal text-slate-400 ml-1">/ {totalNodes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
