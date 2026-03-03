"use client";
import { CldImage } from "next-cloudinary";

export default function EmployeeImage({ image }: { image: string }) {
  return (
    <CldImage
      width="232"
      height="391"
      src={image}
      crop="fill"
      format="webp"
      sizes="100vw"
      alt={image}
    />
  );
}
