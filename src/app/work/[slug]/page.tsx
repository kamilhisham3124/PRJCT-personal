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

      <header className="pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-accent-brand dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-3">
          <span>[ARCHITECTURE_SPEC]</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
          {study.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 mt-3 max-w-3xl leading-relaxed">
          {study.summary}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              01. Problem Statement &amp; Requirements
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {study.problem_statement}
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              02. Architecture &amp; MVC Design
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {study.architecture_overview}
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              03. Relational Schema &amp; Storage Guarantees
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              Verifiable Production Metrics
            </h3>
            <div className="flex flex-col gap-2.5">
              {study.verifiable_metrics?.map((m) => (
                <div key={m.metric} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">{m.metric}</span>
                  <span className="font-bold text-accent-brand font-mono">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
