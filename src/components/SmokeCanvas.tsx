"use client";

import { useRef, useEffect, useCallback } from "react";

export default function SmokeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.3, y: 0.7 });
  const animRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let t = 0;

    const blob = (
      cx: number,
      cy: number,
      r: number,
      inner: string
    ) => {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, inner);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      /* Base */
      ctx.fillStyle = "#05050a";
      ctx.fillRect(0, 0, W, H);

      t += 0.003;

      /* Large green glow — bottom-left, slow drift */
      blob(
        W * (0.1 + Math.sin(t * 0.6) * 0.08 + mx * 0.04),
        H * (0.78 + Math.cos(t * 0.4) * 0.08 - my * 0.03),
        W * 0.5,
        "rgba(0,255,85,0.10)"
      );

      /* Medium green — bottom-right, opposite phase */
      blob(
        W * (0.85 + Math.cos(t * 0.5) * 0.06 - mx * 0.03),
        H * (0.65 + Math.sin(t * 0.7) * 0.07 - my * 0.02),
        W * 0.38,
        "rgba(0,204,68,0.08)"
      );

      /* Subtle mid-screen drift */
      blob(
        W * (0.5 + Math.sin(t * 0.3) * 0.1),
        H * (0.88 + Math.cos(t * 0.35) * 0.05),
        W * 0.28,
        "rgba(74,222,128,0.06)"
      );

      /* Mouse-reactive highlight */
      blob(W * mx, H * my, W * 0.22, "rgba(0,255,85,0.05)");

      /* Vignette — darken edges */
      const vg = ctx.createRadialGradient(
        W / 2, H / 2, H * 0.25,
        W / 2, H / 2, Math.max(W, H) * 0.82
      );
      vg.addColorStop(0, "transparent");
      vg.addColorStop(1, "rgba(5,5,10,0.88)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      aria-hidden="true"
      style={{ display: "block" }}
    />
  );
}

