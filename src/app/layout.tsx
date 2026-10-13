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
      <body className="flex flex-col min-h-screen bg-surface-primary text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-text-primary focus:text-surface-primary focus:font-mono focus:text-xs"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1 max-w-dense w-full mx-auto px-4 md:px-8 py-6 md:py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
