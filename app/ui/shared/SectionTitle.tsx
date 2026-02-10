import { ReactNode } from "react";
import { inter } from "@/app/ui/shared/fonts";

export default function SectionTitle({
  size = "36px",
  weight = 600,
  children,
}: {
  size?: string;
  weight?: number;
  children: ReactNode;
}) {
  const style = {
    fontSize: size,
    fontWeight: weight,
  };
  return (
    <h2
      className={`${inter.className} my-6 flex items-center gap-10`}
      style={style}
    >
      {children}
    </h2>
  );
}
