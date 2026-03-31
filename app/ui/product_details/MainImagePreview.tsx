"use client";
import { CldImage } from "next-cloudinary";

export default function MainImagePreview({ image }: { image: string }) {
  return (
    <div className="w-125 max-w-full overflow-hidden bg-gray-bg flex items-center justify-center">
      <CldImage
        width="446"
        height="315"
        src={image}
        crop="fill"
        format="webp"
        sizes="100vw"
        alt={image}
        className="max-w-full"
      />
    </div>
  );
}
