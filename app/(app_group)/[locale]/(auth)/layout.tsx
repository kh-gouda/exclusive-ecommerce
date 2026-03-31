import Image from "next/image";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center max-[1715px]:justify-center max-[820px]:p-2 gap-25 min-h-195 mt-15 mb-35 flex-wrap">
      <Image
        width={805}
        height={781}
        className="max-w-full rounded-sm"
        src="/images/shopping_car.webp"
        alt="shopping car"
      />
      <div>{children}</div>
    </div>
  );
}
