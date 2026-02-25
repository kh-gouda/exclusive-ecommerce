"use client";
import { CldImage } from "next-cloudinary";

export default function CardImage({ productImage }: { productImage: string }) {
  return (
    <CldImage
      width="190"
      height="190"
      src={productImage}
      crop="fill"
      format="webp"
      sizes="100vw"
      alt={productImage}
    />
  );
}
