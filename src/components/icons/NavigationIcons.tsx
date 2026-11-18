import React from "react";
import type { IconProps } from "./types";

export function PhosphorArrowRight({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <line x1="40" y1="128" x2="216" y2="128" />
      <polyline points="144 56 216 128 144 200" />
    </svg>
  );
}

export function PhosphorArrowLeft({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <line x1="216" y1="128" x2="40" y2="128" />
      <polyline points="112 56 40 128 112 200" />
    </svg>
  );
}

export function PhosphorArrowUp({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <line x1="128" y1="216" x2="128" y2="40" />
      <polyline points="56 112 128 40 200 112" />
    </svg>
  );
}

export function PhosphorArrowUpRight({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <line x1="64" y1="192" x2="192" y2="64" />
      <polyline points="88 64 192 64 192 168" />
    </svg>
  );
}

export function PhosphorCaretRight({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <polyline points="96 48 176 128 96 208" />
    </svg>
  );
}

export function PhosphorCaretDown({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <polyline points="208 96 128 176 48 96" />
    </svg>
  );
}

export function PhosphorListDashes({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <line x1="96" y1="64" x2="216" y2="64" />
      <line x1="96" y1="128" x2="216" y2="128" />
      <line x1="96" y1="192" x2="216" y2="192" />
      <line x1="40" y1="64" x2="56" y2="64" />
      <line x1="40" y1="128" x2="56" y2="128" />
      <line x1="40" y1="192" x2="56" y2="192" />
    </svg>
  );
}

export function PhosphorSidebarSimple({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <line x1="168" y1="48" x2="168" y2="208" />
      <rect x="32" y="48" width="192" height="160" rx="8" />
    </svg>
  );
}

export function PhosphorHouse({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      <path d="M104,216V152h48v64h64V120a8,8,0,0,0-2.34-5.66l-80-80a8,8,0,0,0-11.32,0l-80,80A8,8,0,0,0,40,120v96Z" />
    </svg>
  );
}
