import React from "react";
import Link from "next/link";
import { getAllCaseStudies } from "../../content";
import { githubAccessor } from "../../lib/accessors/githubAccessor";

export const dynamic = "force-static";

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
      <div className="border-b border-structural pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase text-text-secondary">
            Work Artifacts / Systems Track
          </span>
          <div className="font-marginalia text-annotation text-text-secondary">
            // commit shas verified against github api
          </div>
        </div>
        <h1 className="text-3xl font-bold font-display text-text-primary mt-1">
          Production Systems &amp; Case Studies
        </h1>
        <p className="text-sm text-text-secondary font-display mt-2 max-w-2xl leading-relaxed">
          Verifiable evidence of production engineering: normalized SQL models,
          12-endpoint REST APIs, and strict MVC separation.
        </p>
      </div>

      {/* Grid: 1 col on BP-01/02, 2 cols on BP-03/04, 3 cols on BP-05 (DOC-20 Section 3.0) */}
      <div className="grid grid-cols-1 bp03:grid-cols-2 bp05:grid-cols-3 gap-6">
        {studiesWithCommits.map((study) => (
          <article
            key={study.slug}
            className="border-structural bg-surface-secondary p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-structural pb-3 mb-4">
                <span className="text-xs font-mono text-text-secondary">
                  SLUG: {study.slug}
                </span>
                {study.topCommit?.verified && (
                  <span className="border-structural bg-surface-primary px-2 py-0.5 text-xs font-mono text-text-primary">
                    [Signed commit]
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold font-display text-text-primary mb-2">
                {study.title}
              </h2>

              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                {study.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {study.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="border-structural bg-surface-primary px-2 py-0.5 text-xs font-mono text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-structural">
              <span className="text-xs font-mono text-text-secondary">
                Published: {study.published_at}
              </span>
              <Link
                href={`/work/${study.slug}`}
                className="text-xs font-mono font-bold underline text-text-primary hover:text-text-secondary"
              >
                Inspect Architecture &gt;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
