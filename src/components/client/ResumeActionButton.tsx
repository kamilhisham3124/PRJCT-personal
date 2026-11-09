"use client";

import React from "react";
import { Download, ExternalLink } from "lucide-react";

interface ResumeActionButtonProps {
  className?: string;
  label?: string;
  mode?: "view" | "download";
}

export function ResumeActionButton({
  className = "inline-flex items-center gap-2 linkhunt-btn-primary rounded-full px-5 py-2.5 text-xs font-semibold min-h-[44px] group",
  label,
  mode = "view",
}: ResumeActionButtonProps) {
  const displayLabel = label || (mode === "view" ? "View Resume" : "Download Resume");

  const handleClick = () => {
    // Concurrently trigger direct local file download while native anchor opens new tab
    setTimeout(() => {
      const downloadAnchor = document.createElement("a");
      downloadAnchor.href = "/resume.pdf?download=true";
      downloadAnchor.download = "Kamil_Hisham_Resume.pdf";
      downloadAnchor.rel = "noopener noreferrer";
      downloadAnchor.style.display = "none";
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
    }, 100);
  };

  return (
    <a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      aria-label={`${displayLabel} in a new tab and download to local device`}
    >
      {mode === "download" ? (
        <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
      ) : (
        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      )}
      <span>{displayLabel}</span>
    </a>
  );
}
