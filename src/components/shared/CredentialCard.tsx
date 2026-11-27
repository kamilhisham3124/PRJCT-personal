import React from "react";
import {
  PhosphorGitCommit,
  PhosphorShieldCheck,
  PhosphorArrowSquareOut,
  PhosphorWarningCircle,
} from "../icons";

export interface CredentialCardProps {
  projectSlug: string;
  projectTitle?: string;
  commitSha?: string;
  commitMessage?: string;
  authoredDate?: string;
  isVerified?: boolean;
  previewUrl?: string;
  state: "loading" | "success" | "error" | "unavailable";
}

export function CredentialCard({
  projectSlug,
  commitSha,
  commitMessage,
  authoredDate,
  isVerified,
  previewUrl,
  state,
}: CredentialCardProps) {
  const titleId = `cred-title-${projectSlug}`;

  if (state === "loading") {
    return (
      <div className="linkhunt-card p-6">
        <div className="h-4 w-1/3 bg-[var(--surface-secondary)] rounded animate-pulse mb-3" />
        <div className="h-4 w-3/4 bg-[var(--surface-secondary)] rounded animate-pulse mb-2" />
        <div className="h-4 w-1/2 bg-[var(--surface-secondary)] rounded animate-pulse" />
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="bg-status-warning-bg border border-status-warning-border rounded-xl p-5">
        <div className="flex items-center gap-2 text-xs font-bold text-status-warning-fg mb-1">
          <PhosphorWarningCircle className="w-4 h-4 text-status-warning shrink-0" />
          <span>Commit Details Currently Unavailable</span>
        </div>
        <p className="text-xs text-text-secondary">
          Recent commit history is temporarily unavailable from GitHub.
        </p>
      </div>
    );
  }

  if (state === "unavailable") {
    return (
      <div className="linkhunt-card p-5">
        <div className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-1">
          Repository Commit History
        </div>
        <p className="text-xs text-[var(--text-secondary)]">
          No public commits found in this repository.
        </p>
      </div>
    );
  }

  const shortSha = commitSha ? commitSha.substring(0, 7) : "HEAD";

  return (
    <article
      aria-labelledby={titleId}
      className="linkhunt-card p-4 sm:p-6 flex flex-col gap-3 sm:gap-4"
    >
      <div className="flex items-center justify-between border-b border-[var(--border-structural)] pb-3">
        <div className="flex items-center gap-2">
          <PhosphorGitCommit className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
          <h3
            id={titleId}
            className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-primary)]"
          >
            Latest Commit
          </h3>
        </div>
        {isVerified && (
          <span
            className="inline-flex items-center gap-1 bg-status-success-bg text-status-success-fg border border-status-success-border rounded-md px-2 py-0.5 text-[10px] font-mono font-medium"
            aria-label="Signed commit"
          >
            <PhosphorShieldCheck className="w-3.5 h-3.5" />
            Verified
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
        <span className="text-[var(--text-secondary)] font-medium">Commit:</span>
        <code className="font-mono bg-[var(--surface-secondary)] border border-[var(--border-structural)] px-2 py-0.5 rounded text-[var(--text-primary)] font-semibold">
          {shortSha}
        </code>
        {authoredDate && (
          <span className="text-[var(--text-secondary)] font-mono text-[11px]" suppressHydrationWarning>
            ({new Date(authoredDate).toLocaleDateString()})
          </span>
        )}
      </div>

      {commitMessage && (
        <div className="p-3 bg-[var(--surface-secondary)] border border-[var(--border-structural)] rounded-lg">
          <p className="text-xs font-mono text-[var(--text-secondary)] line-clamp-2">
            &quot;{commitMessage}&quot;
          </p>
        </div>
      )}

      {previewUrl && (
        <div className="pt-2">
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-primary)] hover:underline min-h-[44px]"
          >
            <span>View on GitHub</span>
            <PhosphorArrowSquareOut className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </article>
  );
}
