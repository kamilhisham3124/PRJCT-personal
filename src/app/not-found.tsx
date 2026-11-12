import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24 gap-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)]">
        <span>HTTP 404 &bull; Resource Not Found</span>
      </div>

      <div className="max-w-md flex flex-col gap-3">
        <h1 className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-[var(--text-primary)]">
          404
        </h1>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          Page Not Located
        </h2>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          The route you requested does not exist on this server or has been relocated to another path.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold linkhunt-btn-primary min-h-[44px]"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold linkhunt-btn-secondary min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Explore Case Studies</span>
        </Link>
      </div>
    </div>
  );
}
