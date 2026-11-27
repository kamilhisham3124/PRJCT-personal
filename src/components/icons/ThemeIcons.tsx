import React from "react";
import type { IconProps } from "./types";

export function PhosphorSun({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <circle cx="128" cy="128" r="56" />
      <line x1="128" y1="40" x2="128" y2="16" />
      <line x1="64" y1="64" x2="48" y2="48" />
      <line x1="40" y1="128" x2="16" y2="128" />
      <line x1="64" y1="192" x2="48" y2="208" />
      <line x1="128" y1="216" x2="128" y2="240" />
      <line x1="192" y1="192" x2="208" y2="208" />
      <line x1="216" y1="128" x2="240" y2="128" />
      <line x1="192" y1="64" x2="208" y2="48" />
    </svg>
  );
}

export function PhosphorMoon({ className = "w-4 h-4", filled = false, ...props }: IconProps) {
  if (filled) {
    return (
      <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" className={className} {...props}>
        <path d="M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M108.11,28.11A96.09,96.09,0,0,0,227.89,147.89,96,96,0,1,1,108.11,28.11Z" />
    </svg>
  );
}

export function PhosphorMapPin({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <circle cx="128" cy="104" r="32" />
      <path d="M208,104c0,72-80,128-80,128S48,176,48,104a80,80,0,0,1,160,0Z" />
    </svg>
  );
}

export function PhosphorMonitor({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <rect x="32" y="48" width="192" height="144" rx="16" />
      <line x1="160" y1="224" x2="96" y2="224" />
      <line x1="128" y1="192" x2="128" y2="224" />
    </svg>
  );
}
