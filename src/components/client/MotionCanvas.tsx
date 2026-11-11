"use client";

import React, { useEffect, useRef } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  originX: number;
  originY: number;
  originZ: number;
}

const COLS = 12, ROWS = 8, FOCAL = 340;

export function MotionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth), height = (canvas.height = window.innerHeight);
    let mouseX = width / 2, mouseY = height / 2, time = 0;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    let isDark = themeQuery.matches;
    const handleTheme = (e: MediaQueryListEvent) => { isDark = e.matches; };
    themeQuery.addEventListener("change", handleTheme);

    const nodes: Node3D[] = [];
    const spacingX = Math.max(70, width / (COLS - 1));
    const spacingY = Math.max(60, height / (ROWS - 1));

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const ox = (c - (COLS - 1) / 2) * spacingX;
        const oy = (r - (ROWS - 1) / 2) * spacingY;
        nodes.push({ x: ox, y: oy, z: 0, originX: ox, originY: oy, originZ: 0 });
      }
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const pointColor = isDark ? "rgba(240, 240, 255, " : "rgba(30, 41, 59, ";
      const linkColor = isDark ? "rgba(148, 163, 184, " : "rgba(100, 116, 139, ";

      const targetRotY = ((mouseX - width / 2) / width) * 0.35;
      const targetRotX = -((mouseY - height / 2) / height) * 0.25;

      const projected = nodes.map((n) => {
        const wave = Math.sin(time + n.originX * 0.005 + n.originY * 0.005) * 45;
        const currZ = n.originZ + wave;

        const x1 = n.originX * Math.cos(targetRotY) + currZ * Math.sin(targetRotY);
        const z1 = -n.originX * Math.sin(targetRotY) + currZ * Math.cos(targetRotY);
        const y2 = n.originY * Math.cos(targetRotX) - z1 * Math.sin(targetRotX);
        const z2 = n.originY * Math.sin(targetRotX) + z1 * Math.cos(targetRotX);

        const scale = FOCAL / (FOCAL + z2 + 420);
        const px = width / 2 + x1 * scale;
        const py = height / 2 + y2 * scale;
        const alpha = Math.max(0.15, Math.min(0.85, (z2 + 100) / 160));

        return { px, py, scale, alpha };
      });

      // Draw horizontal & vertical structural lattice connections
      ctx.lineWidth = 1;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          const p1 = projected[idx];

          if (c < COLS - 1) {
            const p2 = projected[idx + 1];
            const lineAlpha = ((p1.alpha + p2.alpha) / 2) * 0.22;
            ctx.strokeStyle = `${linkColor}${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }

          if (r < ROWS - 1) {
            const p3 = projected[idx + COLS];
            const lineAlpha = ((p1.alpha + p3.alpha) / 2) * 0.22;
            ctx.strokeStyle = `${linkColor}${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p3.px, p3.py);
            ctx.stroke();
          }
        }
      }

      // Draw responsive nodes with dynamic depth glow
      for (const p of projected) {
        ctx.fillStyle = `${pointColor}${p.alpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(1.2, 2.5 * p.scale), 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      themeQuery.removeEventListener("change", handleTheme);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 w-full h-full opacity-65 dark:opacity-45"
    />
  );
}
