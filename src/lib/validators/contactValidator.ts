import { z } from "zod";

export const ContactFormInputSchema = z.object({
  name: z.string().min(1, "Name is required").max(120, "Name must not exceed 120 characters"),
  email: z.string().email("A valid email address is required"),
  message: z.string().min(1, "Message is required").max(2000, "Message must not exceed 2000 characters"),
});

export const ContactFormResultSchema = z.object({
  status: z.enum(["success", "validation-error", "server-error"]),
  fieldErrors: z.record(z.string()).optional(),
  submittedAt: z.string().datetime().optional(),
});

export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;
export type ContactFormResult = z.infer<typeof ContactFormResultSchema>;
