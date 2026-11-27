import React from "react";
import type { Metadata } from "next";
import { ContactForm } from "../../components/client/ContactForm";
import { CopyEmailButton } from "../../components/client/CopyEmailButton";
import { Breadcrumb } from "../../components/shared/Breadcrumb";
import { getResumeContent } from "../../content";
import {
  GithubBrandIcon,
  LinkedinBrandIcon,
  PhosphorEnvelopeSimple,
  PhosphorPhone,
  PhosphorCalendarBlank,
} from "../../components/icons";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kamil Hisham for software engineering opportunities and collaborations.",
};

export default function ContactPage() {
  const resume = getResumeContent();

  return (
    <div className="flex flex-col gap-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-structural)] mb-3">
          <span>Contact</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          Contact &amp; Inquiries
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-2xl leading-relaxed">
          Interested in working together or discussing engineering roles? Feel free to send a message
          or reach out directly through any of the channels below.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start min-w-0">
        <ContactForm />

        <div className="flex flex-col gap-6 min-w-0">
          <section className="linkhunt-card p-4 sm:p-6 min-w-0">
            <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-4 pb-2 border-b border-[var(--border-structural)]">
              Contact Information
            </h2>
            <div className="space-y-4 text-sm min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-3 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-structural)] min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <PhosphorEnvelopeSimple className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-text-secondary block">Email</span>
                    <a href={`mailto:${resume.contact.email}`} className="font-medium text-text-primary hover:text-fg-accent hover:underline transition-colors block text-xs sm:text-sm break-all">
                      {resume.contact.email}
                    </a>
                  </div>
                </div>
                <CopyEmailButton email={resume.contact.email} className="self-start sm:self-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-[var(--border-structural)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-colors min-h-[44px]" />
              </div>

              <div className="flex items-center gap-3 min-w-0">
                <PhosphorPhone className="w-4 h-4 text-text-secondary shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-text-secondary block">Phone</span>
                  <span className="font-medium text-text-primary text-xs sm:text-sm">{resume.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 min-w-0">
                <GithubBrandIcon className="w-4 h-4 text-text-secondary shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-text-secondary block">GitHub</span>
                  <a href={resume.contact.github} target="_blank" rel="noopener noreferrer" className="font-medium text-text-primary hover:text-fg-accent hover:underline transition-colors block text-xs sm:text-sm truncate">
                    github.com/kamilhisham3124
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 min-w-0">
                <LinkedinBrandIcon className="w-4 h-4 text-text-secondary shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-text-secondary block">LinkedIn</span>
                  <a href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-text-primary hover:text-fg-accent hover:underline transition-colors block text-xs sm:text-sm truncate">
                    linkedin.com/in/kamilhisham
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-border-structural">
                <a
                  href={`mailto:${resume.contact.email}?subject=Schedule%20Technical%20Intro%20/%20Discussion`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold linkhunt-btn-secondary min-h-[44px]"
                >
                  <PhosphorCalendarBlank className="w-3.5 h-3.5" />
                  <span>Email to Schedule a Call</span>
                </a>
              </div>
            </div>
          </section>

          <div className="border-l-2 border-accent-primary bg-surface-secondary rounded-r-lg p-4 border-y border-r border-border-structural min-w-0">
            <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-fg-accent mb-1">
              Privacy &amp; Data Notice
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Inquiries submitted through this form are securely processed for direct professional
              correspondence. Contact information is strictly confidential and never shared.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
