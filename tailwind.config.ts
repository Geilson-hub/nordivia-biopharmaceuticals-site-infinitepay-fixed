import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        graphite: "#0B0F17",
        maple: "#D3202E",
        tech: "#AAB2C0"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.10)",
      }
    },
  },
  plugins: [],
} satisfies Config;
