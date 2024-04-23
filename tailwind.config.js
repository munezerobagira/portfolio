module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      keyframes: {
        "slide-left": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "slide-left": "slide-left 120s linear alternate infinite",
        "slide-right": "slide-left 120s linear alternate-reverse infinite",
      }
    },
  },
  plugins: [require("daisyui")],
};

