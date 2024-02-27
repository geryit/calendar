import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-work-sans)"],
        fjalla: ["var(--font-fjalla)"],
        libre: ["var(--font-libre)"],
      },
      colors: {
        green: {
          450: "rgb(93, 175, 116)",
        },
        black: {
          80: "rgba(0, 0, 0, 0.8)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
