import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllCaseStudies } from "../../content";
import { githubAccessor } from "../../lib/accessors/githubAccessor";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies and production web applications built with Python, Django, and PostgreSQL.",
};

const CASE_STUDY_IMAGES: Record<string, string> = {
  "employee-task-management": "/images/case-study-task-management.jpg",
  "gift-delivery-ecommerce": "/images/case-study-ecommerce.jpg",
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
    <div className="flex flex-col gap-10">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studiesWithCommits.length === 0 && (
          <p className="text-sm text-[var(--text-secondary)] py-6">
            No production case studies available.
          </p>
        )}
        {studiesWithCommits.map((study) => (
          <article
            key={study.slug}
            className="group linkhunt-card p-5 sm:p-6 flex flex-col justify-between hover:shadow-card-hover transition-all"
          >
            <div>
              <div className="relative w-full h-44 rounded-lg overflow-hidden border border-[var(--border-structural)] mb-4 bg-zinc-900">
                <Image
                  src={CASE_STUDY_IMAGES[study.slug] || "/images/case-study-task-management.jpg"}
                  alt={study.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-structural)]">
                <span className="text-[11px] font-mono font-medium tracking-wider uppercase text-[var(--text-secondary)]">
                  {study.slug}
                </span>
                {study.topCommit?.verified && (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 rounded-md px-2 py-0.5 text-[10px] font-mono font-medium">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>

              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:underline">
                {study.title}
              </h2>

              <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed line-clamp-2">
                {study.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {study.tech_stack.map((tech) => (
                  <span key={tech} className="linkhunt-badge">{tech}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-structural)] text-xs">
              <span className="text-[var(--text-secondary)] font-mono">{study.published_at}</span>
              <Link
                href={`/work/${study.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-primary)] hover:underline min-h-[44px]"
              >
                <span>View Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
