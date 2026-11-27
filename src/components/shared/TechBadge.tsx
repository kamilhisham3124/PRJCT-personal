import React from "react";
import { getTechIcon } from "../../lib/utils/techIcons";

export function TechBadge({
  name,
  className = "",
  size = "md",
}: {
  name: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const Icon = getTechIcon(name);
  const sizeClasses =
    size === "sm"
      ? "text-[10px] py-0.5 px-2 gap-1.5"
      : "text-[11px] sm:text-xs py-0.5 sm:py-1 px-2 sm:px-2.5 gap-1.5 sm:gap-2";
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <span
      className={`group inline-flex items-center whitespace-nowrap shrink-0 max-w-full rounded-md font-mono font-medium bg-surface-secondary text-text-secondary border border-border-structural transition-colors hover:text-text-primary hover:border-border-highlight hover:bg-surface-elevated ${sizeClasses} ${className}`}
    >
      <Icon
        className={`${iconSize} shrink-0 text-text-secondary group-hover:text-text-primary transition-colors`}
        aria-hidden="true"
      />
      <span className="truncate">{name}</span>
    </span>
  );
}
