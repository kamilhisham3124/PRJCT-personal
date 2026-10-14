import React from "react";
import { getResumeContent } from "../../content";
import { Download } from "lucide-react";

export const dynamic = "force-static";

export default function AboutPage() {
  const resume = getResumeContent();

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col items-start gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-sky-50 dark:bg-sky-950/60 text-aero-sky dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <span>[SYSTEMS_AERO_PROFILE]</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
          {resume.name}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-sky-100/90 max-w-3xl leading-relaxed">
          {resume.persona_statement}
        </p>
        <div className="pt-2">
          <a
            href="/resume.pdf"
            download="Kamil_Hisham_Resume.pdf"
            className="inline-flex items-center gap-2 aero-btn-primary rounded-full px-5 py-2.5 font-semibold transition-all group"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </header>

      {/* HyperUI Vertical Timeline with Frutiger Aero Gloss Beads */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white pb-2 border-b border-sky-200/60 dark:border-sky-800/60">
          Work Experience
        </h2>
        <div className="relative border-l-2 border-sky-200 dark:border-sky-800/80 ml-3.5 pl-6 space-y-8">
          {resume.experience_entries.map((exp, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-aero-sky ring-4 ring-sky-100 dark:ring-[#031B33] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {exp.role} <span className="text-aero-sky font-semibold">@ {exp.organization}</span>
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono bg-sky-50 dark:bg-sky-950/60 text-slate-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/60 w-fit">
                  {exp.start_date} - {exp.end_date || "Present"}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {exp.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Skills — HyperUI Grid with Aero Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <section className="aero-panel rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pb-2 border-b border-sky-100 dark:border-sky-800/60">
            Formal Education
          </h2>
          <div>
            <div className="font-bold text-base text-slate-900 dark:text-white">
              {resume.education.degree}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {resume.education.institution}, {resume.education.location}
            </div>
            <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              Graduated: {resume.education.graduation_date} | CGPA: {resume.education.cgpa}
            </div>
          </div>
        </section>

        <section className="aero-panel rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pb-2 border-b border-sky-100 dark:border-sky-800/60">
            Technical Capabilities
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-sky-50 dark:bg-sky-950/60 text-slate-700 dark:text-sky-200 border border-sky-200/70 dark:border-sky-800/60 hover:border-aero-sky transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Accessibility Callout — Frutiger Aero Emerald Strip */}
      <div className="border-l-4 border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-r-xl p-5 border-y border-r border-emerald-200/60 dark:border-emerald-900/50 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
          Accessibility &amp; Standards Conformance
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          Engineered to meet WCAG 2.2 Level AA accessibility standards, featuring high-contrast typography,
          complete keyboard operability, screen reader live announcements, and support for reduced motion
          preferences across all viewpoints.
        </p>
      </div>
    </div>
  );
}
