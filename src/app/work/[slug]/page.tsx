import React from "react";
import { notFound } from "next/navigation";
import { getAllCaseStudies, getCaseStudyBySlug } from "../../../content";
import { githubAccessor } from "../../../lib/accessors/githubAccessor";
import { CredentialCard } from "../../../components/shared/CredentialCard";
import { CaseStudyNav } from "../../../components/shared/CaseStudyNav";
import { BookOpen, Database, Cpu, Activity, BarChart3 } from "lucide-react";

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-[#635BFF] dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">Architecture Case Study</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {study.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 mt-3 max-w-3xl leading-relaxed">
          {study.summary}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-7 shadow-stripe">
            <div className="flex items-center gap-2.5 mb-3 text-slate-900 dark:text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-[#635BFF]">
                <Activity className="w-4 h-4" />
              </div>
              <h2>01. Problem Statement &amp; Requirements</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
              {study.problem_statement}
            </p>
          </section>

          <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-7 shadow-stripe">
            <div className="flex items-center gap-2.5 mb-3 text-slate-900 dark:text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 flex items-center justify-center text-[#00D4FF]">
                <Cpu className="w-4 h-4" />
              </div>
              <h2>02. Architecture &amp; MVC Design</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
              {study.architecture_overview}
            </p>
          </section>

          <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-7 shadow-stripe">
            <div className="flex items-center gap-2.5 mb-3 text-slate-900 dark:text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-[#7A73FF]">
                <Database className="w-4 h-4" />
              </div>
              <h2>03. Relational Schema &amp; Storage Guarantees</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
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

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-stripe">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              <BarChart3 className="w-4 h-4 text-[#635BFF]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Verifiable Production Metrics
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {study.verifiable_metrics?.map((m) => (
                <div key={m.metric} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">{m.metric}</span>
                  <span className="font-bold text-[#635BFF] dark:text-indigo-400 font-mono">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
