import React from "react";
import { PhosphorArrowRight, PhosphorArrowUpRight } from "../icons";

export function DrawerLinkIcon({
  isExternal,
  className = "w-3.5 h-3.5 shrink-0",
}: {
  isExternal: boolean;
  className?: string;
}) {
  return isExternal ? (
    <PhosphorArrowUpRight className={className} />
  ) : (
    <PhosphorArrowRight className={className} />
  );
}
