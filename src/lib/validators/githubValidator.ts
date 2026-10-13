import { z } from "zod";

export const GitHubCommitItemSchema = z.object({
  sha: z.string(),
  message: z.string(),
  authoredAt: z.string(),
  verified: z.boolean(),
});

export const GitHubAccessorRequestSchema = z.object({
  repoOwner: z.string().min(1),
  repoName: z.string().min(1),
  maxCommits: z.number().int().positive().optional().default(10),
});

export const GitHubAccessorResponseSchema = z.object({
  commits: z.array(GitHubCommitItemSchema),
  repoUrl: z.string().url(),
  fetchedAt: z.string().datetime(),
});

export type GitHubAccessorRequest = z.infer<typeof GitHubAccessorRequestSchema>;
export type GitHubAccessorResponse = z.infer<typeof GitHubAccessorResponseSchema>;
export type GitHubCommitItem = z.infer<typeof GitHubCommitItemSchema>;
