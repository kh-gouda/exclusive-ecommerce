"use client";
import { CldImage } from "next-cloudinary";

export default function FirstAdImage({ image }: { image: string }) {
  return (
    <CldImage
      width="248"
      height="176"
      src={image}
      crop="fill"
      format="webp"
      sizes="100vw"
      alt={image}
    />
  );
}
