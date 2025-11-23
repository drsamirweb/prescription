import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const payload = await req.json();
  const { patient, data, chamber, serial, date } = payload;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const drawText = (text: string, x: number, y: number, size = 10, color = rgb(0, 0, 0)) => {
    page.drawText(text, { x, y, size, font, color });
  };

  let y = 800;
  drawText(chamber.name || "", 40, y, 16); y -= 16;
  drawText(chamber.clinic || "", 40, y, 9, rgb(0.2,0.2,0.2));
  drawText(chamber.doctor || "", width - 260, 800, 12);

  // Patient row
  y -= 30;
  drawText(`Name: ${patient.name || ''}`, 40, y);
  drawText(`ID: ${patient.id || serial || ''}`, 240, y);
  drawText(`Age: ${patient.age ?? ''}`, 360, y);
  drawText(`Date: ${new Date(date).toLocaleDateString()}`, 460, y);

  const leftX = 40, rightX = 320;
  const lineHeight = 13;
  const bullets = (title: string, items: string[], x: number, startY: number) => {
    drawText(title, x, startY, 12); 
    let ty = startY - 16;
    items.forEach(it => { drawText(`• ${it}`, x, ty); ty -= lineHeight; });
    return ty - 8;
  };

  y = bullets("Chief Complaint", data.chiefComplaints || [], leftX, y);
  y = bullets("History", data.history || [], leftX, y);
  y = bullets("On Examinations", data.examinations || [], leftX, y);
  y = bullets("Diagnosis", data.diagnosis || [], leftX, y);

  // Right column
  let ry = 760;
  drawText("Rx", rightX, ry, 14); ry -= 18;
  (data.rx || []).forEach((r: string, idx: number) => { drawText(`${idx+1}. ${r}`, rightX, ry); ry -= lineHeight; });
  ry -= 10;
  drawText("Advices", rightX, ry, 12); ry -= 16;
  (data.advice || []).forEach((a: string) => { drawText(`• ${a}`, rightX, ry); ry -= lineHeight; });
  ry -= 10;
  drawText("Follow-up", rightX, ry, 12); ry -= 16;
  (data.followUp || []).forEach((f: string) => { drawText(`• ${f}`, rightX, ry); ry -= lineHeight; });

  drawText(chamber.footer || "", 40, 40, 9);
  drawText((chamber.contacts || []).join(" , "), 40, 28, 9);

  const pdfBytes = await pdfDoc.save(); // Uint8Array

  // Wrap in Buffer to satisfy NextResponse BodyInit
  const buffer = Buffer.from(pdfBytes);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=prescription.pdf",
    },
  });
}
