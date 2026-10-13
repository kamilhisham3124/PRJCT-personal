import { z } from "zod";

export const NodeStatusItemSchema = z.object({
  region: z.string(),
  status: z.enum(["healthy", "degraded", "unavailable"]),
});

export const VercelTelemetryRequestSchema = z.object({
  metricSet: z.enum(["edge_latency", "bundle_size", "node_status"]),
  windowMinutes: z.number().int().positive().optional().default(60),
});

export const VercelTelemetryResponseSchema = z.object({
  edgeLatencyMs: z.number().nonnegative(),
  bundleSizeKb: z.number().nonnegative(),
  nodeStatus: z.array(NodeStatusItemSchema),
  measuredAt: z.string().datetime(),
});

export const TelemetryHistoryPointSchema = z.object({
  timestamp: z.string().datetime(),
  edgeLatencyMs: z.number().nonnegative(),
  bundleSizeKb: z.number().nonnegative(),
});

export type VercelTelemetryRequest = z.infer<typeof VercelTelemetryRequestSchema>;
export type VercelTelemetryResponse = z.infer<typeof VercelTelemetryResponseSchema>;
export type TelemetryHistoryPoint = z.infer<typeof TelemetryHistoryPointSchema>;
