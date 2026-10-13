/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      bp01: "320px",
      bp02: "640px",
      bp03: "1024px",
      bp04: "1440px",
      bp05: "2560px",
    },
    extend: {
      colors: {
        "surface-primary": "var(--surface-primary)",
        "surface-secondary": "var(--surface-secondary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "border-structural": "var(--border-structural)",
        "accent-signal": "var(--accent-signal)",
      },
      fontFamily: {
        display: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
        marginalia: ["var(--font-caveat)", "Caveat", "cursive"],
      },
      fontSize: {
        claim: ["3.0rem", { lineHeight: "1.1" }],
        heading: ["1.75rem", { lineHeight: "1.2" }],
        body: ["1.0rem", { lineHeight: "1.5" }],
        metric: ["1.5rem", { lineHeight: "1.2" }],
        caption: ["0.8125rem", { lineHeight: "1.4" }],
        annotation: ["1.125rem", { lineHeight: "1.3" }],
      },
      spacing: {
        dense: "0.75rem",
        section: "2.0rem",
        "page-margin": "1.5rem",
      },
      maxWidth: {
        dense: "1600px",
      },
      borderWidth: {
        DEFAULT: "1px",
      },
    },
  },
  plugins: [],
};
