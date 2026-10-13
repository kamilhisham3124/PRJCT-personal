import { z } from "zod";

export const CaseStudyContentSchema = z.object({
  slug: z.string().min(1),
  title: z.string().max(100),
  summary: z.string().max(280),
  tech_stack: z.array(z.string()).min(1),
  github_repo: z.string().url(),
  preview_url: z.string().url().optional(),
  published_at: z.string(),
  problem_statement: z.string().optional(),
  architecture_overview: z.string().optional(),
  database_design: z.string().optional(),
  verifiable_metrics: z.array(z.object({
    metric: z.string(),
    value: z.string(),
  })).optional(),
});

export const ExperienceEntrySchema = z.object({
  role: z.string(),
  organization: z.string(),
  location: z.string().optional(),
  start_date: z.string(),
  end_date: z.string().nullable(),
  summary: z.string(),
});

export const ResumeContentSchema = z.object({
  name: z.string(),
  contact: z.object({
    phone: z.string(),
    email: z.string().email(),
    github: z.string().url(),
    github_username: z.string(),
    linkedin: z.string().url(),
  }),
  persona_statement: z.string(),
  experience_entries: z.array(ExperienceEntrySchema),
  education: z.object({
    degree: z.string(),
    institution: z.string(),
    location: z.string(),
    graduation_date: z.string(),
    cgpa: z.string(),
  }),
  skills: z.array(z.string()),
});

export type CaseStudyContent = z.infer<typeof CaseStudyContentSchema>;
export type ResumeContent = z.infer<typeof ResumeContentSchema>;
