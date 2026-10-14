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
        "surface-elevated": "var(--surface-elevated)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "border-structural": "var(--border-structural)",
        "border-highlight": "var(--border-highlight)",
        "accent-signal": "var(--accent-signal)",
        "accent-brand": "#635BFF",
        "accent-cyan": "#00D4FF",
        "accent-purple": "#7A73FF",
        "stripe-navy": "#0A2540",
        "stripe-slate": "#425466",
        "stripe-light": "#F6F9FC",
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
        stripe: "0 10px 30px -5px rgba(10, 37, 64, 0.08), 0 0 0 1px rgba(10, 37, 64, 0.05)",
        "stripe-hover": "0 20px 40px -15px rgba(99, 91, 255, 0.25), 0 0 0 1px rgba(99, 91, 255, 0.2)",
        "stripe-btn": "0 4px 14px rgba(99, 91, 255, 0.4)",
        "stripe-card": "0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)",
      },
      maxWidth: {
        dense: "1280px",
      },
    },
  },
  plugins: [],
};
