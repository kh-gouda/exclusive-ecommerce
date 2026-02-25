"use client";
import { CldImage } from "next-cloudinary";

export default function CategoryIcon({
  categoryIcon,
}: {
  categoryIcon: string;
}) {
  return (
    <CldImage
      width="56"
      height="56"
      src={categoryIcon}
      crop="fill"
      format="webp"
      sizes="100vw"
      alt={categoryIcon}
      className="group-hover:bg-white-color"
    />
  );
}
