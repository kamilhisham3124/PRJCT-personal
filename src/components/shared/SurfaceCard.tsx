import React from "react";

export type SurfaceCardVariant = "default" | "plain";

export interface SurfaceCardProps {
  variant?: SurfaceCardVariant;
  as?: "div" | "section" | "article";
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function SurfaceCard({
  variant = "default",
  as = "div",
  className = "",
  children,
  ariaLabel,
}: SurfaceCardProps) {
  const Tag = as;
  const variantClass =
    variant === "plain"
      ? "linkhunt-card-plain"
      : "linkhunt-card p-4 sm:p-5";

  return (
    <Tag
      className={`${variantClass}${className ? ` ${className}` : ""}`}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
    >
      {children}
    </Tag>
  );
}
