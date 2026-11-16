import { z } from "zod";

export const ContactFormInputSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must not exceed 100 characters"),
  email: z.string().email("A valid email address is required"),
  subject: z.string().max(120).optional(),
  services: z.array(z.string()).optional(),
  preferredContact: z.enum(["email", "phone", "other"]).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message must not exceed 2000 characters"),
});

export const ContactFormResultSchema = z.object({
  status: z.enum(["success", "validation-error", "server-error"]),
  fieldErrors: z.record(z.string()).optional(),
  submittedAt: z.string().datetime().optional(),
});

export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;
export type ContactFormResult = z.infer<typeof ContactFormResultSchema>;
