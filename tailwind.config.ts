import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        auteuil: {
          bg: "#0b0f14",
          accent: "#5ec8ff",
          hot: "#ff4d6d",
        },
      },
    },
  },
  plugins: [],
};

export default config;
