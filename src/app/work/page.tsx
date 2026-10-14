import React from "react";
import Link from "next/link";
import { getAllCaseStudies } from "../../content";
import { githubAccessor } from "../../lib/accessors/githubAccessor";
import { ArrowRight, ShieldCheck, Layers, GitBranch } from "lucide-react";

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
    <div className="flex flex-col gap-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-[#635BFF] dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-4 shadow-sm">
          <Layers className="w-3.5 h-3.5" />
          <span>Production Systems Track</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Production Systems &amp; Case Studies
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mt-3">
          Verifiable evidence of production software engineering: normalized SQL models,
          12-endpoint REST APIs, and strict MVC separation under ACID guarantees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studiesWithCommits.map((study) => (
          <article
            key={study.slug}
            className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-7 shadow-stripe hover:shadow-stripe-hover focus-within:ring-2 focus-within:ring-[#635BFF]/50 focus-within:ring-offset-2 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#635BFF] to-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#635BFF] dark:text-indigo-400">
                  {study.slug}
                </span>
                {study.topCommit?.verified && (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 rounded-full px-2 py-0.5 text-[10px] font-semibold">
                    <ShieldCheck className="w-3 h-3" />
                    Signed Commit
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#635BFF] transition-colors">
                {study.title}
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {study.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {study.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">
                {study.published_at}
              </span>
              <Link
                href={`/work/${study.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635BFF] hover:text-[#5349e0] group-hover:translate-x-0.5 transition-all"
              >
                <span>Inspect Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
