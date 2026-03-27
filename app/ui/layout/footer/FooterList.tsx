import { FOOTER_LIST } from "@/app/lib/typeDefinitions";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function FooterList({
  listHeading,
  listItems,
}: FOOTER_LIST) {
  const t = await getTranslations("footer");
  return (
    <ul>
      <li className="text-white-text font-medium text-xl">{t(listHeading)}</li>
      {listItems.map((item) => {
        if (typeof item === "string") {
          return (
            <li key={item} className="text-white-text text-base my-6">
              {t(item)}
            </li>
          );
        } else {
          return (
            <li key={item.name} className="text-white-text text-base my-6">
              <Link href={item.link}>{t(item.name)}</Link>
            </li>
          );
        }
      })}
    </ul>
  );
}
