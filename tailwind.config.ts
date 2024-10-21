import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        "geist-mono": "var(--font-geist-mono)",
        "geist-sans": "var(--font-geist-sans)",
      },
    },
  },
  plugins: [],
};
export default config;
