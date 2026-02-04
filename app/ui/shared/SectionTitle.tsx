import { ReactNode } from "react";
import { inter } from "@/app/ui/shared/fonts";
import clsx from "clsx";

export default function SectionTitle({
  size,
  weight,
  children,
}: {
  size?: number;
  weight?: string;
  children: ReactNode;
}) {
  const FONT_SIZE = size ? `text-[${size}px]` : "";
  const FONT_WEIGHT = weight ? `font-${weight}` : "";
  return (
    <h2
      className={clsx(`${inter.className} my-6 flex items-center gap-10`, {
        "text-4xl": !size,
        [FONT_SIZE]: size,
        "font-semibold": !weight,
        [FONT_WEIGHT]: weight,
      })}
    >
      {children}
    </h2>
  );
}
