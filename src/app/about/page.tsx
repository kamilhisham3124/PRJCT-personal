import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getResumeContent } from "../../content";
import { ResumeMenuButton } from "../../components/client/ResumeMenuButton";
import { AboutStats } from "../../components/shared/AboutStats";
import { ExperienceTimeline } from "../../components/shared/ExperienceTimeline";
import { ServicesSection } from "../../components/shared/ServicesSection";
import { EndorsementsSection } from "../../components/shared/EndorsementsSection";
import { TechBadge } from "../../components/shared/TechBadge";
import { Accordion } from "../../components/client/Accordion";
import { PhosphorArrowRight } from "../../components/icons";
import { Breadcrumb } from "../../components/shared/Breadcrumb";
import { formatMonthYear } from "../../lib/utils/formatDate";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About",
  description: "Background, work experience, education, and technical skills of Kamil Hisham.",
};

const ABOUT_FAQS = [
  {
    id: "roles",
    title: "What types of engineering roles are you targeting?",
    content: (
      <p>
        Full-time Software Engineer positions specializing in Python, Django REST Framework, relational database schema architecture, and dependable web applications.
      </p>
    ),
  },
  {
    id: "schema",
    title: "What is your approach to schema design and API contracts?",
    content: (
      <p>
        I design schemas to Third Normal Form (3NF), enforce strict foreign key constraints and transactional boundaries, and define typed contracts for all external and client-server boundaries.
      </p>
    ),
  },
];

export default function AboutPage() {
  const resume = getResumeContent();

  return (
    <div className="flex flex-col gap-6 sm:gap-8 min-w-0">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 pb-5 sm:pb-6 border-b border-[var(--border-structural)]">
        <div className="flex flex-col items-start gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)]">
            <span>About Me</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            {resume.name}
          </h1>
          <p className="text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            {resume.persona_statement}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <ResumeMenuButton />
            <Link href="/contact" className="inline-flex items-center gap-1.5 linkhunt-btn-primary rounded-lg px-4 py-2.5 text-xs font-semibold min-h-[44px]">
              <span>Get in Touch</span>
              <PhosphorArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-[var(--border-structural)] shadow-card shrink-0 self-center md:self-auto">
          <Image src="/images/avatar.jpg" alt={resume.name} width={144} height={144} loading="eager" className="w-full h-full object-cover object-center" />
        </div>
      </header>

      {/* Key Engineering Metrics */}
      <AboutStats />

      {/* Experience Timeline */}
      <ExperienceTimeline entries={resume.experience_entries} />

      {/* Education & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start pt-4 border-t border-[var(--border-structural)] min-w-0">
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Education</h2>
          <dl className="space-y-1 text-sm">
            <dt className="font-medium text-[var(--text-primary)]">{resume.education.degree}</dt>
            <dd className="text-[var(--text-secondary)]">{resume.education.institution}, {resume.education.location}</dd>
            <dd className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-status-success-bg text-status-success-fg border border-status-success-border">
                Graduated: {formatMonthYear(resume.education.graduation_date)} | CGPA: {resume.education.cgpa}
              </span>
            </dd>
          </dl>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Skills &amp; Technologies</h2>
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.map((skill) => (
              <TechBadge key={skill} name={skill} />
            ))}
          </div>
        </section>
      </div>

      {/* Core Engineering Competencies */}
      <ServicesSection />

      {/* Technical FAQ Accordion */}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-[var(--text-primary)] pb-2 border-b border-[var(--border-structural)]">
          Frequently Asked Questions
        </h2>
        <Accordion items={ABOUT_FAQS} />
      </section>

      {/* Engineering References & Verification */}
      <EndorsementsSection />

      {/* Accessibility & Standards */}
      <div className="border-l-2 border-status-success bg-status-success-bg p-4 rounded-r-lg border-y border-r border-status-success-border">
        <h3 className="text-xs font-semibold text-status-success-fg mb-1">
          Accessibility &amp; Standards Conformance
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed max-w-3xl">
          Engineered to meet WCAG 2.2 Level AA accessibility standards, featuring high-contrast typography,
          complete keyboard operability, screen reader live announcements, and support for reduced motion preferences.
        </p>
      </div>
    </div>
  );
}
