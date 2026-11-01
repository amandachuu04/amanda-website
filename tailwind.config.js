/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Lavender Desk palette
        blush: {
          50: "#FDFAFF",
          100: "#F6EEFD",
          200: "#ECDDFB",
          300: "#DCC6F7", // primary lilac
          400: "#C7A8F0",
          500: "#A987E3",
        },
        taupe: {
          50: "#F3EFF8",
          100: "#E4DCEF",
          200: "#CBBCE0",
          300: "#A893C7",
          400: "#7E63A8", // primary purple
          500: "#654C8C",
          600: "#4D3A6B",
          700: "#362848",
        },
        cream: {
          50: "#FFFEFF",
          100: "#FBF8FE", // primary background
          200: "#F4EEFB",
        },
        pop: "#F49AC1",
        ink: "#241A30",
      },
      fontFamily: {
        display: ['"Quicksand"', "ui-rounded", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Nunito Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
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
        sticker: "0 8px 24px -8px rgba(101, 76, 140, 0.35), 0 2px 6px -2px rgba(101, 76, 140, 0.2)",
        soft: "0 10px 30px -12px rgba(101, 76, 140, 0.25)",
        card: "0 1px 0 rgba(101, 76, 140, 0.06), 0 12px 28px -16px rgba(101, 76, 140, 0.2)",
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
