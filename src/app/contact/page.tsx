import React from "react";
import { ContactForm } from "../../components/client/ContactForm";
import { getResumeContent } from "../../content";
import { Mail, Phone } from "lucide-react";

export const dynamic = "force-static";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function ContactPage() {
  const resume = getResumeContent();

  return (
    <div className="flex flex-col gap-10">
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-sky-50 dark:bg-sky-950/60 text-aero-sky dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] mb-4">
          <span>[COMM_AERO_CHANNEL]</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
          Contact &amp; Technical Inquiries
        </h1>
        <p className="text-base text-slate-600 dark:text-sky-100/90 mt-3 max-w-2xl leading-relaxed">
          Reach out for engineering roles, systems reviews, or architectural discussions.
          Messages are validated server-side and recorded with explicit timestamps.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <ContactForm />

        <div className="flex flex-col gap-6">
          <section className="aero-panel rounded-xl p-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-aero-sky dark:text-sky-300 mb-5 pb-3 border-b border-sky-100 dark:border-sky-800/60">
              Verified Coordinates
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-aero-sky shrink-0" />
                <div>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-sky-300/80 block">Email</span>
                  <a
                    href={`mailto:${resume.contact.email}`}
                    className="font-semibold text-slate-900 dark:text-white hover:text-aero-sky transition-colors"
                  >
                    {resume.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-aero-sky shrink-0" />
                <div>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-sky-300/80 block">Phone</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {resume.contact.phone}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <GithubIcon className="w-4 h-4 text-slate-700 dark:text-sky-200 shrink-0" />
                <div>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-sky-300/80 block">GitHub</span>
                  <a
                    href={resume.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-slate-900 dark:text-white hover:text-aero-sky transition-colors"
                  >
                    github.com/kamilhisham3124
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <LinkedinIcon className="w-4 h-4 text-[#0284C7] shrink-0" />
                <div>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-sky-300/80 block">LinkedIn</span>
                  <a
                    href={resume.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-slate-900 dark:text-white hover:text-aero-sky transition-colors"
                  >
                    linkedin.com/in/kamilhisham
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Callout — Left Accent Callout */}
          <div className="border-l-4 border-sky-400 dark:border-sky-600 bg-sky-50/70 dark:bg-sky-950/30 rounded-r-xl p-5 border-y border-r border-sky-200/50 dark:border-sky-900/40 shadow-sm">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-aero-sky dark:text-sky-300 mb-1">
              Privacy &amp; Communications Notice
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Information submitted through this form is stored in a secured PostgreSQL database
              and used strictly for professional correspondence. Inquiries are never shared or
              retained for marketing purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
