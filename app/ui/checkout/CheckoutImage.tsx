"use client";
import { CldImage } from "next-cloudinary";

export default function CheckoutImage({
  productImage,
}: {
  productImage: string;
}) {
  return (
    <CldImage
      width="50"
      height="50"
      src={productImage}
      crop="fill"
      format="webp"
      sizes="100vw"
      alt={productImage}
    />
  );
}
