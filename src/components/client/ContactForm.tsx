"use client";

import React, { useState } from "react";
import { submitContactForm } from "../../lib/actions/submitContactForm";

export function ContactForm() {
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error" | "validation-error"
  >("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.status === "validation-error") {
      setFormState("validation-error");
      setFieldErrors(result.fieldErrors || {});
      setLiveAnnouncement("Validation error. Please verify input fields.");
    } else if (result.status === "server-error") {
      setFormState("error");
      setLiveAnnouncement("Server error encountered. Submission failed.");
    } else {
      setFormState("success");
      setLiveAnnouncement("Contact request recorded successfully.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-structural bg-surface-secondary p-4 md:p-6 flex flex-col gap-4 max-w-xl"
    >
      <div className="border-b border-structural pb-2">
        <h2 className="text-xs font-mono uppercase text-text-secondary">
          Direct Transmission Interface
        </h2>
        <p className="text-sm font-bold text-text-primary">
          Send Qualified Technical Inquiry
        </p>
      </div>

      <div>
        <label htmlFor="field-name" className="block text-xs font-mono text-text-secondary mb-1">
          Full Name
        </label>
        <input
          id="field-name"
          name="name"
          type="text"
          required
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "err-name" : undefined}
          className="w-full bg-surface-primary border-structural p-2 text-sm text-text-primary font-mono focus:outline-none"
        />
        {fieldErrors.name && (
          <p id="err-name" className="text-xs font-mono text-accent-signal mt-1">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="field-email" className="block text-xs font-mono text-text-secondary mb-1">
          Work Email
        </label>
        <input
          id="field-email"
          name="email"
          type="email"
          required
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "err-email" : undefined}
          className="w-full bg-surface-primary border-structural p-2 text-sm text-text-primary font-mono focus:outline-none"
        />
        {fieldErrors.email && (
          <p id="err-email" className="text-xs font-mono text-accent-signal mt-1">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="field-message" className="block text-xs font-mono text-text-secondary mb-1">
          Technical Scope / Message
        </label>
        <textarea
          id="field-message"
          name="message"
          rows={4}
          required
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "err-message" : undefined}
          className="w-full bg-surface-primary border-structural p-2 text-sm text-text-primary font-mono focus:outline-none"
        />
        {fieldErrors.message && (
          <p id="err-message" className="text-xs font-mono text-accent-signal mt-1">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full p-2.5 bg-text-primary text-surface-primary font-mono text-xs uppercase tracking-wider font-bold border-structural hover:opacity-90 disabled:opacity-50"
      >
        {formState === "submitting" ? "Transmitting..." : "Submit Message"}
      </button>

      {formState === "success" && (
        <div className="p-3 bg-surface-primary border-structural text-xs font-mono text-text-primary">
          [Transmitted]: Message persisted to database with verified timestamp.
        </div>
      )}

      {formState === "error" && (
        <div className="p-3 bg-surface-primary border-structural border-l-4 border-l-accent-signal text-xs font-mono text-accent-signal">
          [Failure]: Service currently unreachable. Please contact directly via email.
        </div>
      )}

      <div className="sr-only" aria-live="assertive">
        {liveAnnouncement}
      </div>
    </form>
  );
}
