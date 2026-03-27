import clsx from "clsx";
import { inter } from "@shared/fonts";
import { getTranslations } from "next-intl/server";

export default async function LogoText({ parent }: { parent: string }) {
  const t = await getTranslations("logo");
  return (
    <h2
      className={clsx(`${inter.className} text-2xl font-bold`, {
        "text-black-color": parent === "header",
        "text-white-text": parent === "footer",
      })}
    >
      {t("logoText")}
    </h2>
  );
}
