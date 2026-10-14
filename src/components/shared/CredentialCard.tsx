import React from "react";
import { GitCommit, ShieldCheck, ExternalLink, AlertCircle } from "lucide-react";

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
      <div className="aero-panel rounded-xl p-6">
        <div className="h-4 w-1/3 bg-sky-200/50 dark:bg-sky-800/50 rounded animate-pulse mb-3" />
        <div className="h-4 w-3/4 bg-sky-200/50 dark:bg-sky-800/50 rounded animate-pulse mb-2" />
        <div className="h-4 w-1/2 bg-sky-200/50 dark:bg-sky-800/50 rounded animate-pulse" />
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-xl p-5">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-400 mb-1">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Git Verification Telemetry Degraded</span>
        </div>
        <p className="text-xs text-amber-700/90 dark:text-amber-400/80">
          Live commit telemetry is temporarily unavailable for this repository.
        </p>
      </div>
    );
  }

  if (state === "unavailable") {
    return (
      <div className="aero-panel rounded-xl p-5">
        <div className="text-xs font-mono font-bold text-slate-500 mb-1">Git Credential Verification</div>
        <p className="text-xs text-slate-500">Zero public commits detected in the queried window.</p>
      </div>
    );
  }

  const shortSha = commitSha ? commitSha.substring(0, 7) : "HEAD";

  return (
    <article
      aria-labelledby={titleId}
      className="aero-panel rounded-xl p-6 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between border-b border-sky-100 dark:border-sky-800/60 pb-3">
        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
          <h3 id={titleId} className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Git Cryptographic Proof
          </h3>
        </div>
        {isVerified && (
          <span
            className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 rounded-md px-2 py-0.5 text-[10px] font-mono font-semibold"
            aria-label="Signed commit"
          >
            <ShieldCheck className="w-3 h-3" />
            Signed Commit
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-500 font-medium">Commit:</span>
        <code className="font-mono bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/60 px-2 py-0.5 rounded text-sky-900 dark:text-sky-200 font-semibold">
          {shortSha}
        </code>
        {authoredDate && (
          <span className="text-slate-400 font-mono text-[11px]">
            ({new Date(authoredDate).toLocaleDateString()})
          </span>
        )}
      </div>

      {commitMessage && (
        <div className="p-3 bg-sky-50/60 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-800/60 rounded-lg">
          <p className="text-xs font-mono text-slate-700 dark:text-slate-300 line-clamp-2">
            &quot;{commitMessage}&quot;
          </p>
        </div>
      )}

      {previewUrl && (
        <div className="pt-1">
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline transition-colors group"
          >
            <span>Inspect GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      )}
    </article>
  );
}
