import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";
import { MotionCanvas } from "../components/client/MotionCanvas";

export const metadata: Metadata = {
  title: "Kamil Hisham | Software Engineer",
  description:
    "Personal portfolio of Kamil Hisham, Software Engineer specializing in Python, Django REST Framework, relational databases, and modern web applications.",
  metadataBase: new URL("https://kamilhisham.dev"),
  openGraph: {
    title: "Kamil Hisham | Software Engineer",
    description:
      "Software engineer building web applications and REST APIs with Python, Django, and Next.js.",
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
        className="flex flex-col min-h-screen bg-[var(--surface-primary)] text-[var(--text-primary)] antialiased relative selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-zinc-900"
      >
        <MotionCanvas />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-zinc-900 focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900 focus:text-xs focus:font-semibold focus:rounded-full shadow-lg min-h-[44px] inline-flex items-center"
        >
          Skip to main content
        </a>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main
            id="main-content"
            className="flex-1 max-w-dense w-full mx-auto px-4 sm:px-6 py-8 sm:py-12"
          >
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
