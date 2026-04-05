// "use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export default function BreadCrumbs({
  breadCrumbs,
}: {
  breadCrumbs: { label: string; href: string; number?: boolean }[];
}) {
  const t = useTranslations("breadCrumbs");

  return (
    <ul className="flex flex-wrap items-center gap-2">
      <li className="flex items-center gap-2 opacity-50 text-sm">
        <Link href={"/"}>{t("home")}</Link>
        <FaAngleRight className="text-2xl" />
      </li>
      {breadCrumbs.length
        ? breadCrumbs.map((crumb, i) => (
            <li
              key={crumb.label}
              className={clsx("flex items-center gap-2 text-sm", {
                "opacity-50": i < breadCrumbs.length - 1,
              })}
            >
              <Link href={crumb.href}>
                {crumb.number ? crumb.label : t(crumb.label)}
              </Link>
              {i === breadCrumbs.length - 1 ? null : (
                <FaAngleRight className="text-2xl" />
              )}
            </li>
          ))
        : null}
    </ul>
  );
}
