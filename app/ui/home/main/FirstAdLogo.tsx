"use client";
import { CldImage } from "next-cloudinary";

export default function FirstAdLogo({ logo }: { logo: string }) {
  return (
    <CldImage
      width="49"
      height="49"
      src={logo}
      crop="fill"
      format="webp"
      sizes="100vw"
      alt={logo}
    />
  );
}
