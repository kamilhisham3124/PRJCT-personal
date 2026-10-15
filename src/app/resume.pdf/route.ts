import { NextResponse } from "next/server";
import { getResumeContent } from "../../content";

function escapePdf(text: string): string {
  return text.split("\\").join("\\\\").split("(").join("\\(").split(")").join("\\)");
}

export async function GET() {
  const resume = getResumeContent();

  const textCommands: string[] = [
    "BT",
    "/F1 18 Tf",
    "50 740 Td",
    `(${escapePdf(resume.name.toUpperCase())}) Tj`,
    "/F2 10 Tf",
    "0 -18 Td",
    `(${escapePdf(`${resume.contact.email} | ${resume.contact.phone} | ${resume.education.location}`)}) Tj`,
    "0 -14 Td",
    `(${escapePdf(`GitHub: ${resume.contact.github} | LinkedIn: ${resume.contact.linkedin}`)}) Tj`,
    "0 -22 Td",
    "/F1 12 Tf",
    "(PROFESSIONAL SUMMARY) Tj",
    "/F2 9 Tf",
    "0 -14 Td",
    `(${escapePdf(resume.persona_statement.substring(0, 105))}) Tj`,
    "0 -12 Td",
    `(${escapePdf(resume.persona_statement.substring(105))}) Tj`,
    "0 -22 Td",
    "/F1 12 Tf",
    "(WORK EXPERIENCE) Tj",
  ];

  for (const exp of resume.experience_entries) {
    textCommands.push(
      "/F1 10 Tf",
      "0 -14 Td",
      `(${escapePdf(`${exp.role} @ ${exp.organization}`)}) Tj`,
      "/F2 9 Tf",
      "0 -12 Td",
      `(${escapePdf(`${exp.start_date} to ${exp.end_date || "Present"} | ${exp.location || "Remote"}`)}) Tj`,
      "0 -12 Td",
      `(${escapePdf(exp.summary.substring(0, 105))}) Tj`
    );
    if (exp.summary.length > 105) {
      textCommands.push(
        "0 -11 Td",
        `(${escapePdf(exp.summary.substring(105, 210))}) Tj`
      );
    }
  }

  textCommands.push(
    "0 -20 Td",
    "/F1 12 Tf",
    "(EDUCATION) Tj",
    "/F2 9 Tf",
    "0 -14 Td",
    `(${escapePdf(`${resume.education.degree} - ${resume.education.institution}`)}) Tj`,
    "0 -12 Td",
    `(${escapePdf(`Graduated: ${resume.education.graduation_date} | CGPA: ${resume.education.cgpa}`)}) Tj`,
    "0 -20 Td",
    "/F1 12 Tf",
    "(TECHNICAL CAPABILITIES) Tj",
    "/F2 9 Tf",
    "0 -14 Td",
    `(${escapePdf(resume.skills.slice(0, 5).join(", "))}) Tj`,
    "0 -12 Td",
    `(${escapePdf(resume.skills.slice(5).join(", "))}) Tj`,
    "ET"
  );

  const streamContent = textCommands.join("\n");
  const streamLength = Buffer.byteLength(streamContent, "utf-8");

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n",
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `6 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];
  let currentOffset = Buffer.byteLength(pdf, "utf-8");

  for (const obj of objects) {
    offsets.push(currentOffset);
    pdf += obj;
    currentOffset += Buffer.byteLength(obj, "utf-8");
  }

  const startXref = currentOffset;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
  const pdfBytes = Buffer.from(pdf + xref + trailer, "utf-8");

  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Kamil_Hisham_Resume.pdf"',
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400",
    },
  });
}
