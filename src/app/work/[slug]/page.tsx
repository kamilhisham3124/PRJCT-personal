import React from "react";
import { notFound } from "next/navigation";
import { getAllCaseStudies, getCaseStudyBySlug } from "../../../content";
import { githubAccessor } from "../../../lib/accessors/githubAccessor";
import { CredentialCard } from "../../../components/shared/CredentialCard";
import { CaseStudyNav } from "../../../components/shared/CaseStudyNav";

export const dynamic = "force-static";

export function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const caseStudies = getAllCaseStudies();
  const navItems = caseStudies.map((cs) => ({
    path: `/work/${cs.slug}`,
    label: cs.title,
  }));

  const parts = study.github_repo.split("/");
  const repoName = parts[parts.length - 1];
  const repoOwner = parts[parts.length - 2];
  const commitRes = await githubAccessor({ repoOwner, repoName, maxCommits: 5 });

  const topCommit = commitRes.ok ? commitRes.data.commits[0] : null;
  const credState = !commitRes.ok
    ? "error"
    : commitRes.data.commits.length === 0
    ? "unavailable"
    : "success";

  return (
    <div className="flex flex-col gap-8">
      <CaseStudyNav items={navItems} currentPath={`/work/${slug}`} />

      <header className="border-b border-structural pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase text-accent-chemical font-bold">
            SPEC // CASE STUDY ARCHITECTURE // {study.slug.toUpperCase()}
          </span>
          <div className="font-marginalia text-annotation text-accent-chemical">
            {"// verified relational schema design"}
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-text-primary mt-1">
          {study.title}
        </h1>
        <p className="text-sm sm:text-base text-text-secondary mt-2 max-w-3xl leading-relaxed">
          {study.summary}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section className="border-element bg-surface-secondary p-6">
            <h2 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-2">
              01 // Problem Statement
            </h2>
            <p className="text-sm text-text-primary leading-relaxed">
              {study.problem_statement}
            </p>
          </section>

          <section className="border-element bg-surface-secondary p-6">
            <h2 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-2">
              02 // Architecture &amp; MVC Design
            </h2>
            <p className="text-sm text-text-primary leading-relaxed">
              {study.architecture_overview}
            </p>
          </section>

          <section className="border-element bg-surface-secondary p-6">
            <h2 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-2">
              03 // Relational Schema &amp; Storage
            </h2>
            <p className="text-sm text-text-primary leading-relaxed">
              {study.database_design}
            </p>
          </section>
        </div>

        <aside className="flex flex-col gap-6">
          <CredentialCard
            projectSlug={study.slug}
            projectTitle={study.title}
            commitSha={topCommit?.sha}
            commitMessage={topCommit?.message}
            authoredDate={topCommit?.authoredAt}
            isVerified={topCommit?.verified}
            previewUrl={study.github_repo}
            state={credState}
          />

          <div className="border-element bg-surface-secondary p-4">
            <h3 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-3 border-b border-structural pb-1">
              Verifiable Production Metrics
            </h3>
            <div className="flex flex-col gap-2">
              {study.verifiable_metrics?.map((m) => (
                <div key={m.metric} className="text-xs font-mono">
                  <div className="text-text-secondary">{m.metric}:</div>
                  <div className="font-bold text-accent-sky">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
