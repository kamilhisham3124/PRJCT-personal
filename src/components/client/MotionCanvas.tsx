"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  baseX: number;
  baseY: number;
  baseZ: number;
}

const COUNT = 36;
const FOCAL_LENGTH = 320;

export function MotionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouseX = 0;
    let mouseY = 0;
    let rotX = 0;
    let rotY = 0;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const points: Point3D[] = [];
    const radius = Math.min(width, height) * 0.32;
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.acos(2 * (i / COUNT) - 1);
      const phi = Math.sqrt(COUNT * Math.PI) * theta;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      points.push({ baseX: x, baseY: y, baseZ: z });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.0003;
      mouseY = (e.clientY - height / 2) * 0.0003;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      rotX += 0.002 + mouseY;
      rotY += 0.003 + mouseX;

      ctx.clearRect(0, 0, width, height);
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const nodeColor = isDark ? "rgba(230, 230, 240, " : "rgba(30, 30, 45, ";
      const lineColor = isDark ? "rgba(160, 160, 185, " : "rgba(90, 90, 110, ";

      const projected = points.map((p) => {
        const x1 = p.baseX * Math.cos(rotY) + p.baseZ * Math.sin(rotY);
        const z1 = -p.baseX * Math.sin(rotY) + p.baseZ * Math.cos(rotY);
        const y2 = p.baseY * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = p.baseY * Math.sin(rotX) + z1 * Math.cos(rotX);

        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + z2 + 360);
        return {
          x: width / 2 + x1 * scale,
          y: height / 2 + y2 * scale,
          scale,
          alpha: Math.max(0.12, Math.min(0.75, (z2 + radius) / (2 * radius))),
        };
      });

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            const lineAlpha = (1 - dist / 115) * 0.16;
            ctx.strokeStyle = `${lineColor}${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      for (const pt of projected) {
        ctx.fillStyle = `${nodeColor}${pt.alpha * 0.65})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, Math.max(1, 2.2 * pt.scale), 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 w-full h-full opacity-40 dark:opacity-25"
    />
  );
}
