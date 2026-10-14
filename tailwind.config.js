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
    },
    extend: {
      colors: {
        "surface-primary": "var(--surface-primary)",
        "surface-secondary": "var(--surface-secondary)",
        "surface-elevated": "var(--surface-elevated)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "border-structural": "var(--border-structural)",
        "border-highlight": "var(--border-highlight)",
        "accent-signal": "var(--accent-signal)",
        "accent-brand": "#0284C7",
        "aero-sky": "#0284C7",
        "aero-cyan": "#06B6D4",
        "aero-emerald": "#10B981",
        "aero-navy": "#031B33",
        "aero-ice": "#F0F9FF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "sans-serif"],
        display: ["var(--font-plus-jakarta-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        claim: ["3.25rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        heading: ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        body: ["1.0rem", { lineHeight: "1.6" }],
        metric: ["2.0rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        caption: ["0.8125rem", { lineHeight: "1.4" }],
      },
      boxShadow: {
        "aero-glass": "inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 4px 16px -2px rgba(2, 132, 199, 0.12)",
        "aero-card": "inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 8px 24px -4px rgba(2, 132, 199, 0.1)",
        "aero-btn": "inset 0 1px 0 rgba(255, 255, 255, 0.7), inset 0 -1px 2px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(2, 132, 199, 0.35)",
        "aero-hover": "inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 8px 24px rgba(2, 132, 199, 0.45)",
      },
      maxWidth: {
        dense: "1280px",
      },
    },
  },
  plugins: [],
};
