import type { Metadata } from "next";
import "./typography.css";
import "./tokens.css";
import "./globals.css";
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";
import { MotionCanvas } from "../components/client/MotionCanvas";

const THEME_INIT_SCRIPT = `(function(){try{var m=localStorage.getItem('theme');if(m!=='light'&&m!=='dark'&&m!=='system'){m='system';}var r=m==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):m;var d=document.documentElement;d.dataset.themeMode=m;d.dataset.theme=r;d.classList.remove('light','dark');d.classList.add(r);d.style.colorScheme=r;}catch(e){}})();`;

export const metadata: Metadata = {
  title: {
    default: "Kamil Hisham | Software Engineer",
    template: "%s | Kamil Hisham",
  },
  description:
    "Personal portfolio of Kamil Hisham, Software Engineer specializing in Python, Django REST Framework, relational databases, and modern web applications.",
  metadataBase: new URL("https://kamilhisham.dev"),
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Kamil Hisham | Software Engineer",
    description:
      "Software engineer building web applications and REST APIs with Python, Django, and Next.js.",
    url: "https://kamilhisham.dev",
    siteName: "Kamil Hisham - Software Engineer",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/avatar.jpg", width: 800, height: 800, alt: "Kamil Hisham" }],
  },
  twitter: {
    card: "summary",
    title: "Kamil Hisham | Software Engineer",
    description:
      "Software engineer building web applications and REST APIs with Python, Django, and Next.js.",
    images: ["/images/avatar.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        suppressHydrationWarning
        className="flex flex-col min-h-screen bg-surface-primary text-text-primary antialiased relative selection:bg-accent-primary selection:text-fg-on-emphasis"
      >
        <MotionCanvas />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-primary focus:text-fg-on-emphasis focus:text-xs focus:font-semibold focus:rounded-lg shadow-lg min-h-[44px] inline-flex items-center"
        >
          Skip to main content
        </a>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main
            id="main-content"
            className="flex-1 max-w-dense w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 min-w-0"
          >
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
