import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export async function extractResumeContent(
  file: Express.Multer.File
): Promise<string> {

  // PDF
  if (file.mimetype === "application/pdf") {

    const pdfData = await pdfParse(file.buffer);

    return pdfData.text.trim();

  }

  // DOCX
  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {

    const docxData = await mammoth.extractRawText({
      buffer: file.buffer,
    });

    return docxData.value.trim();

  }

  throw new Error("Unsupported resume format.");

}