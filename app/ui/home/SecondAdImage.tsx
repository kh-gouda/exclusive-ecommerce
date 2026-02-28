"use client";
import { CldImage } from "next-cloudinary";

export default function SecondAdImage({ image }: { image: string }) {
  return (
    <CldImage
      width="568"
      height="330"
      src={image}
      crop="fill"
      format="webp"
      sizes="100vw"
      alt={image}
    />
  );
}
