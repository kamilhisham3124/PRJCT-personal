import React from "react";
import type { IconProps } from "./types";

export function PhosphorCheck({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <polyline points="40 144 96 200 224 72" />
    </svg>
  );
}

export function PhosphorCheckCircle({ className = "w-4 h-4", filled = false, ...props }: IconProps) {
  if (filled) {
    return (
      <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" className={className} {...props}>
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <polyline points="88 136 112 160 168 104" />
      <circle cx="128" cy="128" r="96" />
    </svg>
  );
}

export function PhosphorWarningCircle({ className = "w-4 h-4", filled = false, ...props }: IconProps) {
  if (filled) {
    return (
      <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" className={className} {...props}>
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <circle cx="128" cy="128" r="96" />
      <line x1="128" y1="136" x2="128" y2="80" />
      <circle cx="128" cy="172" r="8" fill="currentColor" />
    </svg>
  );
}

export function PhosphorSpinnerGap({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <line x1="128" y1="32" x2="128" y2="64" />
      <line x1="224" y1="128" x2="192" y2="128" />
      <line x1="195.88" y1="195.88" x2="173.25" y2="173.25" />
      <line x1="128" y1="224" x2="128" y2="192" />
      <line x1="60.12" y1="195.88" x2="82.75" y2="173.25" />
      <line x1="32" y1="128" x2="64" y2="128" />
      <line x1="60.12" y1="60.12" x2="82.75" y2="82.75" />
    </svg>
  );
}

export function PhosphorPaperPlaneTilt({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <line x1="108" y1="148" x2="160" y2="96" />
      <path d="M223.69,42.18a8,8,0,0,0-9.87-9.87l-192,58.22a8,8,0,0,0-1.25,14.93L108,148l42.54,87.42a8,8,0,0,0,14.93-1.25Z" />
    </svg>
  );
}

export function PhosphorEnvelopeSimple({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M32,56H224a0,0,0,0,1,0,0V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56A0,0,0,0,1,32,56Z" />
      <polyline points="224 56 128 144 32 56" />
    </svg>
  );
}

export function PhosphorPhone({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M164.39,145.34a8,8,0,0,1,7.59-.69l47.16,21.13a8,8,0,0,1,4.8,8.3A48.33,48.33,0,0,1,176,216,136,136,0,0,1,40,80,48.33,48.33,0,0,1,81.92,32.06a8,8,0,0,1,8.3,4.8l21.13,47.2a8,8,0,0,1-.66,7.53L89.32,117a7.93,7.93,0,0,0-.54,7.81c8.27,16.93,25.77,34.22,42.75,42.41a7.92,7.92,0,0,0,7.83-.59Z" />
    </svg>
  );
}

export function PhosphorCalendarBlank({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <rect x="40" y="40" width="176" height="176" rx="8" />
      <line x1="176" y1="24" x2="176" y2="56" />
      <line x1="80" y1="24" x2="80" y2="56" />
      <line x1="40" y1="88" x2="216" y2="88" />
    </svg>
  );
}

export function PhosphorFileText({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z" />
      <polyline points="152 32 152 88 208 88" />
      <line x1="96" y1="136" x2="160" y2="136" />
      <line x1="96" y1="168" x2="160" y2="168" />
    </svg>
  );
}

export function PhosphorUser({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <circle cx="128" cy="96" r="64" />
      <path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" />
    </svg>
  );
}
