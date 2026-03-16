"use server";

import cloudinary from "@/app/lib/cloudinary";
import { fileToBuffer } from "@/app/lib/fileToBuffer";
import { UploadApiResponse } from "cloudinary";

export async function uploadAdImage(file: File) {
  try {
    // const file = formData.get("image") as File;

    if (!file || file.size === 0) {
      throw new Error("No image uploaded");
    }

    const buffer = await fileToBuffer(file);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "exclusive/ads",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          },
        )
        .end(buffer);
    });

    return {
      success: true,
      publicId: result.public_id,
    };
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);

    return {
      success: false,
      error: "Image upload failed",
    };
  }
}
