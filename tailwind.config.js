module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        void: "#05050A",
        "neon-cyan": "#00ff55",
        "neon-magenta": "#FF003C",
        "border-subtle": "rgba(255,255,255,0.1)",
      },
      fontFamily: {
        display: ["'Clash Display'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        prose: ["'Inter'", "sans-serif"],
      },
      keyframes: {
        "slide-left": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-100%)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-left": "slide-left 120s linear alternate infinite",
        "slide-right": "slide-left 120s linear alternate-reverse infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("daisyui")],
};

