import React from "react";
import { vercelTelemetryAccessor } from "../../lib/accessors/vercelTelemetryAccessor";
import { TelemetryDisplay } from "../shared/TelemetryDisplay";

export interface TelemetryWidgetProps {
  initialState?: "loading" | "success" | "error" | "stale";
}

export async function TelemetryWidget({
  initialState,
}: TelemetryWidgetProps = {}) {
  if (initialState === "loading") {
    return <TelemetryDisplay state="loading" />;
  }

  const result = await vercelTelemetryAccessor({
    metricSet: "edge_latency",
    windowMinutes: 60,
  });

  if (!result.ok) {
    return <TelemetryDisplay state="error" />;
  }

  return (
    <TelemetryDisplay
      state="success"
      data={result.data}
      lastUpdatedAt={result.data.measuredAt}
    />
  );
}
