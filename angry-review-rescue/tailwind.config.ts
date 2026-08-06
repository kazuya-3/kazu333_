import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0b0a0f",
          soft: "#15131c",
          card: "#1a1722",
          border: "#2a2533",
        },
        ink: {
          DEFAULT: "#f5f3ee",
          soft: "#cfc8bd",
          muted: "#8a8294",
          faint: "#5a5466",
        },
        ember: {
          50: "#fff5ed",
          100: "#ffe6d4",
          200: "#ffc7a3",
          300: "#ff9f66",
          400: "#ff7a3a",
          500: "#f55a1f",
          600: "#dc4410",
          700: "#b8330e",
          800: "#8f2a10",
          900: "#702510",
        },
        success: "#5dd39e",
        warning: "#f5b942",
        danger: "#ef5a5a",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Inter",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "ui-sans-serif",
          "system-ui",
          "Inter",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(245,90,31,0.35)",
        card: "0 10px 40px -20px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "radial-warm":
          "radial-gradient(1200px 600px at 50% -200px, rgba(245,90,31,0.18), transparent 60%)",
        "card-gradient":
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        "ember-gradient":
          "linear-gradient(135deg, #ff7a3a 0%, #f55a1f 50%, #dc4410 100%)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out both",
        shimmer: "shimmer 1.8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
