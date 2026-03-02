"use client";
import { CldImage } from "next-cloudinary";

export default function GalleryImage({ image }: { image: string }) {
  return (
    <CldImage
      width="120"
      height="100"
      src={image}
      crop="fill"
      format="webp"
      sizes="100vw"
      alt={image}
    />
  );
}
