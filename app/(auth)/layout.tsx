import Image from "next/image";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex items-center h-195 mt-15 mb-35 *:flex-1 gap-25">
      <Image
        width={805}
        height={781}
        className="max-w-full"
        src="/images/shopping_car.webp"
        alt="shopping car"
      />
      <div>{children}</div>
    </main>
  );
}
