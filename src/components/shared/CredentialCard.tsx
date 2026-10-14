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
  projectTitle = "Project Artifact",
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
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-stripe">
        <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-3" />
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-2" />
        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-5">
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
      <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-stripe">
        <div className="text-xs font-bold text-slate-500 mb-1">Git Credential Verification</div>
        <p className="text-xs text-slate-500">Zero public commits detected in the queried window.</p>
      </div>
    );
  }

  const shortSha = commitSha ? commitSha.substring(0, 7) : "HEAD";

  return (
    <article
      aria-labelledby={titleId}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-stripe flex flex-col gap-4"
    >
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-[#635BFF]">
            <GitCommit className="w-4 h-4" />
          </div>
          <h3 id={titleId} className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Git Cryptographic Proof
          </h3>
        </div>
        {isVerified && (
          <span
            className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
            aria-label="Signed commit"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Signed Commit
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-500 font-medium">Commit:</span>
        <code className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-800 dark:text-slate-200 font-semibold">
          {shortSha}
        </code>
        {authoredDate && (
          <span className="text-slate-400 text-[11px]">
            ({new Date(authoredDate).toLocaleDateString()})
          </span>
        )}
      </div>

      {commitMessage && (
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl">
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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635BFF] hover:text-[#5349e0] transition-colors group"
          >
            <span>Inspect GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      )}
    </article>
  );
}
