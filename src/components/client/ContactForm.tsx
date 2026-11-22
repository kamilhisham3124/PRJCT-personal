"use client";

import React, { useState } from "react";
import { submitContactForm } from "../../lib/actions/submitContactForm";
import {
  PhosphorPaperPlaneTilt,
  PhosphorCheckCircle,
  PhosphorWarningCircle,
  PhosphorSpinnerGap,
} from "../icons";

export function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error" | "validation-error">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [liveAnnouncement, setLiveAnnouncement] = useState("");
  const [mountedAt] = useState(() => Date.now());
  const [lastPayload, setLastPayload] = useState<{ subject: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    formData.append("durationMs", String(Date.now() - mountedAt));
    setLastPayload({
      subject: formData.get("subject")?.toString() || "Engineering Inquiry",
      message: formData.get("message")?.toString() || "",
    });

    const result = await submitContactForm(formData);

    if (result.status === "validation-error") {
      setFormState("validation-error");
      setFieldErrors(result.fieldErrors || {});
      setLiveAnnouncement("Please check the form for errors.");
    } else if (result.status === "server-error") {
      setFormState("error");
      setLiveAnnouncement("Service unreachable. Please use the direct email link.");
    } else {
      setFormState("success");
      setLiveAnnouncement("Your message has been sent successfully.");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="linkhunt-card p-4 sm:p-6 sm:p-7 flex flex-col gap-4 max-w-xl w-full">
      <div className="border-b border-[var(--border-structural)] pb-3">
        <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--text-secondary)]">Inquiry Form</h2>
        <p className="text-base font-semibold text-[var(--text-primary)] mt-1">Send a direct message</p>
      </div>

      {/* Bot mitigation honeypot - invisible to human users */}
      <div className="hidden" aria-hidden="true" style={{ display: "none" }}><input name="hp_website" type="text" tabIndex={-1} autoComplete="off" /></div>

      <div>
        <label htmlFor="field-name" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Full Name</label>
        <input id="field-name" name="name" type="text" required maxLength={100} placeholder="Jane Doe" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "err-name" : undefined} className="w-full bg-[var(--surface-primary)] border border-[var(--border-structural)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--border-highlight)] transition-colors min-h-[44px]" />
        {fieldErrors.name && <p id="err-name" className="text-xs text-rose-500 mt-1 font-medium">{fieldErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="field-email" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Email Address</label>
        <input id="field-email" name="email" type="email" required placeholder="name@example.com" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "err-email" : undefined} className="w-full bg-[var(--surface-primary)] border border-[var(--border-structural)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--border-highlight)] transition-colors min-h-[44px]" />
        {fieldErrors.email && <p id="err-email" className="text-xs text-rose-500 mt-1 font-medium">{fieldErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="field-subject" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Inquiry Type</label>
        <select id="field-subject" name="subject" className="w-full bg-[var(--surface-primary)] border border-[var(--border-structural)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-highlight)] transition-colors min-h-[44px]">
          <option value="Full-time Engineering Role">Full-time Engineering Role</option>
          <option value="Technical Collaboration">Technical Collaboration / Open Source</option>
          <option value="Architecture Consultation">Architecture &amp; Schema Consultation</option>
          <option value="General Inquiry">General Engineering Inquiry</option>
        </select>
      </div>

      {/* Checkbox Group: Technical Areas of Interest */}
      <div>
        <span className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Engineering Areas of Interest (Optional)</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {["REST API Architecture", "Database Normalization", "Next.js Full-Stack", "Code Review & Audit"].map((svc) => (
            <label key={svc} className="flex items-center gap-2 p-2 rounded-lg border border-[var(--border-structural)] bg-[var(--surface-primary)] cursor-pointer hover:border-[var(--border-highlight)] min-h-[44px]">
              <input type="checkbox" name="services" value={svc} className="w-4 h-4 rounded text-blue-600 focus:ring-[var(--border-focus)] border-[var(--border-structural)]" />
              <span className="text-[var(--text-primary)]">{svc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Radio Button Group: Preferred Contact Method */}
      <div>
        <span className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Preferred Contact Method</span>
        <div className="flex flex-wrap gap-2.5 sm:gap-4 text-xs">
          {[
            { id: "pref-email", value: "email", label: "Email" },
            { id: "pref-phone", value: "phone", label: "Phone / WhatsApp" },
            { id: "pref-other", value: "other", label: "GitHub Discussion" },
          ].map((item, idx) => (
            <label key={item.id} className="flex items-center gap-2 cursor-pointer min-h-[44px]">
              <input type="radio" id={item.id} name="preferredContact" value={item.value} defaultChecked={idx === 0} className="w-4 h-4 text-blue-600 focus:ring-[var(--border-focus)] border-[var(--border-structural)]" />
              <span className="text-[var(--text-primary)]">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="field-message" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Message</label>
        <textarea id="field-message" name="message" rows={3} required minLength={10} maxLength={2000} placeholder="Describe your project, role, or question (at least 10 characters)..." aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? "err-message" : undefined} className="w-full bg-[var(--surface-primary)] border border-[var(--border-structural)] rounded-lg p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--border-highlight)] transition-colors resize-none" />
        {fieldErrors.message && <p id="err-message" className="text-xs text-rose-500 mt-1 font-medium">{fieldErrors.message}</p>}
      </div>

      <button type="submit" disabled={formState === "submitting"} className="w-full py-2.5 px-5 linkhunt-btn-primary rounded-lg transition-opacity flex items-center justify-center gap-2 group disabled:opacity-50 text-xs font-semibold min-h-[44px]">
        {formState === "submitting" ? (<><PhosphorSpinnerGap className="w-4 h-4 animate-spin" /><span>Sending...</span></>) : (<><span className="text-xs">Send Message</span><PhosphorPaperPlaneTilt className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></>)}
      </button>

      <p className="text-[11px] text-center text-[var(--text-secondary)] -mt-1">
        Inquiries receive a response within 24&ndash;48 hours. Direct email copy available above.
      </p>

      {/* Notifications */}
      {formState === "success" && (
        <div role="status" className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-lg text-xs font-medium text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <PhosphorCheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" filled />
          <span>Thank you! Your message has been sent. I&apos;ll get back to you soon.</span>
        </div>
      )}
      {formState === "error" && (
        <div role="alert" className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-lg text-xs flex flex-col gap-2 text-rose-800 dark:text-rose-300">
          <div className="flex items-center gap-2 font-medium">
            <PhosphorWarningCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" filled />
            <span>Service unreachable. Your draft has been preserved:</span>
          </div>
          <a
            href={`mailto:kamil.hisham3124@gmail.com?subject=${encodeURIComponent(lastPayload?.subject || "Engineering Inquiry")}&body=${encodeURIComponent(lastPayload?.message || "")}`}
            className="inline-flex items-center gap-1 font-semibold underline min-h-[44px]"
          >
            <span>Send pre-filled draft via email client &rarr;</span>
          </a>
        </div>
      )}

      <div className="sr-only" aria-live="assertive">{liveAnnouncement}</div>
    </form>
  );
}
