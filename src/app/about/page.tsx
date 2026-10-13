import React from "react";
import { getResumeContent } from "../../content";

export const dynamic = "force-static";

export default function AboutPage() {
  const resume = getResumeContent();

  return (
    <div className="flex flex-col gap-10">
      <header className="border-b border-structural pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase text-text-secondary">
            Engineering Persona / Technical Dossier
          </span>
          <div className="font-marginalia text-annotation text-text-secondary">
            // single content model: site and resume synchrony
          </div>
        </div>
        <h1 className="text-3xl font-bold font-display text-text-primary mt-1">
          {resume.name}
        </h1>
        <p className="text-base text-text-secondary font-display mt-2 max-w-3xl leading-relaxed">
          {resume.persona_statement}
        </p>
        <div className="mt-4 flex gap-4">
          <a
            href="/resume.pdf"
            download="Kamil_Hisham_Resume.pdf"
            className="px-3 py-1.5 border-structural bg-text-primary text-surface-primary text-xs font-mono font-bold hover:opacity-90"
          >
            Download Resume (Generated PDF)
          </a>
        </div>
      </header>

      {/* Experience Timeline */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-mono uppercase text-text-secondary tracking-wider">
          01 / Work Experience
        </h2>
        <div className="flex flex-col gap-4">
          {resume.experience_entries.map((exp, idx) => (
            <div key={idx} className="border-structural bg-surface-secondary p-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 border-b border-structural pb-2 mb-3">
                <span className="text-base font-bold font-display text-text-primary">
                  {exp.role} @ {exp.organization}
                </span>
                <span className="text-xs font-mono text-text-secondary">
                  {exp.start_date} to {exp.end_date || "Present"}
                </span>
              </div>
              <p className="text-sm text-text-secondary font-display leading-relaxed">
                {exp.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="border-structural bg-surface-secondary p-6">
          <h2 className="text-xs font-mono uppercase text-text-secondary mb-3">
            02 / Formal Education
          </h2>
          <div className="font-bold text-base text-text-primary">
            {resume.education.degree}
          </div>
          <div className="text-sm text-text-secondary mt-1">
            {resume.education.institution}, {resume.education.location}
          </div>
          <div className="text-xs font-mono text-text-secondary mt-2">
            Graduated: {resume.education.graduation_date} | CGPA: {resume.education.cgpa}
          </div>
        </section>

        <section className="border-structural bg-surface-secondary p-6">
          <h2 className="text-xs font-mono uppercase text-text-secondary mb-3">
            03 / Verified Technical Capabilities
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill}
                className="border-structural bg-surface-primary px-2.5 py-1 text-xs font-mono text-text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* WCAG 2.2 AA Conformance Statement (DOC-21 Section 5.1) */}
      <section className="border-structural bg-surface-primary p-6 border-l-4 border-l-text-primary">
        <h2 className="text-xs font-mono uppercase text-text-secondary mb-1">
          Accessibility Governance Statement
        </h2>
        <p className="text-xs text-text-secondary font-mono leading-relaxed">
          Conforms to WCAG 2.2 Level AA. Enforces strict contrast ratios (&ge;7:1 primary text),
          minimum 24x24px touch targets, full keyboard traversal, polite and assertive live regions,
          and CSS-level prefers-reduced-motion honorifics.
        </p>
      </section>
    </div>
  );
}
