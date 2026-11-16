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
        }
      : formData;

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
    const annotations: string[] = [];
    if (validation.data.subject) {
      annotations.push(`[Inquiry Type: ${validation.data.subject}]`);
    }
    if (validation.data.preferredContact) {
      annotations.push(`[Preferred Channel: ${validation.data.preferredContact}]`);
    }
    if (validation.data.services && validation.data.services.length > 0) {
      annotations.push(`[Services: ${validation.data.services.join(", ")}]`);
    }

    const compiledMessage =
      annotations.length > 0
        ? `${annotations.join(" ")}\n\n${validation.data.message}`
        : validation.data.message;

    const success = await supabaseInsertContactMessage({
      name: validation.data.name,
      email: validation.data.email,
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
