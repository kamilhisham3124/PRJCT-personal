"use client";

import React, { useEffect, useState } from "react";
import { useCanvasStore, CanvasLayout } from "../../lib/stores/canvasStore";
import { LayoutGrid, Rows3, Columns3, RotateCcw, Terminal } from "lucide-react";

export interface CodeCanvasProps {
  initialLayout: CanvasLayout;
  onLayoutChange?: (layout: CanvasLayout) => void;
}

const SAMPLE_MODULES = [
  { id: "mod-1", label: "Auth Middleware", tech: "DRF Session Auth", status: "Active" },
  { id: "mod-2", label: "Audit Logger", tech: "PostgreSQL Trigger", status: "Sync" },
  { id: "mod-3", label: "Task State Machine", tech: "Model Lifecycle", status: "Active" },
  { id: "mod-4", label: "REST Serializer", tech: "DRF ModelSerializer", status: "Ready" },
  { id: "mod-5", label: "Role Dispatcher", tech: "RBAC Controller", status: "Active" },
  { id: "mod-6", label: "Telemetry Probe", tech: "Edge Latency Header", status: "Stream" },
];

export function CodeCanvas({ initialLayout, onLayoutChange }: CodeCanvasProps) {
  const { layout, history, setLayout, reset, initialize } = useCanvasStore();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const isNarrow = typeof window !== "undefined" && window.innerWidth < 1024;
    const resolved = isNarrow ? "stack" : initialLayout;
    initialize(resolved);
  }, [initialLayout, initialize]);

  const handleLayoutSelect = (next: CanvasLayout) => {
    setLayout(next);
    setAnnouncement(`Layout changed to ${next}`);
    onLayoutChange?.(next);
  };

  const layoutContainerClass =
    layout === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      : layout === "stack"
      ? "flex flex-col gap-3"
      : "grid grid-cols-1 md:grid-cols-3 gap-4";

  return (
    <div
      role="group"
      aria-label="Interactive layout demonstration"
      className="bg-[#0A2540] text-white rounded-xl p-5 sm:p-7 shadow-stripe border border-slate-800"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span className="text-white font-semibold">state_engine.tsx</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-full border border-slate-800">
          {(["grid", "stack", "split"] as CanvasLayout[]).map((mode) => {
            const Icon = mode === "grid" ? LayoutGrid : mode === "stack" ? Rows3 : Columns3;
            const isSelected = layout === mode;
            return (
              <button
                key={mode}
                type="button"
                role="button"
                aria-pressed={isSelected}
                onClick={() => handleLayoutSelect(mode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-accent-brand text-white shadow-stripe-btn"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="capitalize">{mode}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={reset}
            title="Reset sandbox"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className={layoutContainerClass}>
        {SAMPLE_MODULES.map((item, idx) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/50 transition-all ${
              layout === "split" && idx < 2 ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
              <span className="text-cyan-400">node_0{idx + 1}</span>
              <span className="bg-emerald-950/60 text-emerald-400 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border border-emerald-800/40">
                {item.status}
              </span>
            </div>
            <div className="text-sm font-bold text-white mb-1">{item.label}</div>
            <div className="text-xs font-mono text-slate-400">{item.tech}</div>
          </div>
        ))}
      </div>

      {history.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-mono text-slate-400 overflow-x-auto">
          <span className="text-slate-500">History:</span>
          {history.map((h, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px]">{h}</span>
              {i < history.length - 1 && <span className="text-slate-600">&rarr;</span>}
            </span>
          ))}
        </div>
      )}

      <div className="sr-only" aria-live="polite">{announcement}</div>
    </div>
  );
}
