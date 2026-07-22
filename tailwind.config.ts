import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        glass:
          "0 30px 90px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.35), inset 0 -1px 0 rgba(255,255,255,.08)",
      },
    },
  },
  plugins: [],
};

export default config;
