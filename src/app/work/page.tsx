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
          <span className="text-xs font-mono uppercase text-accent-chemical font-bold tracking-wider">
            [ ARTIFACT DOSSIER // PRODUCTION SYSTEMS TRACK ]
          </span>
          <div className="font-marginalia text-annotation text-accent-chemical">
            {"// cryptographic git commit verification"}
          </div>
        </div>
        <h1 className="text-3xl font-extrabold font-display text-text-primary mt-1">
          Production Systems &amp; Case Studies
        </h1>
        <p className="text-sm text-text-secondary max-w-2xl leading-relaxed mt-2">
          Verifiable evidence of production engineering: normalized SQL models,
          12-endpoint REST APIs, and strict MVC separation under ACID guarantees.
        </p>
      </div>

      <div className="grid grid-cols-1 bp03:grid-cols-2 bp05:grid-cols-3 gap-6">
        {studiesWithCommits.map((study) => (
          <article
            key={study.slug}
            className="border-element bg-surface-secondary p-6 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-1 hazard-stripe" />
            <div>
              <div className="flex items-center justify-between border-b border-structural pb-3 mb-4">
                <span className="text-[11px] font-mono text-accent-chemical">
                  SPEC // {study.slug.toUpperCase()}
                </span>
                {study.topCommit?.verified && (
                  <span className="border-element bg-surface-primary px-2 py-0.5 text-[10px] font-mono text-accent-barrel font-bold">
                    [SIGNED COMMIT]
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
                    className="border-element bg-surface-primary px-2 py-0.5 text-[11px] font-mono text-text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-structural">
              <span className="text-[11px] font-mono text-text-secondary">
                RELEASED: {study.published_at}
              </span>
              <Link
                href={`/work/${study.slug}`}
                className="text-xs font-mono font-bold text-accent-chemical hover:underline"
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
