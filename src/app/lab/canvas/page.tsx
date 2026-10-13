import React from "react";
import Link from "next/link";
import { CodeCanvas } from "../../../components/client/CodeCanvas";

export default function LabCanvasPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
        <Link href="/lab" className="hover:text-accent-chemical underline">Lab</Link>
        <span>/</span>
        <span className="text-accent-chemical">Canvas (RT-06)</span>
      </div>

      <header className="border-b border-structural pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase text-accent-chemical font-bold">
            [ ARCHITECTURE SANDBOX // CLIENT STATE COMPOSITION ]
          </span>
          <div className="font-marginalia text-annotation text-accent-chemical">
            // zero server round-trip: 0ms network latency
          </div>
        </div>
        <h1 className="text-3xl font-extrabold font-display text-text-primary mt-1">
          Component Composition Sandbox
        </h1>
        <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
          Proves understanding of React component composition and state boundaries.
          Layout switches update the DOM synchronously via Zustand with zero server
          round trips, satisfying INP &le; 40ms.
        </p>
      </header>

      {/* Interactive Playground Unit */}
      <CodeCanvas initialLayout="grid" />

      {/* Architectural Justification Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="border-element bg-surface-secondary p-4">
          <h3 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-2">
            Deterministic Latency
          </h3>
          <p className="text-xs text-text-primary leading-relaxed">
            Zero network dependency once mounted. The canvas continues functioning
            identically when offline, isolating presentation from network jitter.
          </p>
        </div>

        <div className="border-element bg-surface-secondary p-4">
          <h3 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-2">
            State Isolation
          </h3>
          <p className="text-xs text-text-primary leading-relaxed">
            Zustand canvasStore is isolated to this subtree. No global pollution,
            and history is capped at 10 items to prevent unbounded memory leaks.
          </p>
        </div>

        <div className="border-element bg-surface-secondary p-4">
          <h3 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-2">
            Keyboard Operability
          </h3>
          <p className="text-xs text-text-primary leading-relaxed">
            100% keyboard navigable with Tab, Enter, Space. ARIA pressed states
            and polite live regions provide screen-reader parity per WCAG 2.2 AA.
          </p>
        </div>
      </div>
    </div>
  );
}
