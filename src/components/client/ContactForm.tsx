"use client";

import React, { useState } from "react";
import { submitContactForm } from "../../lib/actions/submitContactForm";
import { PhosphorPaperPlaneTilt, PhosphorCheckCircle, PhosphorWarningCircle, PhosphorSpinnerGap } from "../icons";

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-status-error-fg">
      <PhosphorWarningCircle className="w-3.5 h-3.5 shrink-0" filled />
      <span>{msg}</span>
    </p>
  );
}

const SERVICES = ["REST API Architecture", "Database Normalization", "Next.js Full-Stack", "Code Review & Audit"];
const CONTACT_METHODS = [
  { id: "pref-email", value: "email", label: "Email" },
  { id: "pref-phone", value: "phone", label: "Phone / WhatsApp" },
  { id: "pref-other", value: "other", label: "GitHub Discussion" },
];

export function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error" | "validation-error">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [preferredContact, setPreferredContact] = useState("email");
  const [liveAnnouncement, setLiveAnnouncement] = useState("");
  const [mountedAt] = useState(() => Date.now());
  const [lastPayload, setLastPayload] = useState<{ subject: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    setFieldErrors({});
    const formData = new FormData(e.currentTarget);
    formData.append("durationMs", String(Date.now() - mountedAt));
    setLastPayload({ subject: formData.get("subject")?.toString() || "Engineering Inquiry", message: formData.get("message")?.toString() || "" });
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
    <form onSubmit={handleSubmit} noValidate className="linkhunt-card p-4 sm:p-6 flex flex-col gap-4 w-full min-w-0">
      <div className="border-b border-border-structural pb-3">
        <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-fg-accent">Inquiry Form</h2>
        <p className="text-base font-semibold text-text-primary mt-1">Send a direct message</p>
      </div>

      <div className="hidden" aria-hidden="true"><input name="hp_website" type="text" tabIndex={-1} autoComplete="off" /></div>

      <div className="min-w-0">
        <label htmlFor="field-name" className="block text-xs font-medium text-text-secondary mb-1">Full Name</label>
        <input id="field-name" name="name" type="text" required maxLength={100} placeholder="Jane Doe" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "err-name" : undefined} className="portfolio-input placeholder:text-text-muted dark:placeholder:text-text-secondary px-3.5 py-2.5 text-sm min-h-[44px] w-full max-w-full" />
        <FieldError id="err-name" msg={fieldErrors.name} />
      </div>

      <div className="min-w-0">
        <label htmlFor="field-email" className="block text-xs font-medium text-text-secondary mb-1">Email Address</label>
        <input id="field-email" name="email" type="email" required placeholder="name@example.com" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "err-email" : undefined} className="portfolio-input placeholder:text-text-muted dark:placeholder:text-text-secondary px-3.5 py-2.5 text-sm min-h-[44px] w-full max-w-full" />
        <FieldError id="err-email" msg={fieldErrors.email} />
      </div>

      <div className="min-w-0">
        <label htmlFor="field-subject" className="block text-xs font-medium text-text-secondary mb-1">Inquiry Type</label>
        <select id="field-subject" name="subject" className="portfolio-input px-3.5 py-2.5 text-sm min-h-[44px] w-full max-w-full">
          <option value="Full-time Engineering Role">Full-time Engineering Role</option>
          <option value="Technical Collaboration">Technical Collaboration / Open Source</option>
          <option value="Architecture Consultation">Architecture &amp; Schema Consultation</option>
          <option value="General Inquiry">General Engineering Inquiry</option>
        </select>
      </div>

      <div className="min-w-0">
        <span className="block text-xs font-medium text-text-secondary mb-1.5">Engineering Areas of Interest (Optional)</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs min-w-0">
          {SERVICES.map((svc) => (
            <label key={svc} className="flex items-start gap-2.5 px-3 py-3 rounded-lg border border-control-border bg-surface-primary cursor-pointer hover:border-border-highlight min-h-[44px] min-w-0">
              <input type="checkbox" name="services" value={svc} className="w-4 h-4 mt-0.5 rounded border-control-border shrink-0" />
              <span className="text-text-primary leading-snug">{svc}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="min-w-0">
        <span className="block text-xs font-medium text-text-secondary mb-1.5">Preferred Contact Method</span>
        <div className="flex flex-col gap-2 text-xs min-w-0" role="radiogroup" aria-label="Preferred Contact Method">
          {CONTACT_METHODS.map((item) => {
            const isSelected = preferredContact === item.value;
            return (
              <label key={item.id} htmlFor={item.id} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors min-h-[44px] min-w-0 ${isSelected ? "border-accent-border bg-accent-subtle" : "border-control-border bg-surface-primary hover:border-border-highlight"}`}>
                <input type="radio" id={item.id} name="preferredContact" value={item.value} checked={isSelected} onChange={() => setPreferredContact(item.value)} className="w-4 h-4 border-control-border shrink-0" />
                <span className="text-text-primary leading-snug font-medium">{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="field-message" className="block text-xs font-medium text-text-secondary mb-1">Message</label>
        <textarea id="field-message" name="message" rows={3} required minLength={10} maxLength={2000} placeholder="Describe your project, role, or question (at least 10 characters)..." aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? "err-message" : undefined} className="portfolio-input placeholder:text-text-muted dark:placeholder:text-text-secondary p-3 text-sm resize-none" />
        <FieldError id="err-message" msg={fieldErrors.message} />
      </div>

      <button type="submit" disabled={formState === "submitting"} className="w-full py-2.5 px-5 linkhunt-btn-primary rounded-lg flex items-center justify-center gap-2 group text-xs min-h-[44px]">
        {formState === "submitting" ? (<><PhosphorSpinnerGap className="w-4 h-4 animate-spin" /><span>Sending...</span></>) : (<><span className="text-xs">Send Message</span><PhosphorPaperPlaneTilt className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></>)}
      </button>

      <p className="text-[11px] text-center text-text-muted -mt-1">
        Inquiries receive a response within 24&ndash;48 hours. Direct email copy available above.
      </p>

      {formState === "success" && (
        <div role="status" className="p-3 bg-status-success-bg border border-status-success-border rounded-lg text-xs font-medium text-status-success-fg flex items-center gap-2">
          <PhosphorCheckCircle className="w-4 h-4 shrink-0" filled />
          <span>Thank you! Your message has been sent. I&apos;ll get back to you soon.</span>
        </div>
      )}
      {formState === "error" && (
        <div role="alert" className="p-3 bg-status-error-bg border border-status-error-border rounded-lg text-xs flex flex-col gap-2 text-status-error-fg">
          <div className="flex items-center gap-2 font-medium">
            <PhosphorWarningCircle className="w-4 h-4 shrink-0" filled />
            <span>Service unreachable. Your draft has been preserved:</span>
          </div>
          <a href={`mailto:kamil.hisham3124@gmail.com?subject=${encodeURIComponent(lastPayload?.subject || "Engineering Inquiry")}&body=${encodeURIComponent(lastPayload?.message || "")}`} className="inline-flex items-center gap-1 font-semibold underline min-h-[44px]">
            <span>Send pre-filled draft via email client &rarr;</span>
          </a>
        </div>
      )}

      <div className="sr-only" aria-live="assertive">{liveAnnouncement}</div>
    </form>
  );
}
