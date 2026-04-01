// "use client";

import clsx from "clsx";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export default function DashBoardBreadCrumbs({
  breadCrumbs,
}: {
  breadCrumbs: { label: string; href: string; number?: boolean }[];
}) {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      <li className="flex items-center gap-2 opacity-50 text-sm">
        <Link href={"/"}>HOME</Link>
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
              <Link href={crumb.href}>{crumb.label}</Link>
              {i === breadCrumbs.length - 1 ? null : (
                <FaAngleRight className="text-2xl" />
              )}
            </li>
          ))
        : null}
    </ul>
  );
}
