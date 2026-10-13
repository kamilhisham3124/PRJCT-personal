import React from "react";
import Link from "next/link";
import { CodeCanvas } from "../../../components/client/CodeCanvas";

export default function LabCanvasPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
        <Link href="/lab" className="hover:text-accent-chemical underline">Lab</Link>
        <span>/</span>
        <span className="text-accent-chemical">Interactive Canvas</span>
      </div>

      <header className="border-b border-structural pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase text-accent-chemical font-bold">
            [ INTERACTIVE SANDBOX // STATE COMPOSITION ]
          </span>
          <div className="font-marginalia text-annotation text-accent-chemical">
            // instantaneous client state execution
          </div>
        </div>
        <h1 className="text-3xl font-extrabold font-display text-text-primary mt-1">
          Component Composition Sandbox
        </h1>
        <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
          Demonstrates modular React component composition and clean client state management.
          Layout switches update the view synchronously via Zustand without network overhead,
          providing smooth interactive responses.
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
            Zustand state store is isolated to this subtree, and state history is
            capped to prevent unbounded memory growth.
          </p>
        </div>

        <div className="border-element bg-surface-secondary p-4">
          <h3 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-2">
            Keyboard Operability
          </h3>
          <p className="text-xs text-text-primary leading-relaxed">
            Fully keyboard navigable with Tab, Enter, and Space. Accessible attributes
            and live regions provide screen-reader parity across assistive technologies.
          </p>
        </div>
      </div>
    </div>
  );
}
