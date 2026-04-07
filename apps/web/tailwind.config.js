/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian:   "#111113",
        graphite:   "#1C1C21",
        "graphite-2": "#23232A",
        "graphite-3": "#2B2B34",
        gold:       "#C9A84C",
        "gold-light": "#E0C472",
        "gold-dark":  "#9C7D34",
        platinum:   "#D4D4D8",
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        mono:  ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #C9A84C 0%, #E0C472 50%, #9C7D34 100%)",
        "obsidian-gradient":
          "linear-gradient(to bottom, #111113 0%, #0D0D0F 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 30px rgba(201, 168, 76, 0.15)",
        "inner-dim": "inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      animation: {
        "fade-in":  "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn:  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { transform: "translateY(8px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
      },
    },
  },
  plugins: [],
};
