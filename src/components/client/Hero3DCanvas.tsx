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

    let animId: number;
    const dpr = window.devicePixelRatio || 1;
    const size = 100;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let angleX = 0.4;
    let angleY = 0.6;
    let speedX = 0.012;
    let speedY = 0.016;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const my = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      speedX = my * 0.04;
      speedY = mx * 0.04;
    };

    const handleMouseLeave = () => {
      speedX = 0.012;
      speedY = 0.016;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      angleX += speedX;
      angleY += speedY;

      ctx.clearRect(0, 0, size, size);
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const strokeColor = isDark ? "#64748B" : "#94A3B8";
      const vertexColor = isDark ? "#94A3B8" : "#475569";
      const scale = 30;

      const projected = VERTICES.map(([x, y, z]) => {
        // Rotate Y
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // Rotate X
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const f = 200;
        const pScale = f / (f + z2 * scale + 60);
        return {
          px: size / 2 + x1 * scale * pScale,
          py: size / 2 + y2 * scale * pScale,
          pScale,
        };
      });

      // Draw wireframe edges
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = strokeColor;
      for (const [s, e] of EDGES) {
        ctx.beginPath();
        ctx.moveTo(projected[s].px, projected[s].py);
        ctx.lineTo(projected[e].px, projected[e].py);
        ctx.stroke();
      }

      // Draw glowing vertices
      for (const pt of projected) {
        ctx.fillStyle = vertexColor;
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, 2.5 * pt.pScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw center monogram
      ctx.fillStyle = isDark ? "#FFFFFF" : "#0F172A";
      ctx.font = "bold 13px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("KH", size / 2, size / 2);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative group cursor-pointer w-24 h-24 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-structural)] shadow-card flex items-center justify-center transition-transform hover:scale-105">
      <canvas
        ref={canvasRef}
        style={{ width: 100, height: 100 }}
        aria-label="Interactive 3D Systems Logo"
        className="block"
      />
    </div>
  );
}
