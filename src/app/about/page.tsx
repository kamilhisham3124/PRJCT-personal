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
import { Accordion } from "../../components/client/Accordion";
import { ArrowRight } from "lucide-react";

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
    <div className="flex flex-col gap-10">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[var(--border-structural)]">
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
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-[var(--border-structural)] shadow-card shrink-0 self-center md:self-auto">
          <Image src="/images/avatar.jpg" alt={resume.name} width={144} height={144} priority className="w-full h-full object-cover object-center" />
        </div>
      </header>

      {/* Key Engineering Metrics */}
      <AboutStats />

      {/* Experience Timeline */}
      <ExperienceTimeline entries={resume.experience_entries} />

      {/* Education & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-4 border-t border-[var(--border-structural)]">
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Education</h2>
          <dl className="space-y-1 text-sm">
            <dt className="font-medium text-[var(--text-primary)]">{resume.education.degree}</dt>
            <dd className="text-[var(--text-secondary)]">{resume.education.institution}, {resume.education.location}</dd>
            <dd className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                Graduated: {resume.education.graduation_date} | CGPA: {resume.education.cgpa}
              </span>
            </dd>
          </dl>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Skills &amp; Technologies</h2>
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.map((skill) => (
              <span key={skill} className="linkhunt-badge">{skill}</span>
            ))}
          </div>
        </section>
      </div>

      {/* Services & Capabilities */}
      <ServicesSection />

      {/* Technical FAQ Accordion */}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-[var(--text-primary)] pb-2 border-b border-[var(--border-structural)]">
          Frequently Addressed Technical Questions
        </h2>
        <Accordion items={ABOUT_FAQS} />
      </section>

      {/* Peer Endorsements */}
      <EndorsementsSection />

      {/* Accessibility & Standards */}
      <div className="border-l-2 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-r-lg border-y border-r border-emerald-200/60 dark:border-emerald-900/40">
        <h3 className="text-xs font-semibold text-[var(--text-primary)] mb-1">
          Accessibility &amp; Standards Conformance
        </h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          Engineered to meet WCAG 2.2 Level AA accessibility standards, featuring high-contrast typography,
          complete keyboard operability, screen reader live announcements, and support for reduced motion preferences.
        </p>
      </div>
    </div>
  );
}
