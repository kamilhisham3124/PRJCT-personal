import React from "react";

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
      <div
        className="border-structural bg-surface-secondary p-4"
        style={{ minHeight: "130px" }}
      >
        <div className="h-4 w-1/3 bg-surface-primary border-structural animate-pulse mb-3" />
        <div className="h-4 w-3/4 bg-surface-primary border-structural animate-pulse mb-2" />
        <div className="h-4 w-1/2 bg-surface-primary border-structural animate-pulse" />
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="border-structural bg-surface-secondary p-4 border-l-4 border-l-accent-signal">
        <div className="text-xs font-mono uppercase text-text-secondary mb-1">
          Git Credential Verification
        </div>
        <p className="text-xs text-text-secondary">
          Live commit telemetry is temporarily unavailable for this repository.
        </p>
      </div>
    );
  }

  if (state === "unavailable") {
    return (
      <div className="border-structural bg-surface-secondary p-4">
        <div className="text-xs font-mono uppercase text-text-secondary mb-1">
          Git Credential Verification
        </div>
        <p className="text-xs text-text-secondary">
          Zero public commits detected in the queried window.
        </p>
      </div>
    );
  }

  const shortSha = commitSha ? commitSha.substring(0, 7) : "HEAD";

  return (
    <article
      aria-labelledby={titleId}
      className="border-structural bg-surface-secondary p-4 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between border-b border-structural pb-2">
        <h3 id={titleId} className="text-xs font-mono uppercase text-text-secondary">
          Git Cryptographic Evidence
        </h3>
        {isVerified && (
          <span
            className="border-structural bg-surface-primary px-2 py-0.5 text-xs font-mono text-text-primary"
            aria-label="Signed commit"
          >
            [Signed commit]
          </span>
        )}
      </div>

      <div className="text-xs font-mono">
        <span className="text-text-secondary">Commit: </span>
        <span className="font-bold text-text-primary">{shortSha}</span>
        {authoredDate && (
          <span className="text-text-secondary ml-2">
            ({new Date(authoredDate).toLocaleDateString()})
          </span>
        )}
      </div>

      {commitMessage && (
        <p className="text-xs font-mono text-text-primary line-clamp-2">
          &quot;{commitMessage}&quot;
        </p>
      )}

      {previewUrl && (
        <div className="pt-1">
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs font-mono underline text-text-primary hover:text-text-secondary"
          >
            Inspect Repository &gt;
          </a>
        </div>
      )}
    </article>
  );
}
