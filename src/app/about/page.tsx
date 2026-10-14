import React from "react";
import { getResumeContent } from "../../content";
import { Download, Briefcase, GraduationCap, Code2, ShieldCheck, UserCheck } from "lucide-react";

export const dynamic = "force-static";

export default function AboutPage() {
  const resume = getResumeContent();

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col items-start gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-[#635BFF] dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 shadow-sm">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Technical Qualifications</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {resume.name}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {resume.persona_statement}
        </p>
        <div className="pt-2">
          <a
            href="/resume.pdf"
            download="Kamil_Hisham_Resume.pdf"
            className="inline-flex items-center gap-2 bg-[#635BFF] hover:bg-[#5349e0] text-white font-semibold rounded-full px-5 py-2.5 shadow-stripe-btn hover:shadow-[0_6px_20px_rgba(99,91,255,0.45)] transition-all group"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </header>

      {/* Experience Section */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-[#635BFF]">
            <Briefcase className="w-4 h-4" />
          </div>
          <h2>Work Experience</h2>
        </div>
        <div className="flex flex-col gap-4">
          {resume.experience_entries.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-stripe flex flex-col gap-3"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {exp.role} <span className="text-[#635BFF]">@ {exp.organization}</span>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 w-fit">
                  {exp.start_date} to {exp.end_date || "Present"}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {exp.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-7 shadow-stripe flex flex-col gap-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <div className="w-7 h-7 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 flex items-center justify-center text-[#00D4FF]">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h2>Formal Education</h2>
          </div>
          <div>
            <div className="font-bold text-lg text-slate-900 dark:text-white">
              {resume.education.degree}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {resume.education.institution}, {resume.education.location}
            </div>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
              Graduated: {resume.education.graduation_date} | CGPA: {resume.education.cgpa}
            </div>
          </div>
        </section>

        <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-7 shadow-stripe flex flex-col gap-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-[#7A73FF]">
              <Code2 className="w-4 h-4" />
            </div>
            <h2>Technical Capabilities</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 hover:border-[#635BFF] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Accessibility Statement */}
      <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-stripe flex items-start gap-4">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Accessibility &amp; Standards Conformance
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Engineered to meet WCAG 2.2 Level AA accessibility standards, featuring high-contrast
            typography, complete keyboard operability, screen reader live announcements, and support
            for reduced motion preferences across all viewpoints.
          </p>
        </div>
      </section>
    </div>
  );
}
