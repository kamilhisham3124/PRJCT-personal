import React from "react";
import type { Metadata } from "next";
import { getAllCaseStudies } from "../../content";
import { githubAccessor } from "../../lib/accessors/githubAccessor";
import { ProjectCatalog } from "../../components/client/ProjectCatalog";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies and production web applications built with Python, Django, and PostgreSQL.",
};

export default async function WorkPage() {
  const caseStudies = getAllCaseStudies();

  const studiesWithCommits = await Promise.all(
    caseStudies.map(async (study) => {
      const parts = study.github_repo.split("/");
      const repoName = parts[parts.length - 1];
      const repoOwner = parts[parts.length - 2];
      const commitRes = await githubAccessor({ repoOwner, repoName, maxCommits: 1 });
      const topCommit = commitRes.ok ? commitRes.data.commits[0] : null;
      return { ...study, topCommit };
    })
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)] mb-3">
          <span>Selected Work</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Case Studies &amp; Projects
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed mt-2">
          Production-tested web applications and REST APIs built with Python, Django,
          PostgreSQL, and SQLite, featuring normalized relational schemas and role-based access.
        </p>
      </div>

      <ProjectCatalog caseStudies={studiesWithCommits} />
    </div>
  );
}
