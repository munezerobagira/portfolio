"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "#05050a" }}
    >
      {/* Background gradient */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(0,204,68,0.10) 0%, transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(0,255,85,0.06) 0%, transparent 50%), #05050a",
        }}
      />

      <div className="text-center max-w-lg">
        {/* Code label */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-6 h-px" style={{ background: "#00ff55" }} />
          <span
            className="font-mono text-xs uppercase tracking-[0.25em]"
            style={{ color: "#00ff55" }}
          >
            Error · 500
          </span>
          <span className="w-6 h-px" style={{ background: "#00ff55" }} />
        </div>

        {/* Headline */}
        <h1
          className="font-display font-bold mb-4"
          style={{
            fontSize: "clamp(4rem, 12vw, 8rem)",
            letterSpacing: "-0.04em",
            color: "#4ade80",
            textShadow:
              "0 0 40px rgba(74,222,128,0.4), 0 0 80px rgba(74,222,128,0.2)",
            lineHeight: 1,
          }}
        >
          Oops.
        </h1>

        <h2 className="font-display font-semibold text-xl text-white mb-3">
          Something went wrong
        </h2>

        <p className="font-prose text-white/50 text-sm leading-relaxed mb-10">
          An unexpected error occurred. You can try to recover or navigate back
          to safety.
        </p>

        {/* Error details */}
        <div
          className="glass-panel p-4 mb-10 text-left"
          style={{ borderColor: "rgba(0,255,85,0.12)" }}
        >
          <p className="font-mono text-xs text-white/30 mb-1">
            <span style={{ color: "#00ff55" }}>$</span> runtime exception
          </p>
          <p className="font-mono text-xs text-white/50 line-clamp-2">
            {error.message || "An unexpected error occurred."}
          </p>
          {error.digest && (
            <p className="font-mono text-[10px] text-white/20 mt-2">
              digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={reset}
            className="cta-primary font-mono text-sm px-6 py-3 transition-all duration-200"
          >
            [ Try Again ]
          </button>
          <Link
            href="/"
            className="cta-vault font-mono text-sm px-6 py-3 transition-all duration-200"
          >
            [ Return Home ]
          </Link>
        </div>
      </div>
    </div>
  );
}
