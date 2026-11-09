import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// Import validators directly via Node 22 TypeScript support
const { ContactFormInputSchema, ContactFormResultSchema } = await import(
  "../src/lib/validators/contactValidator.ts"
);
const { ResumeContentSchema, CaseStudyContentSchema } = await import(
  "../src/lib/validators/contentValidator.ts"
);
const { VercelTelemetryResponseSchema, VercelTelemetryRequestSchema } = await import(
  "../src/lib/validators/telemetryValidator.ts"
);
const { GitHubAccessorResponseSchema, GitHubAccessorRequestSchema } = await import(
  "../src/lib/validators/githubValidator.ts"
);
const { AccessorErrorEnvelopeSchema } = await import(
  "../src/lib/validators/errorEnvelope.ts"
);

test("ContactFormInputSchema validates correct inputs", () => {
  const valid = {
    name: "Alex Vance",
    email: "alex@blackmesa.org",
    message: "Inquiry regarding systems architecture and scalability.",
  };
  const result = ContactFormInputSchema.safeParse(valid);
  assert.equal(result.success, true);
});

test("ContactFormInputSchema rejects invalid email and empty name", () => {
  const invalidEmail = {
    name: "Alex",
    email: "not-an-email",
    message: "Hello world.",
  };
  assert.equal(ContactFormInputSchema.safeParse(invalidEmail).success, false);

  const emptyName = {
    name: "",
    email: "alex@valid.com",
    message: "Valid message text.",
  };
  assert.equal(ContactFormInputSchema.safeParse(emptyName).success, false);
});

test("ResumeContentSchema parses production resume.json", () => {
  const rawResume = JSON.parse(
    fs.readFileSync("src/content/resume.json", "utf8")
  );
  const result = ResumeContentSchema.safeParse(rawResume);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.name, "Kamil Hisham");
    assert.ok(result.data.skills.length > 5);
  }
});

test("CaseStudyContentSchema parses all production case studies", () => {
  const taskMgmt = JSON.parse(
    fs.readFileSync("src/content/case-studies/employee-task-management.json", "utf8")
  );
  const giftDelivery = JSON.parse(
    fs.readFileSync("src/content/case-studies/gift-delivery-ecommerce.json", "utf8")
  );

  assert.equal(CaseStudyContentSchema.safeParse(taskMgmt).success, true);
  assert.equal(CaseStudyContentSchema.safeParse(giftDelivery).success, true);
});

test("VercelTelemetryResponseSchema validates compliant telemetry structures", () => {
  const sample = {
    edgeLatencyMs: 24.5,
    bundleSizeKb: 72.4,
    nodeStatus: [
      { region: "iad1", status: "healthy" },
      { region: "fra1", status: "degraded" },
    ],
    measuredAt: new Date().toISOString(),
  };
  const result = VercelTelemetryResponseSchema.safeParse(sample);
  assert.equal(result.success, true);
});

test("AccessorErrorEnvelopeSchema validates standard error types", () => {
  const envelope = {
    errorType: "upstream_unavailable",
    occurredAt: new Date().toISOString(),
    retryable: true,
  };
  assert.equal(AccessorErrorEnvelopeSchema.safeParse(envelope).success, true);

  const invalid = {
    errorType: "unrecognized_error",
    occurredAt: new Date().toISOString(),
    retryable: false,
  };
  assert.equal(AccessorErrorEnvelopeSchema.safeParse(invalid).success, false);
});

test("GitHubAccessorResponseSchema validates commit arrays", () => {
  const payload = {
    commits: [
      {
        sha: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
        message: "feat: add schema normalization",
        authoredAt: "2026-02-12T10:00:00Z",
        verified: true,
      },
    ],
    repoUrl: "https://github.com/kamilhisham3124/PRJCT-personal",
    fetchedAt: new Date().toISOString(),
  };
  assert.equal(GitHubAccessorResponseSchema.safeParse(payload).success, true);
});

test("ContactFormResultSchema validates result variants", () => {
  const successRes = { status: "success", submittedAt: new Date().toISOString() };
  assert.equal(ContactFormResultSchema.safeParse(successRes).success, true);
  const errorRes = { status: "validation-error", fieldErrors: { email: "Invalid" } };
  assert.equal(ContactFormResultSchema.safeParse(errorRes).success, true);
  assert.equal(ContactFormResultSchema.safeParse({ status: "unknown" }).success, false);
});

test("VercelTelemetryRequestSchema validates valid metric requests", () => {
  const req = { metricSet: "edge_latency", windowMinutes: 60 };
  assert.equal(VercelTelemetryRequestSchema.safeParse(req).success, true);
  assert.equal(VercelTelemetryRequestSchema.safeParse({ metricSet: "invalid_metric" }).success, false);
});

test("GitHubAccessorRequestSchema validates accessor requests", () => {
  const req = { repoOwner: "kamilhisham3124", repoName: "PRJCT-personal", maxCommits: 5 };
  assert.equal(GitHubAccessorRequestSchema.safeParse(req).success, true);
  assert.equal(GitHubAccessorRequestSchema.safeParse({ repoOwner: "", repoName: "" }).success, false);
});
