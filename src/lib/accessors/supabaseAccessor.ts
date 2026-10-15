import { AccessorResult } from "./githubAccessor";

export interface TelemetryAggregateItem {
  metric_key: "total_page_views" | "total_canvas_interactions";
  metric_value: number;
  last_computed_at: string;
}

// In-memory store for development environment
let memoryStore: Record<string, number> = {
  total_page_views: 1420,
  total_canvas_interactions: 388,
};

let contactMessagesStore: Array<{
  id: string;
  name: string;
  email: string;
  message: string;
  submitted_at: string;
}> = [];

export async function supabaseReadAggregate(): Promise<
  AccessorResult<TelemetryAggregateItem[]>
> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        error: {
          errorType: "upstream_unavailable",
          occurredAt: new Date().toISOString(),
          retryable: false,
        },
      };
    }
    // Local dev mode: return typed in-memory aggregates
    const now = new Date().toISOString();
    const metrics: TelemetryAggregateItem[] = [
      {
        metric_key: "total_page_views",
        metric_value: memoryStore.total_page_views,
        last_computed_at: now,
      },
      {
        metric_key: "total_canvas_interactions",
        metric_value: memoryStore.total_canvas_interactions,
        last_computed_at: now,
      },
    ];
    return { ok: true, data: metrics };
  }

  try {
    const res = await fetch(`${url}/rest/v1/telemetry_aggregate?select=*`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return {
        ok: false,
        error: {
          errorType: "upstream_unavailable",
          occurredAt: new Date().toISOString(),
          retryable: true,
        },
      };
    }

    const data = await res.json();
    return { ok: true, data };
  } catch (err) {
    return {
      ok: false,
      error: {
        errorType: "network_failure",
        occurredAt: new Date().toISOString(),
        retryable: true,
      },
    };
  }
}

export async function supabaseInsertContactMessage(data: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    contactMessagesStore.push({
      id: `local-${Date.now()}`,
      ...data,
      submitted_at: new Date().toISOString(),
    });
    return true;
  }

  try {
    const res = await fetch(`${url}/rest/v1/contact_messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        ...data,
        submitted_at: new Date().toISOString(),
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[supabaseAccessor] insertContactMessage network failure:", err);
    return false;
  }
}
