/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
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
        "border-structural": "var(--border-structural)",
        "border-highlight": "var(--border-highlight)",
        "border-focus": "var(--border-focus)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "accent-signal": "var(--accent-signal)",
        "accent-brand": "var(--accent-brand)",
        "status-success": "var(--status-success)",
        "status-warning": "var(--status-warning)",
        "status-error": "var(--status-error)",
        "status-info": "var(--status-info)",
      },
      borderRadius: {
        card: "0.5rem",
        button: "0.5rem",
        badge: "0.25rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "sans-serif"],
        display: ["var(--font-inter)", "Inter", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        claim: ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.03em" }],
        heading: ["1.75rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        body: ["0.95rem", { lineHeight: "1.6" }],
        metric: ["1.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        caption: ["0.8125rem", { lineHeight: "1.4" }],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 6px 16px -2px rgba(0, 0, 0, 0.08)",
        button: "0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      },
      maxWidth: {
        dense: "860px",
      },
    },
  },
  plugins: [],
};
