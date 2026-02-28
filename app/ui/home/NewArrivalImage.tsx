"use client";
import { CldImage } from "next-cloudinary";

export default function NewArrivalImage({
  productImage,
}: {
  productImage: string;
}) {
  return (
    <CldImage
      width="446"
      height="315"
      src={productImage}
      crop="fill"
      format="webp"
      sizes="100vw"
      alt={productImage}
    />
  );
}
