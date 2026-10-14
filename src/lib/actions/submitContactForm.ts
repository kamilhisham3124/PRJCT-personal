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
    const success = await supabaseInsertContactMessage(validation.data);
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
