import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";

export const metadata: Metadata = {
  title: "Kamil Hisham | Full-Stack Systems Engineer",
  description:
    "Deterministic backend architecture, normalized relational schemas, and high-performance edge compute portfolios.",
  metadataBase: new URL("https://kamilhisham.dev"),
  openGraph: {
    title: "Kamil Hisham | Full-Stack Systems Engineer",
    description:
      "Deterministic backend architecture and verified production telemetry.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="flex flex-col min-h-screen bg-[var(--surface-primary)] text-[var(--text-primary)] antialiased selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-zinc-900"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-zinc-900 focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900 focus:text-xs focus:font-semibold focus:rounded-full shadow-lg min-h-[44px] inline-flex items-center"
        >
          Skip to main content
        </a>
        <Header />
        <main
          id="main-content"
          className="flex-1 max-w-dense w-full mx-auto px-4 sm:px-6 py-8 sm:py-12"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
