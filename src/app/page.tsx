import React from "react";
import Link from "next/link";
import { TelemetryWidget } from "../components/server/TelemetryWidget";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Visual Priority Tier 1: Claim and Live Telemetry (DOC-17 Section 1.0) */}
      <section className="border-structural bg-surface-primary p-6 md:p-10 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-structural pb-3">
          <span className="text-xs font-mono uppercase text-text-secondary tracking-widest">
            Kamil Hisham / Technical Baseline
          </span>
          <span className="text-xs font-mono text-text-secondary">
            Role: Full-Stack Systems Engineer (AI/Infrastructure)
          </span>
        </div>

        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-4xl lg:text-claim font-bold tracking-tight text-text-primary leading-tight font-display mb-4">
            Deterministic, production-grade systems engineered to survive scale.
          </h1>
          <p className="text-base md:text-body text-text-secondary font-display max-w-2xl leading-relaxed">
            Constructing verifiable backend architectures, normalized relational
            schemas, and low-latency edge integrations. Operating in the
            category where unchecked AI-generated prototypes fail under production load.
          </p>
        </div>

        {/* Live Telemetry Snapshot co-located above fold */}
        <div className="pt-2">
          <TelemetryWidget />
        </div>
      </section>

      {/* Primary Action Pathways */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border-structural bg-surface-secondary p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-text-secondary mb-2">
              Verifiable Work
            </div>
            <h2 className="text-heading font-bold text-text-primary mb-2">
              Production Case Studies
            </h2>
            <p className="text-sm text-text-secondary mb-4">
              Explore 12-endpoint REST APIs, role-based access control, and normalized PostgreSQL schemas.
            </p>
          </div>
          <Link
            href="/work"
            className="text-xs font-mono font-bold underline text-text-primary hover:text-text-secondary"
          >
            Review Evidence &gt;
          </Link>
        </div>

        <div className="border-structural bg-surface-secondary p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-text-secondary mb-2">
              Interactive Lab
            </div>
            <h2 className="text-heading font-bold text-text-primary mb-2">
              Architecture Sandbox
            </h2>
            <p className="text-sm text-text-secondary mb-4">
              Inspect client-side component composition toggles with isolated state and zero network round trip.
            </p>
          </div>
          <Link
            href="/lab"
            className="text-xs font-mono font-bold underline text-text-primary hover:text-text-secondary"
          >
            Launch Sandbox &gt;
          </Link>
        </div>

        <div className="border-structural bg-surface-secondary p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-text-secondary mb-2">
              Qualified Contact
            </div>
            <h2 className="text-heading font-bold text-text-primary mb-2">
              Direct Engineering Inquiry
            </h2>
            <p className="text-sm text-text-secondary mb-4">
              Initiate structured technical conversations with immediate verification of credentials and background.
            </p>
          </div>
          <Link
            href="/contact"
            className="text-xs font-mono font-bold underline text-text-primary hover:text-text-secondary"
          >
            Transmit Message &gt;
          </Link>
        </div>
      </section>
    </div>
  );
}
