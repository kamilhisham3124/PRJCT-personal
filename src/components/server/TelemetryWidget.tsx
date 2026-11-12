import React from "react";
import { vercelTelemetryAccessor } from "../../lib/accessors/vercelTelemetryAccessor";
import { TelemetryDisplay } from "../shared/TelemetryDisplay";

export interface TelemetryWidgetProps {
  initialState?: "loading" | "success" | "error" | "stale";
  compact?: boolean;
}

export async function TelemetryWidget({
  initialState,
  compact,
}: TelemetryWidgetProps = {}) {
  if (initialState === "loading") {
    return <TelemetryDisplay state="loading" compact={compact} />;
  }

  const result = await vercelTelemetryAccessor({
    metricSet: "edge_latency",
    windowMinutes: 60,
  });

  if (!result.ok) {
    return <TelemetryDisplay state="error" compact={compact} />;
  }

  return (
    <TelemetryDisplay
      state="success"
      data={result.data}
      lastUpdatedAt={result.data.measuredAt}
      compact={compact}
    />
  );
}
