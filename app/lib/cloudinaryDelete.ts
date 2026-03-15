import cloudinary from "@/app/lib/cloudinary";

type CloudinaryDeleteResult = {
  result: "ok" | "not found" | string;
};

export async function deleteImage(
  publicId: string,
): Promise<CloudinaryDeleteResult> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    return result as CloudinaryDeleteResult;
  } catch (error) {
    console.error("Cloudinary delete failed:", error);
    throw new Error("Image deletion failed");
  }
}

type CloudinaryBulkDeleteResult = {
  deleted: Record<string, "deleted" | "not_found" | string>;
};

export async function deleteMultipleImages(
  publicIds: string[],
): Promise<CloudinaryBulkDeleteResult> {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);

    return result as CloudinaryBulkDeleteResult;
  } catch (error) {
    console.error("Cloudinary bulk delete failed:", error);
    throw new Error("Images deletion failed");
  }
}
