import cloudinary from "../../config/cloudinary";
import streamifier from "streamifier";

  interface UploadResumeResult {
  secureUrl: string;
  publicId: string;
  originalFileName: string;
  fileType: string;
  fileSize: number;
	}

export async function uploadResumeToCloudinary(
  file: Express.Multer.File
): Promise<UploadResumeResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "careerpilot/resumes",
        resource_type: "raw",
      },
      (error, result) => {

        if (error) {
        reject(error);
        return;
        }
				 if (!result) {
				reject(new Error("Cloudinary did not return an upload result."));
				return;
				}

        resolve({
				secureUrl: result.secure_url,
				publicId: result.public_id,
				originalFileName: file.originalname,
				fileType: file.mimetype,
				fileSize: file.size,
				});

      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
}