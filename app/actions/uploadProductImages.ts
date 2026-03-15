"use server";

import cloudinary from "@/app/lib/cloudinary";
import { fileToBuffer } from "@/app/lib/fileToBuffer";
import { UploadApiResponse } from "cloudinary";

type UploadResult =
  | { success: true; publicIds: string[] }
  | { success: false; error: string };

export async function uploadProductImages(
  formData: FormData,
): Promise<UploadResult> {
  try {
    const files = formData.getAll("images");

    const imageFiles = files.filter(
      (file): file is File => file instanceof File,
    );

    if (imageFiles.length === 0) {
      throw new Error("No images uploaded");
    }

    if (imageFiles.length > 5) {
      throw new Error("Maximum 5 images allowed");
    }

    const uploads = imageFiles.map(async (file) => {
      const buffer = await fileToBuffer(file);

      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "exclusive/products" },
            (error: Error | undefined, result?: UploadApiResponse) => {
              if (error) return reject(error);
              if (!result) return reject(new Error("Upload failed"));

              resolve(result);
            },
          )
          .end(buffer);
      });

      return result.public_id;
    });

    const publicIds = await Promise.all(uploads);

    return {
      success: true,
      publicIds,
    };
  } catch (error) {
    console.error("Product images upload failed:", error);

    return {
      success: false,
      error: "Image upload failed",
    };
  }
}
