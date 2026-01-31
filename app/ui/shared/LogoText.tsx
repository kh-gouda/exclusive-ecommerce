import clsx from "clsx";
import { inter } from "@shared/fonts";

export default function LogoText({ parent }: { parent: string }) {
  return (
    <h2
      className={clsx(`${inter.className} text-2xl font-bold`, {
        "text-black-color": parent === "header",
        "text-white-text": parent === "footer",
      })}
    >
      Exclusive
    </h2>
  );
}
