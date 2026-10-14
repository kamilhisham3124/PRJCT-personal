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
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[#F0F9FF] dark:bg-[#031B33] text-slate-800 dark:text-slate-100 antialiased aero-ambient selection:bg-sky-500 selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-600 focus:text-white focus:text-xs focus:font-semibold focus:rounded-full shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1 max-w-dense w-full mx-auto px-4 md:px-8 py-8 md:py-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
