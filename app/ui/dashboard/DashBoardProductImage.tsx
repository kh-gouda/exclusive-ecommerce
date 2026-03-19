"use client";
import { CldImage } from "next-cloudinary";

export default function DashBoardProductImage({ image }: { image: string }) {
  return (
    <CldImage
      width="50"
      height="50"
      src={image}
      crop="fill"
      format="webp"
      sizes="100vw"
      alt={image}
    />
  );
}
