import React from "react";
import type { IconProps } from "./types";

export function PhosphorX({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <line x1="200" y1="56" x2="56" y2="200" />
      <line x1="200" y1="200" x2="56" y2="56" />
    </svg>
  );
}

export function PhosphorMagnifyingGlass({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <circle cx="112" cy="112" r="80" />
      <line x1="168.57" y1="168.57" x2="224" y2="224" />
    </svg>
  );
}

export function PhosphorMagnifyingGlassPlus({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <circle cx="112" cy="112" r="80" />
      <line x1="168.57" y1="168.57" x2="224" y2="224" />
      <line x1="80" y1="112" x2="144" y2="112" />
      <line x1="112" y1="80" x2="112" y2="144" />
    </svg>
  );
}

export function PhosphorList({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <line x1="40" y1="64" x2="216" y2="64" />
      <line x1="40" y1="128" x2="216" y2="128" />
      <line x1="40" y1="192" x2="216" y2="192" />
    </svg>
  );
}

export function PhosphorSquaresFour({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <rect x="48" y="48" width="64" height="64" rx="8" />
      <rect x="144" y="48" width="64" height="64" rx="8" />
      <rect x="48" y="144" width="64" height="64" rx="8" />
      <rect x="144" y="144" width="64" height="64" rx="8" />
    </svg>
  );
}

export function PhosphorEye({ className = "w-4 h-4", filled = false, ...props }: IconProps) {
  if (filled) {
    return (
      <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" className={className} {...props}>
        <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.35c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.47,133.47,0,0,1,231,128,133.33,133.33,0,0,1,207.93,158.75C185.67,180.81,158.78,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z" />
      <circle cx="128" cy="128" r="40" />
    </svg>
  );
}

export function PhosphorCopy({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <polyline points="168 168 216 168 216 40 88 40 88 88" />
      <rect x="40" y="88" width="128" height="128" rx="8" />
    </svg>
  );
}

export function PhosphorDownloadSimple({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <line x1="128" y1="144" x2="128" y2="32" />
      <polyline points="216 144 216 208 40 208 40 144" />
      <polyline points="168 104 128 144 88 104" />
    </svg>
  );
}

export function PhosphorArrowSquareOut({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <polyline points="216 104 215.99 40.01 152 40" />
      <line x1="136" y1="120" x2="216" y2="40" />
      <path d="M184,136v72a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8h72" />
    </svg>
  );
}
