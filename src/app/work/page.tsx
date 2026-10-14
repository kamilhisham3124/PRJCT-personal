import React from "react";
import Link from "next/link";
import { getAllCaseStudies } from "../../content";
import { githubAccessor } from "../../lib/accessors/githubAccessor";
import { ArrowRight, ShieldCheck } from "lucide-react";

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-sky-50 dark:bg-sky-950/60 text-aero-sky dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] mb-4">
          <span>[AERO_WORK // ACID_VERIFIED]</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
          Production Systems &amp; Case Studies
        </h1>
        <p className="text-base text-slate-600 dark:text-sky-100/90 max-w-2xl leading-relaxed mt-3">
          Verifiable evidence of production software engineering: normalized SQL models,
          12-endpoint REST APIs, and strict MVC separation under ACID guarantees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studiesWithCommits.length === 0 && (
          <p className="text-sm text-slate-500 py-6">No production case studies available.</p>
        )}
        {studiesWithCommits.map((study) => (
          <article
            key={study.slug}
            className="group aero-panel rounded-xl p-6 hover:border-aero-sky focus-within:ring-2 focus-within:ring-aero-sky/50 focus-within:ring-offset-2 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-sky-100 dark:border-sky-800/60">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-aero-sky">
                  {study.slug}
                </span>
                {study.topCommit?.verified && (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 rounded-md px-2 py-0.5 text-[10px] font-mono font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <ShieldCheck className="w-3 h-3" />
                    Signed Commit
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-aero-sky transition-colors">
                {study.title}
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {study.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {study.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-md text-xs font-mono font-medium bg-sky-50 dark:bg-sky-950/60 text-slate-700 dark:text-sky-200 border border-sky-200/60 dark:border-sky-800/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-sky-100 dark:border-sky-800/60 text-xs">
              <span className="text-sky-700 dark:text-sky-300 font-mono">
                {study.published_at}
              </span>
              <Link
                href={`/work/${study.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-aero-sky hover:underline group-hover:translate-x-0.5 transition-transform"
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
