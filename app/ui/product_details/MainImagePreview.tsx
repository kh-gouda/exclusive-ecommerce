"use client";
import { CldImage } from "next-cloudinary";

export default function MainImagePreview({ image }: { image: string }) {
  return (
    <div className="w-125  bg-gray-bg flex items-center justify-center">
      <CldImage
        width="446"
        height="315"
        src={image}
        crop="fit"
        format="webp"
        sizes="100vw"
        alt={image}
      />
    </div>
  );
}
