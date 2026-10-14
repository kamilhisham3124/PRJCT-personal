import React from "react";
import { getResumeContent } from "../../content";
import { Download } from "lucide-react";

export const dynamic = "force-static";

export default function AboutPage() {
  const resume = getResumeContent();

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col items-start gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-accent-brand dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
          <span>[SYSTEMS_PROFILE]</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
          {resume.name}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {resume.persona_statement}
        </p>
        <div className="pt-2">
          <a
            href="/resume.pdf"
            download="Kamil_Hisham_Resume.pdf"
            className="inline-flex items-center gap-2 bg-accent-brand hover:bg-[#5349e0] text-white font-semibold rounded-full px-5 py-2.5 shadow-stripe-btn transition-all group"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </header>

      {/* Experience Section — Vertical Timeline */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
          Work Experience
        </h2>
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 pl-6 space-y-8">
          {resume.experience_entries.map((exp, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-accent-brand ring-4 ring-white dark:ring-[#080D1A]" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {exp.role} <span className="text-accent-brand font-semibold">@ {exp.organization}</span>
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 w-fit">
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

      {/* Education & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
            Formal Education
          </h2>
          <div>
            <div className="font-bold text-base text-slate-900 dark:text-white">
              {resume.education.degree}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {resume.education.institution}, {resume.education.location}
            </div>
            <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
              Graduated: {resume.education.graduation_date} | CGPA: {resume.education.cgpa}
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
            Technical Capabilities
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 hover:border-accent-brand transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Accessibility Callout — Left Accent Callout */}
      <div className="border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-r-xl p-5 border-y border-r border-emerald-200/40 dark:border-emerald-900/40">
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
