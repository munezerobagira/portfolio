export default function Loading() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: "#05050a", zIndex: 9999 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(0,204,68,0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(0,255,85,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo */}
        <span
          className="font-display font-bold tracking-widest text-2xl"
          style={{
            color: "#00ff55",
            textShadow: "0 0 20px rgba(0,255,85,0.5)",
            letterSpacing: "0.2em",
          }}
        >
          MBAGS
        </span>

        {/* Animated dots */}
        <div className="flex items-center gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="loading-dot rounded-full"
              style={{
                width: "6px",
                height: "6px",
                background: "#00ff55",
                boxShadow: "0 0 8px rgba(0,255,85,0.8)",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        {/* Label */}
        <p
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(0,255,85,0.4)" }}
        >
          Loading
        </p>
      </div>
    </div>
  );
}
