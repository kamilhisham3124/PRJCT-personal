import React from "react";
import { ContactForm } from "../../components/client/ContactForm";
import { getResumeContent } from "../../content";

export const dynamic = "force-static";

export default function ContactPage() {
  const resume = getResumeContent();

  return (
    <div className="flex flex-col gap-8">
      <header className="border-b border-structural pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase text-accent-chemical font-bold tracking-wider">
            [ CONTACT INTERFACE // DIRECT TRANSMISSION PROTOCOL ]
          </span>
          <div className="font-marginalia text-annotation text-accent-chemical">
            // direct server action: 0 client-side credential exposure
          </div>
        </div>
        <h1 className="text-3xl font-extrabold font-display text-text-primary mt-1">
          Initiate Direct Technical Inquiry
        </h1>
        <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
          Reach out for engineering roles, systems reviews, or architectural discussions.
          Messages are validated server-side and recorded with explicit timestamps.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Unit */}
        <ContactForm />

        {/* Contact Coordinates & Privacy Governance */}
        <div className="flex flex-col gap-6">
          <section className="border-element bg-surface-secondary p-6">
            <h2 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-3 border-b border-structural pb-2">
              Direct Verified Coordinates
            </h2>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-text-secondary block">Email:</span>
                <a
                  href={`mailto:${resume.contact.email}`}
                  className="font-bold text-accent-chemical underline hover:text-text-primary"
                >
                  {resume.contact.email}
                </a>
              </div>
              <div>
                <span className="text-text-secondary block">Phone:</span>
                <span className="font-bold text-text-primary">
                  {resume.contact.phone}
                </span>
              </div>
              <div>
                <span className="text-text-secondary block">GitHub:</span>
                <a
                  href={resume.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-accent-chemical underline hover:text-text-primary"
                >
                  {resume.contact.github}
                </a>
              </div>
              <div>
                <span className="text-text-secondary block">LinkedIn:</span>
                <a
                  href={resume.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-accent-chemical underline hover:text-text-primary"
                >
                  {resume.contact.linkedin}
                </a>
              </div>
            </div>
          </section>

          <section className="border-element bg-surface-secondary p-6">
            <h2 className="text-xs font-mono uppercase text-accent-chemical font-bold mb-2">
              Privacy &amp; Data Rights Notice (DOC-21)
            </h2>
            <p className="text-xs text-text-secondary font-mono leading-relaxed">
              Voluntary submissions (name, email, message) are stored in the contact_messages
              table under strict RLS policies (RLS-01 denies anonymous reads). Data is used
              solely for correspondence. Deletion requests are fulfilled manually per Section 4.0.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
