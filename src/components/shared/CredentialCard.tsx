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
        <div className="h-4 w-1/3 bg-surface-primary border-element animate-pulse mb-3" />
        <div className="h-4 w-3/4 bg-surface-primary border-element animate-pulse mb-2" />
        <div className="h-4 w-1/2 bg-surface-primary border-element animate-pulse" />
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="border-element bg-surface-secondary p-4 border-l-4 border-l-accent-alert">
        <div className="text-xs font-mono uppercase text-accent-alert mb-1 font-bold">
          [ GIT CRYPTOGRAPHIC VERIFICATION // DEGRADED ]
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
          [ GIT CREDENTIAL VERIFICATION ]
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
      className="border-element bg-surface-secondary p-4 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between border-b border-structural pb-2">
        <h3 id={titleId} className="text-xs font-mono uppercase text-accent-chemical font-bold">
          [ GIT CRYPTOGRAPHIC PROOF ]
        </h3>
        {isVerified && (
          <span
            className="border-element bg-surface-primary px-2 py-0.5 text-[10px] font-mono text-accent-barrel font-bold"
            aria-label="Signed commit"
          >
            [SIGNED COMMIT]
          </span>
        )}
      </div>

      <div className="text-xs font-mono">
        <span className="text-text-secondary">COMMIT SHA: </span>
        <span className="font-bold text-accent-chemical">{shortSha}</span>
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
            className="inline-block text-xs font-mono underline text-accent-chemical hover:text-text-primary"
          >
            Inspect GitHub Repository &gt;
          </a>
        </div>
      )}
    </article>
  );
}
