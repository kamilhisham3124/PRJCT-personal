"use server";

import {
  ContactFormInputSchema,
  ContactFormResult,
} from "../validators/contactValidator";
import { supabaseInsertContactMessage } from "../accessors/supabaseAccessor";

export async function submitContactForm(
  formData: FormData | Record<string, string>
): Promise<ContactFormResult> {
  const rawData =
    formData instanceof FormData
      ? {
          name: formData.get("name")?.toString() || "",
          email: formData.get("email")?.toString() || "",
          subject: formData.get("subject")?.toString() || undefined,
          services: formData.getAll("services").map((s) => s.toString()),
          preferredContact: (formData.get("preferredContact")?.toString() || "email") as "email" | "phone" | "other",
          message: formData.get("message")?.toString() || "",
          hp_website: formData.get("hp_website")?.toString() || undefined,
          durationMs: formData.get("durationMs") ? Number(formData.get("durationMs")) : undefined,
        }
      : formData;

  const duration =
    typeof rawData.durationMs === "number"
      ? rawData.durationMs
      : typeof rawData.durationMs === "string"
      ? Number(rawData.durationMs)
      : undefined;

  // Bot mitigation: silent success on honeypot fill or inhuman submission speed (< 800ms)
  if (rawData.hp_website || (duration !== undefined && !Number.isNaN(duration) && duration < 800)) {
    console.error("[submitContactForm] Automated bot submission dropped silently");
    return { status: "success", submittedAt: new Date().toISOString() };
  }

  const validation = ContactFormInputSchema.safeParse(rawData);

  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of validation.error.issues) {
      const field = issue.path[0]?.toString() || "form";
      fieldErrors[field] = issue.message;
    }
    return {
      status: "validation-error",
      fieldErrors,
    };
  }

  try {
    const cleanName = validation.data.name.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
    const cleanEmail = validation.data.email.trim().toLowerCase();
    const cleanMessage = validation.data.message.trim();

    const annotations: string[] = [];
    if (validation.data.subject) {
      annotations.push(`[Inquiry Type: ${validation.data.subject}]`);
    }
    if (validation.data.preferredContact) {
      annotations.push(`[Preferred Channel: ${validation.data.preferredContact}]`);
    }
    if (validation.data.services && validation.data.services.length > 0) {
      annotations.push(`[Areas: ${validation.data.services.join(", ")}]`);
    }

    const compiledMessage =
      annotations.length > 0
        ? `${annotations.join(" ")}\n\n${cleanMessage}`
        : cleanMessage;

    const success = await supabaseInsertContactMessage({
      name: cleanName,
      email: cleanEmail,
      message: compiledMessage,
    });
    if (!success) {
      return {
        status: "server-error",
      };
    }

    return {
      status: "success",
      submittedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error("[submitContactForm] Unexpected error during form submission:", err);
    return {
      status: "server-error",
    };
  }
}
