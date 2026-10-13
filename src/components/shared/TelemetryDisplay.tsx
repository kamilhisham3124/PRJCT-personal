import React from "react";
import { VercelTelemetryResponse } from "../../lib/validators/telemetryValidator";

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
        className="border-structural bg-surface-secondary p-4 rounded-none"
        style={{ minHeight: "110px" }}
        role="region"
        aria-label="Live system telemetry"
      >
        <div className="text-xs uppercase tracking-wider text-text-secondary font-mono mb-3">
          Telemetry Snapshot (Initializing)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="h-10 bg-surface-primary border-structural animate-pulse" />
          <div className="h-10 bg-surface-primary border-structural animate-pulse" />
          <div className="h-10 bg-surface-primary border-structural animate-pulse" />
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div
        className="border-structural bg-surface-secondary p-4 rounded-none border-l-4 border-l-accent-signal"
        role="region"
        aria-label="Live system telemetry"
      >
        <div className="text-xs uppercase tracking-wider text-text-secondary font-mono mb-1">
          Telemetry Snapshot (Degraded)
        </div>
        <p className="text-sm text-text-primary">
          Telemetry temporarily unavailable. Retrying automatically.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-xs font-mono underline text-accent-signal hover:opacity-80"
          >
            Retry Verification
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
      className="border-structural bg-surface-secondary p-4 rounded-none"
      role="region"
      aria-label="Live system telemetry"
    >
      <div className="flex justify-between items-center mb-3 border-b border-structural pb-2">
        <div className="text-xs uppercase tracking-wider text-text-secondary font-mono flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-text-primary" />
          Live Telemetry (Edge PoPs)
        </div>
        {lastUpdatedAt && (
          <span className="text-xs font-mono text-text-secondary">
            Sync: {new Date(lastUpdatedAt).toLocaleTimeString()}
          </span>
        )}
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        aria-live="polite"
      >
        <div className="bg-surface-primary p-3 border-structural">
          <div className="text-xs text-text-secondary font-mono mb-1">
            Edge Latency
          </div>
          <div className="text-metric font-mono font-bold text-text-primary">
            {data ? Math.round(data.edgeLatencyMs) : "--"}ms
          </div>
        </div>

        <div className="bg-surface-primary p-3 border-structural">
          <div className="text-xs text-text-secondary font-mono mb-1">
            Bundle Size
          </div>
          <div className="text-metric font-mono font-bold text-text-primary">
            {data ? data.bundleSizeKb.toFixed(1) : "--"}KB
          </div>
        </div>

        <div className="bg-surface-primary p-3 border-structural">
          <div className="text-xs text-text-secondary font-mono mb-1">
            Deployment Nodes
          </div>
          <div className="text-metric font-mono font-bold text-text-primary">
            {healthyNodes} / {totalNodes} healthy
          </div>
        </div>
      </div>
    </div>
  );
}
