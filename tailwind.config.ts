import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Navy — primary. Authority, precision.
        navy: {
          DEFAULT: "#0A1F33",
          50: "#EAF0F6",
          100: "#CBDBE8",
          400: "#2C4A66",
          600: "#0F2A45",
          700: "#0A1F33",
          900: "#071627",
        },
        // Medical Blue — secondary. Clinical, calm.
        clinical: {
          DEFAULT: "#3E7CA6",
          50: "#EFF5F9",
          200: "#BFDAEA",
          500: "#3E7CA6",
          600: "#2F6386",
        },
        // Mint — accent. Used sparingly: CTAs, highlights, success.
        mint: {
          DEFAULT: "#4FBF98",
          50: "#EAF9F3",
          200: "#B9E9D6",
          500: "#4FBF98",
          600: "#3AA37F",
          700: "#2C8267",
        },
        // Warm White — background.
        warm: {
          DEFAULT: "#FAF7F2",
          100: "#FFFFFF",
        },
        // Light Gray — surface.
        surface: {
          DEFAULT: "#F0EDE6",
          soft: "#F6F4EF",
        },
        // Charcoal — text.
        ink: {
          DEFAULT: "#1C2126",
          muted: "#5B6470",
          faint: "#8B93A0",
        },
        line: "#E3DFD6",
      },
      fontFamily: {
        display: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        eyebrow: "0.18em",
      },
      maxWidth: {
        content: "1360px",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,31,51,0.04), 0 12px 32px -12px rgba(10,31,51,0.12)",
        "card-hover": "0 4px 10px rgba(10,31,51,0.06), 0 24px 48px -16px rgba(10,31,51,0.18)",
        nav: "0 1px 0 rgba(10,31,51,0.06), 0 16px 40px -24px rgba(10,31,51,0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-arc": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 32s linear infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
