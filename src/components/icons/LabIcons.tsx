import React from "react";
import type { IconProps } from "./types";

export function PhosphorHardDrives({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <rect x="40" y="144" width="176" height="64" rx="8" />
      <rect x="40" y="48" width="176" height="64" rx="8" />
      <circle cx="180" cy="80" r="8" fill="currentColor" />
      <circle cx="180" cy="176" r="8" fill="currentColor" />
    </svg>
  );
}

export function PhosphorDatabase({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <ellipse cx="128" cy="80" rx="88" ry="48" />
      <path d="M40,80v48c0,26.51,39.4,48,88,48s88-21.49,88-48V80" />
      <path d="M40,128v48c0,26.51,39.4,48,88,48s88-21.49,88-48V128" />
    </svg>
  );
}

export function PhosphorStack({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <polyline points="32 176 128 232 224 176" />
      <polyline points="32 128 128 184 224 128" />
      <polygon points="32 80 128 136 224 80 128 24 32 80" />
    </svg>
  );
}

export function PhosphorLightning({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <polygon points="160 16 144 96 208 120 96 240 112 160 48 136 160 16" />
    </svg>
  );
}

export function PhosphorCpu({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <rect x="104" y="104" width="48" height="48" />
      <rect x="48" y="48" width="160" height="160" rx="8" />
      <line x1="208" y1="104" x2="232" y2="104" />
      <line x1="208" y1="152" x2="232" y2="152" />
      <line x1="24" y1="104" x2="48" y2="104" />
      <line x1="24" y1="152" x2="48" y2="152" />
      <line x1="152" y1="208" x2="152" y2="232" />
      <line x1="104" y1="208" x2="104" y2="232" />
      <line x1="152" y1="24" x2="152" y2="48" />
      <line x1="104" y1="24" x2="104" y2="48" />
    </svg>
  );
}

export function PhosphorTerminalWindow({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <polyline points="80 96 120 128 80 160" />
      <line x1="136" y1="160" x2="176" y2="160" />
      <rect x="32" y="48" width="192" height="160" rx="8" />
    </svg>
  );
}

export function PhosphorRows({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <rect x="40" y="144" width="176" height="56" rx="8" />
      <rect x="40" y="56" width="176" height="56" rx="8" />
    </svg>
  );
}

export function PhosphorColumns({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <rect x="56" y="40" width="56" height="176" rx="8" />
      <rect x="144" y="40" width="56" height="176" rx="8" />
    </svg>
  );
}

export function PhosphorArrowCounterClockwise({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <polyline points="24 56 24 104 72 104" />
      <path d="M67.59,192A88,88,0,1,0,65.77,65.77L24,104" />
    </svg>
  );
}
