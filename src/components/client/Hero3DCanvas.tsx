"use client";

import React, { useEffect, useRef } from "react";

const VERTICES: [number, number, number][] = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1],  [1, -1, 1],  [1, 1, 1],  [-1, 1, 1],
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

export function Hero3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const dpr = window.devicePixelRatio || 1;
    const size = 100;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let angleX = 0.42;
    let angleY = 0.62;
    let speedX = 0.011;
    let speedY = 0.015;

    const readPalette = () => {
      const s = getComputedStyle(document.documentElement);
      return {
        stroke: s.getPropertyValue("--border-highlight").trim() || "#68768A",
        vertex: s.getPropertyValue("--fg-accent").trim() || "#095C4F",
        ink: s.getPropertyValue("--text-primary").trim() || "#0F141C",
      };
    };

    let palette = readPalette();
    const isReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (advance: boolean) => {
      if (advance) {
        angleX += speedX;
        angleY += speedY;
      }
      ctx.clearRect(0, 0, size, size);
      const scale = 30;
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);

      const projected = VERTICES.map(([x, y, z]) => {
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const pScale = 200 / (200 + z2 * scale + 60);
        return { px: size / 2 + x1 * scale * pScale, py: size / 2 + y2 * scale * pScale, pScale };
      });

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = palette.stroke;
      for (const [s, e] of EDGES) {
        ctx.beginPath();
        ctx.moveTo(projected[s].px, projected[s].py);
        ctx.lineTo(projected[e].px, projected[e].py);
        ctx.stroke();
      }

      ctx.fillStyle = palette.vertex;
      for (const pt of projected) {
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, 2.4 * pt.pScale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = palette.ink;
      ctx.font = "bold 13px 'Red Hat Display', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("KH", size / 2, size / 2);
    };

    const tick = () => {
      draw(true);
      if (!isReducedMotion()) animId = requestAnimationFrame(tick);
    };

    const refreshTheme = () => {
      palette = readPalette();
      if (isReducedMotion()) draw(false);
    };

    const observer = new MutationObserver(refreshTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", refreshTheme);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      speedX = ((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 0.04;
      speedY = ((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 0.04;
    };
    const onLeave = () => { speedX = 0.011; speedY = 0.015; };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    if (isReducedMotion()) draw(false); else tick();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      mq.removeEventListener("change", refreshTheme);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="relative group cursor-pointer w-[100px] h-[100px] rounded-2xl bg-surface-elevated border border-border-structural shadow-card flex items-center justify-center transition-transform hover:scale-105 shrink-0">
      <canvas ref={canvasRef} width={100} height={100} aria-label="Interactive 3D Systems Logo" className="block w-[100px] h-[100px]" />
    </div>
  );
}
