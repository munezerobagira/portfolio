"use client";

import { useRef, useCallback } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: "cyan" | "green";
}

/**
 * Bento card with a cursor-reactive spotlight that traces the border.
 */
export default function SpotlightCard({
  children,
  className = "",
  accentColor = "cyan",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const r = accentColor === "cyan" ? "0, 240, 255" : "0, 204, 68";

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !overlayRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      overlayRef.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(${r}, 0.12), transparent 70%)`;
      overlayRef.current.style.opacity = "1";
    },
    [r]
  );

  const handleMouseLeave = useCallback(() => {
    if (!overlayRef.current) return;
    overlayRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden glass-panel transition-all duration-300 ${className}`}
      style={{
        border: `1px solid rgba(${r}, 0.15)`,
        borderRadius: 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity: 0, borderRadius: "inherit" }}
      />
      {children}
    </div>
  );
}
