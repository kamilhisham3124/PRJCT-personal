"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

export function LightboxModal({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Open high-resolution lightbox preview of ${title}`}
        className="group relative w-full h-48 sm:h-64 rounded-lg overflow-hidden border border-[var(--border-structural)] bg-zinc-900 block my-4 focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] min-h-[44px]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
          <ZoomIn className="w-4 h-4" />
          <span>Click to Inspect Full-Resolution Mockup</span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative z-10 max-w-4xl w-full bg-[var(--surface-primary)] border border-[var(--border-structural)] rounded-xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-structural)] bg-[var(--surface-secondary)]">
              <span className="font-semibold text-xs text-[var(--text-primary)]">{title}</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close lightbox modal"
                className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-primary)] min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full h-[60vh] max-h-[600px] bg-zinc-950">
              <Image src={src} alt={alt} fill sizes="100vw" className="object-contain p-2" priority />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
