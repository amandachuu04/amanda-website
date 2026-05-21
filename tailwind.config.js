/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Pink Champagne palette
        blush: {
          50: "#FFFAF5",
          100: "#FDEDED",
          200: "#FBDADA",
          300: "#F8C8C8", // primary baby pink
          400: "#EFAEAE",
          500: "#E08F8F",
        },
        taupe: {
          50: "#F4EEE8",
          100: "#E5D8CC",
          200: "#C9B5A4",
          300: "#A88D78",
          400: "#8B6F5C", // primary warm taupe
          500: "#6E5544",
          600: "#523F33",
          700: "#3A2C24",
        },
        cream: {
          50: "#FFFDF9",
          100: "#FFFAF5", // primary cream
          200: "#FDF3EA",
        },
        ink: "#2A211C",
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
      },
      borderRadius: {
        pill: "9999px",
      },
      boxShadow: {
        sticker: "0 8px 24px -8px rgba(139, 111, 92, 0.35), 0 2px 6px -2px rgba(139, 111, 92, 0.2)",
        soft: "0 10px 30px -12px rgba(139, 111, 92, 0.25)",
        card: "0 1px 0 rgba(139, 111, 92, 0.06), 0 12px 28px -16px rgba(139, 111, 92, 0.2)",
      },
      keyframes: {
        "blob-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 30px) scale(0.95)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        "blob-drift": "blob-drift 14s ease-in-out infinite",
        wiggle: "wiggle 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
