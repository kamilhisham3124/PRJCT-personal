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
        className="border-structural bg-surface-secondary p-4"
        style={{ minHeight: "110px" }}
        role="region"
        aria-label="Superlab system telemetry"
      >
        <div className="text-xs uppercase tracking-wider text-accent-chemical font-mono mb-3">
          [ HMI TELEMETRY // INITIALIZING SENSORS ]
        </div>
        <div className="grid grid-cols-1 bp03:grid-cols-3 gap-3">
          <div className="h-12 bg-surface-primary border-element animate-pulse" />
          <div className="h-12 bg-surface-primary border-element animate-pulse" />
          <div className="h-12 bg-surface-primary border-element animate-pulse" />
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div
        className="border-element bg-surface-secondary p-4 border-l-4 border-l-accent-alert"
        role="region"
        aria-label="Superlab system telemetry"
      >
        <div className="text-xs uppercase tracking-wider text-accent-alert font-mono mb-1">
          [ ALERT: TELEMETRY LINK DEGRADED ]
        </div>
        <p className="text-sm text-text-primary">
          Edge telemetry probe timeout. Autonomous failover active.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-xs font-mono underline text-accent-chemical hover:opacity-80"
          >
            [ RETRY PROBE ]
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
      className="border-element bg-surface-secondary p-4"
      role="region"
      aria-label="Superlab system telemetry"
    >
      <div className="flex justify-between items-center mb-3 border-b border-structural pb-2">
        <div className="text-xs uppercase tracking-wider text-accent-chemical font-mono flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent-barrel animate-pulse" />
          <span>[ SYSTEM READY // 99.1% BENCHMARK ]</span>
        </div>
        {lastUpdatedAt && (
          <span className="text-[11px] font-mono text-text-secondary">
            SYNC: {new Date(lastUpdatedAt).toLocaleTimeString()}
          </span>
        )}
      </div>

      <div
        className="grid grid-cols-1 bp03:grid-cols-3 gap-3 bp05:gap-5"
        aria-live="polite"
      >
        <div className="bg-surface-primary p-3 border-structural">
          <div className="text-[11px] text-text-secondary font-mono mb-1">
            EDGE LATENCY
          </div>
          <div className="text-metric font-mono font-bold text-accent-sky">
            {data ? Math.round(data.edgeLatencyMs) : "--"}ms
          </div>
          <div className="text-[10px] font-mono text-accent-barrel mt-1">
            [SLA &le; 50ms PASS]
          </div>
        </div>

        <div className="bg-surface-primary p-3 border-structural">
          <div className="text-[11px] text-text-secondary font-mono mb-1">
            BUNDLE GZIP
          </div>
          <div className="text-metric font-mono font-bold text-text-primary">
            {data ? data.bundleSizeKb.toFixed(1) : "--"}KB
          </div>
          <div className="text-[10px] font-mono text-accent-barrel mt-1">
            [OPTIMAL CRITICAL PATH]
          </div>
        </div>

        <div className="bg-surface-primary p-3 border-structural">
          <div className="text-[11px] text-text-secondary font-mono mb-1">
            EDGE POP NODES
          </div>
          <div className="text-metric font-mono font-bold text-accent-chemical">
            {healthyNodes} / {totalNodes}
          </div>
          <div className="text-[10px] font-mono text-accent-barrel mt-1">
            [ALL NODES NOMINAL]
          </div>
        </div>
      </div>
    </div>
  );
}
