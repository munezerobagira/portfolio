import React from "react";

interface CornerFrameProps {
  children: React.ReactNode;
  className?: string;
  /** Corner leg length in px (default: 14) */
  size?: number;
  color?: string;
}

const positions = ["tl", "tr", "bl", "br"] as const;
type Corner = (typeof positions)[number];

const cornerStyles: Record<Corner, React.CSSProperties> = {
  tl: { top: 0, left: 0, borderTop: "1px solid", borderLeft: "1px solid" },
  tr: { top: 0, right: 0, borderTop: "1px solid", borderRight: "1px solid" },
  bl: { bottom: 0, left: 0, borderBottom: "1px solid", borderLeft: "1px solid" },
  br: { bottom: 0, right: 0, borderBottom: "1px solid", borderRight: "1px solid" },
};

/**
 * Wraps children with short right-angled corner bracket decorations.
 * Apply to any container to get a subtle framing effect.
 */
export default function CornerFrame({
  children,
  className = "",
  size = 14,
  color = "rgba(0,255,85,0.45)",
}: CornerFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {positions.map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderColor: color,
            pointerEvents: "none",
            zIndex: 1,
            ...cornerStyles[pos],
          }}
        />
      ))}
      {children}
    </div>
  );
}
