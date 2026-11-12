import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCaseStudies, getCaseStudyBySlug } from "../../../content";
import { githubAccessor } from "../../../lib/accessors/githubAccessor";
import { CredentialCard } from "../../../components/shared/CredentialCard";
import { CaseStudyNav } from "../../../components/shared/CaseStudyNav";
import { MetricsCard } from "../../../components/shared/MetricsCard";
import { ProjectBottomNav } from "../../../components/shared/ProjectBottomNav";

export const dynamic = "force-static";

const CASE_STUDY_IMAGES: Record<string, string> = {
  "employee-task-management": "/images/case-study-task-management.jpg",
  "gift-delivery-ecommerce": "/images/case-study-ecommerce.jpg",
};

export function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Case Study Not Found" };
  return { title: study.title, description: study.summary };
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
  const navItems = caseStudies.map((cs) => ({ path: `/work/${cs.slug}`, label: cs.title }));
  const currentIndex = caseStudies.findIndex((cs) => cs.slug === slug);
  const prevProject = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextProject = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  const parts = study.github_repo.split("/");
  const [repoOwner, repoName] = [parts[parts.length - 2], parts[parts.length - 1]];
  const commitRes = await githubAccessor({ repoOwner, repoName, maxCommits: 5 });
  const topCommit = commitRes.ok ? commitRes.data.commits[0] : null;
  const credState = !commitRes.ok ? "error" : commitRes.data.commits.length === 0 ? "unavailable" : "success";

  return (
    <div className="flex flex-col gap-8">
      <CaseStudyNav items={navItems} currentPath={`/work/${slug}`} />

      <header className="pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)] mb-3">
          <span>Case Study</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          {study.title}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-3xl leading-relaxed">
          {study.summary}
        </p>
        {study.role_and_responsibilities && (
          <div className="mt-3 p-3 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-structural)] text-xs text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">Role &amp; Responsibilities: </span>
            <span>{study.role_and_responsibilities}</span>
          </div>
        )}
      </header>

      <div className="relative w-full h-52 sm:h-72 rounded-xl overflow-hidden border border-[var(--border-structural)] bg-zinc-900 shadow-card">
        <Image
          src={CASE_STUDY_IMAGES[slug] || "/images/case-study-task-management.jpg"}
          alt={`${study.title} Architecture Visual`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 860px"
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section className="linkhunt-card p-6">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--border-structural)]">
              01. Context &amp; Problem
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{study.problem_statement}</p>
          </section>

          <section className="linkhunt-card p-6">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--border-structural)]">
              02. Architecture &amp; Implementation
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{study.architecture_overview}</p>
          </section>

          <section className="linkhunt-card p-6">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--border-structural)]">
              03. Database Schema &amp; Data Integrity
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{study.database_design}</p>
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

          <MetricsCard metrics={study.verifiable_metrics} />
        </aside>
      </div>

      <ProjectBottomNav
        prevProject={prevProject ? { slug: prevProject.slug, title: prevProject.title } : null}
        nextProject={nextProject ? { slug: nextProject.slug, title: nextProject.title } : null}
      />
    </div>
  );
}
