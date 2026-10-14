"use client";

import React, { useState } from "react";
import { submitContactForm } from "../../lib/actions/submitContactForm";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

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
      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-6 sm:p-7 shadow-sm flex flex-col gap-5 max-w-xl"
    >
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-accent-brand">
          Transmission Form
        </h2>
        <p className="text-base font-bold text-slate-900 dark:text-white mt-1">
          Send a direct inquiry
        </p>
      </div>

      <div>
        <label htmlFor="field-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Full Name
        </label>
        <input
          id="field-name"
          name="name"
          type="text"
          required
          placeholder="Jane Doe"
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "err-name" : undefined}
          className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-accent-brand focus:ring-2 focus:ring-accent-brand/20 transition-all"
        />
        {fieldErrors.name && (
          <p id="err-name" className="text-xs text-rose-500 mt-1 font-medium">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="field-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Work Email
        </label>
        <input
          id="field-email"
          name="email"
          type="email"
          required
          placeholder="jane@company.com"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "err-email" : undefined}
          className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-accent-brand focus:ring-2 focus:ring-accent-brand/20 transition-all"
        />
        {fieldErrors.email && (
          <p id="err-email" className="text-xs text-rose-500 mt-1 font-medium">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="field-message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Message
        </label>
        <textarea
          id="field-message"
          name="message"
          rows={4}
          required
          placeholder="Describe your inquiry, project scope, or opportunity..."
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "err-message" : undefined}
          className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-accent-brand focus:ring-2 focus:ring-accent-brand/20 transition-all resize-none"
        />
        {fieldErrors.message && (
          <p id="err-message" className="text-xs text-rose-500 mt-1 font-medium">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full py-2.5 px-5 bg-accent-brand hover:bg-[#5349e0] text-white font-semibold rounded-lg shadow-stripe-btn transition-all flex items-center justify-center gap-2 group disabled:opacity-50 text-sm"
      >
        {formState === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>

      {formState === "success" && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-lg text-xs font-medium text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Message persisted with verified timestamp.</span>
        </div>
      )}

      {formState === "error" && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-lg text-xs font-medium text-rose-800 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <span>Service currently unreachable. Please contact directly via email.</span>
        </div>
      )}

      <div className="sr-only" aria-live="assertive">{liveAnnouncement}</div>
    </form>
  );
}
