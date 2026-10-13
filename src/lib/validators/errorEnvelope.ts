import { z } from "zod";

export const ErrorTypeEnum = z.enum([
  "repository_not_found",
  "rate_limited",
  "auth_failure",
  "upstream_unavailable",
  "schema_invalid",
  "network_failure",
]);

export const AccessorErrorEnvelopeSchema = z.object({
  errorType: ErrorTypeEnum,
  occurredAt: z.string().datetime(),
  retryable: z.boolean(),
});

export type AccessorErrorEnvelope = z.infer<typeof AccessorErrorEnvelopeSchema>;
