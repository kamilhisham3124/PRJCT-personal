import React from "react";
import type { IconProps } from "../../components/icons/types";
import {
  TechPythonIcon,
  TechDjangoIcon,
  TechNextjsIcon,
  TechTypeScriptIcon,
  TechJavaScriptIcon,
  TechHtmlIcon,
  TechCssIcon,
  TechPostgresIcon,
  TechSqliteIcon,
  TechDockerIcon,
  TechRedisIcon,
  TechSupabaseIcon,
  TechGitIcon,
  TechPostmanIcon,
  TechVercelIcon,
  TechMysqlIcon,
  PhosphorHardDrives,
  PhosphorDatabase,
  PhosphorShieldCheck,
  PhosphorTerminalWindow,
  PhosphorStack,
} from "../../components/icons";

export function getTechIcon(name: string): React.ComponentType<IconProps> {
  const normalized = name.toLowerCase().trim();

  // Languages & Core Frameworks
  if (normalized.includes("python")) return TechPythonIcon;
  if (normalized.includes("django") || normalized.includes("drf")) return TechDjangoIcon;
  if (normalized.includes("next.js") || normalized.includes("nextjs")) return TechNextjsIcon;
  if (normalized.includes("typescript") || normalized === "ts") return TechTypeScriptIcon;
  if (normalized.includes("javascript") || normalized === "js") return TechJavaScriptIcon;
  if (normalized === "html" || normalized.includes("html5")) return TechHtmlIcon;
  if (normalized === "css" || normalized.includes("css3")) return TechCssIcon;

  // Databases & Storage
  if (normalized.startsWith("sql") || normalized === "sql") return PhosphorDatabase;
  if (normalized.includes("postgres") || normalized.includes("postgresql")) return TechPostgresIcon;
  if (normalized.includes("mysql")) return TechMysqlIcon;
  if (normalized.includes("sqlite")) return TechSqliteIcon;
  if (normalized.includes("redis")) return TechRedisIcon;
  if (normalized.includes("supabase")) return TechSupabaseIcon;

  // DevOps, Tooling & Infrastructure
  if (normalized.includes("docker") || normalized.includes("container")) return TechDockerIcon;
  if (normalized.includes("git")) return TechGitIcon;
  if (normalized.includes("postman")) return TechPostmanIcon;
  if (normalized.includes("vercel")) return TechVercelIcon;

  // Non-branded abstract engineering skills with semantic icons
  if (normalized.includes("api") || normalized.includes("rest") || normalized.includes("endpoint")) {
    return PhosphorHardDrives;
  }
  if (normalized.includes("sql") || normalized.includes("database") || normalized.includes("schema")) {
    return PhosphorDatabase;
  }
  if (normalized.includes("access control") || normalized.includes("rbac") || normalized.includes("permission") || normalized.includes("security")) {
    return PhosphorShieldCheck;
  }
  if (normalized.includes("terminal") || normalized.includes("cli") || normalized.includes("bash") || normalized.includes("shell")) {
    return PhosphorTerminalWindow;
  }

  // Universal technology & architectural stack fallback
  return PhosphorStack;
}
