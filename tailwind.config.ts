import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Theme-aware custom colors via CSS variables
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        border: "var(--color-border)",
      },
      backgroundImage: {
        'gradient-primary': "var(--gradient-primary)",
        'gradient-secondary': "var(--gradient-secondary)",
        'gradient-accent': "var(--gradient-accent)",
      },
      boxShadow: {
        'glow-sm': "var(--shadow-glow-sm)",
        'glow-md': "var(--shadow-glow-md)",
        'glow-lg': "var(--shadow-glow-lg)",
      },
      transitionDuration: {
        'theme': "var(--transition-duration)",
      },
    },
  },
  plugins: [],
};
export default config;
