import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F172A",
          foreground: "#E0F2FE"
        },
        accent: {
          DEFAULT: "#1D4ED8",
          foreground: "#F8FAFC"
        }
      }
    }
  }
};

export default config;
