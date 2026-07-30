import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const validateResumeFile = expressAsyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    const resume = req.file;

    // Resume is required
    if (!resume) {
      res.status(400).json({
        success: false,
        message: "Please upload your resume.",
      });
      return;
    }

    // File type validation
    if (!ALLOWED_MIME_TYPES.includes(resume.mimetype)) {
      res.status(400).json({
        success: false,
        message: "Only PDF and DOCX files are supported.",
      });
      return;
    }

    // File size validation
    if (resume.size > MAX_FILE_SIZE) {
      res.status(400).json({
        success: false,
        message: "Resume size must not exceed 5 MB.",
      });
      return;
    }

    next();
  }
);