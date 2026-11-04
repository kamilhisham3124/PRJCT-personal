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
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
      : layout === "stack"
      ? "flex flex-col gap-2.5"
      : "grid grid-cols-1 md:grid-cols-3 gap-3";

  return (
    <div
      role="group"
      aria-label="Interactive layout demonstration"
      className="bg-zinc-950 text-zinc-100 rounded-xl p-5 sm:p-6 border border-zinc-800 shadow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
          </div>
          <div className="h-4 w-px bg-zinc-800" />
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <Terminal className="w-3.5 h-3.5 text-zinc-300" />
            <span className="text-zinc-200 font-medium">state_engine.tsx</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          {(["grid", "stack", "split"] as CanvasLayout[]).map((mode) => {
            const Icon = mode === "grid" ? LayoutGrid : mode === "stack" ? Rows3 : Columns3;
            const isSelected = layout === mode;
            return (
              <button
                key={mode}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleLayoutSelect(mode)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-zinc-800 text-white font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
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
            className="p-1.5 text-zinc-400 hover:text-white rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className={layoutContainerClass}>
        {SAMPLE_MODULES.map((item, idx) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors ${
              layout === "split" && idx < 2 ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
              <span>node_0{idx + 1}</span>
              <span className="bg-emerald-950/40 text-emerald-400 px-1.5 py-0.5 rounded text-[10px] font-mono border border-emerald-800/40">
                {item.status}
              </span>
            </div>
            <div className="text-sm font-semibold text-white mb-0.5">{item.label}</div>
            <div className="text-xs font-mono text-zinc-400">{item.tech}</div>
          </div>
        ))}
      </div>

      {history.length > 0 && (
        <div className="mt-5 pt-3.5 border-t border-zinc-800 flex items-center gap-2 text-xs font-mono text-zinc-400 overflow-x-auto">
          <span className="text-zinc-500">History:</span>
          {history.map((h, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[11px]">{h}</span>
              {i < history.length - 1 && <span className="text-zinc-600">&rarr;</span>}
            </span>
          ))}
        </div>
      )}

      <div className="sr-only" aria-live="polite">{announcement}</div>
    </div>
  );
}
