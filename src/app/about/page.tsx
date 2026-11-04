import React from "react";
import { getResumeContent } from "../../content";
import { Download } from "lucide-react";

export const dynamic = "force-static";

export default function AboutPage() {
  const resume = getResumeContent();

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col items-start gap-4 pb-6 border-b border-[var(--border-structural)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)]">
          <span>[ENGINEERING_PROFILE]</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          {resume.name}
        </h1>
        <p className="text-base text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          {resume.persona_statement}
        </p>
        <div className="pt-2">
          <a
            href="/resume.pdf"
            download="Kamil_Hisham_Resume.pdf"
            className="inline-flex items-center gap-2 linkhunt-btn-primary rounded-full px-5 py-2.5 text-xs font-medium min-h-[44px] group"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </header>

      {/* Experience Timeline */}
      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] pb-2 border-b border-[var(--border-structural)]">
          Work Experience
        </h2>
        <div className="relative border-l border-[var(--border-structural)] ml-3 pl-6 space-y-8">
          {resume.experience_entries.map((exp, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--text-primary)] ring-4 ring-[var(--surface-primary)]" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  {exp.role} <span className="text-[var(--text-secondary)] font-normal">@ {exp.organization}</span>
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)] w-fit">
                  {exp.start_date} - {exp.end_date || "Present"}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                {exp.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Skills (Semantic HTML per Rule U1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-4 border-t border-[var(--border-structural)]">
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Formal Education
          </h2>
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
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Technical Capabilities
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.map((skill) => (
              <span key={skill} className="linkhunt-badge">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

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
