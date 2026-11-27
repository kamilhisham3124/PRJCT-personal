"use client";

import React, { useEffect, useRef } from "react";

interface Node3D {
  originX: number;
  originY: number;
  originZ: number;
}

const COLS = 12, ROWS = 8, FOCAL = 340;

function hexToRgbPrefix(hex: string, fallback: string): string {
  const clean = hex.trim().replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return fallback;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, `;
}

export function MotionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouseX = width / 2, mouseY = height / 2, time = 0;

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      return {
        point: hexToRgbPrefix(s.getPropertyValue("--accent-primary"), "rgba(12, 116, 100, "),
        link: hexToRgbPrefix(s.getPropertyValue("--border-highlight"), "rgba(104, 118, 138, "),
      };
    };

    let colors = readColors();
    const observer = new MutationObserver(() => { colors = readColors(); });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onMqChange = () => { colors = readColors(); };
    mq.addEventListener("change", onMqChange);

    const nodes: Node3D[] = [];
    const spacingX = Math.max(70, width / (COLS - 1));
    const spacingY = Math.max(60, height / (ROWS - 1));
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        nodes.push({ originX: (c - (COLS - 1) / 2) * spacingX, originY: (r - (ROWS - 1) / 2) * spacingY, originZ: 0 });
      }
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const drawSegment = (a: { px: number; py: number; alpha: number }, b: { px: number; py: number; alpha: number }) => {
      const segAlpha = ((a.alpha + b.alpha) / 2) * 0.22;
      if (segAlpha <= 0.004) return;
      ctx.strokeStyle = `${colors.link}${segAlpha})`;
      ctx.beginPath(); ctx.moveTo(a.px, a.py); ctx.lineTo(b.px, b.py); ctx.stroke();
    };

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);
      const gutterX = width < 640 ? 16 : 0;
      const safeRight = width - gutterX;
      const cosY = Math.cos(((mouseX - width / 2) / width) * 0.35), sinY = Math.sin(((mouseX - width / 2) / width) * 0.35);
      const cosX = Math.cos(-((mouseY - height / 2) / height) * 0.25), sinX = Math.sin(-((mouseY - height / 2) / height) * 0.25);

      const projected = nodes.map((n) => {
        const z = n.originZ + Math.sin(time + n.originX * 0.005 + n.originY * 0.005) * 45;
        const x1 = n.originX * cosY + z * sinY, z1 = -n.originX * sinY + z * cosY;
        const y2 = n.originY * cosX - z1 * sinX, z2 = n.originY * sinX + z1 * cosX;
        const scale = FOCAL / (FOCAL + z2 + 420), px = width / 2 + x1 * scale;
        const fade = gutterX === 0 ? 1 : Math.max(0, Math.min(1, Math.min(px - gutterX, safeRight - px) / 24));
        return { px, py: height / 2 + y2 * scale, scale, alpha: Math.max(0.15, Math.min(0.85, (z2 + 100) / 160)) * fade };
      });

      ctx.save(); ctx.beginPath(); ctx.rect(gutterX, 0, Math.max(0, safeRight - gutterX), height); ctx.clip(); ctx.lineWidth = 1;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = r * COLS + c;
          if (c < COLS - 1) drawSegment(projected[i], projected[i + 1]);
          if (r < ROWS - 1) drawSegment(projected[i], projected[i + COLS]);
        }
      }
      for (const p of projected) {
        if (p.alpha <= 0.01) continue;
        ctx.fillStyle = `${colors.point}${p.alpha * 0.65})`;
        ctx.beginPath(); ctx.arc(p.px, p.py, Math.max(1.2, 2.3 * p.scale), 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      mq.removeEventListener("change", onMqChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 w-full h-full opacity-55 dark:opacity-35"
    />
  );
}
