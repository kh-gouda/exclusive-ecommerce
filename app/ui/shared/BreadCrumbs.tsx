"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";

export default function BreadCrumbs() {
  const pathName = usePathname();
  const links = pathName.split("/");
  console.log(links);

  return (
    <ul className="flex items-center gap-2">
      {links.map((link, i) => {
        return i === 0 ? (
          <li key={link} className="flex items-center gap-2 opacity-50 text-sm">
            <Link href={"/"}>HOME</Link>
            {i === links.length - 1 ? null : (
              <FaAngleRight className="text-2xl" />
            )}
          </li>
        ) : (
          <li
            key={link}
            className={clsx("flex items-center gap-2 text-sm", {
              "opacity-50": !pathName.endsWith(link),
            })}
          >
            <Link href={`/${links.slice(1, i + 1).join("/")}`}>
              {link.toUpperCase()}
            </Link>
            {i === links.length - 1 ? null : (
              <FaAngleRight className="text-2xl" />
            )}
          </li>
        );
      })}
    </ul>
  );
}
