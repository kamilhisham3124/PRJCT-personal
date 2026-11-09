import { NextResponse, type NextRequest } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { getResumeContent } from "../../content";

export const dynamic = "force-dynamic";

function escapePdf(text: string): string {
  return text.split("\\").join("\\\\").split("(").join("\\(").split(")").join("\\)");
}

export async function GET(request: NextRequest) {
  const isDownload = request.nextUrl.searchParams.get("download") === "true";
  const contentDisposition = isDownload
    ? 'attachment; filename="Kamil_Hisham_Resume.pdf"'
    : 'inline; filename="Kamil_Hisham_Resume.pdf"';

  const diskPath = path.join(process.cwd(), "public", "Kamil_Hisham_Resume.pdf");

  if (fs.existsSync(diskPath)) {
    const fileBytes = fs.readFileSync(diskPath);
    return new NextResponse(fileBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": contentDisposition,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400",
      },
    });
  }

  // Fallback programmatic generation if static PDF is missing
  const resume = getResumeContent();
  const textCommands: string[] = [
    "BT",
    "/F1 18 Tf",
    "50 740 Td",
    `(${escapePdf(resume.name.toUpperCase())}) Tj`,
    "/F2 10 Tf",
    "0 -18 Td",
    `(${escapePdf(`${resume.contact.email} | ${resume.contact.phone}`)}) Tj`,
    "ET",
  ];
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
      "Content-Disposition": contentDisposition,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400",
    },
  });
}
