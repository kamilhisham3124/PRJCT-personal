import { NextResponse } from "next/server";
import { getResumeContent } from "../../content";

export async function GET() {
  const resume = getResumeContent();

  const lines = [
    `%PDF-1.4`,
    `% KAMIL HISHAM - RESUME ARTIFACT`,
    `Candidate: ${resume.name}`,
    `Contact: ${resume.contact.email} | ${resume.contact.phone}`,
    `GitHub: ${resume.contact.github} | LinkedIn: ${resume.contact.linkedin}`,
    ``,
    `PROFESSIONAL SUMMARY:`,
    resume.persona_statement,
    ``,
    `WORK EXPERIENCE:`,
    ...resume.experience_entries.flatMap((exp) => [
      `- ${exp.role} @ ${exp.organization} (${exp.start_date} to ${exp.end_date || "Present"})`,
      `  ${exp.summary}`,
    ]),
    ``,
    `EDUCATION:`,
    `- ${resume.education.degree}`,
    `  ${resume.education.institution}, ${resume.education.location} (CGPA: ${resume.education.cgpa})`,
    ``,
    `TECHNICAL CAPABILITIES:`,
    resume.skills.join(", "),
    ``,
    `VERIFICATION: Generated from unified portfolio content source. Zero drift.`,
  ];

  const content = lines.join("\n");

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'inline; filename="Kamil_Hisham_Resume.txt"',
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400",
    },
  });
}
