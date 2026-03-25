"use client";
import clsx from "clsx";
import Link from "next/link";
import { poppins } from "@shared/fonts";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function NavLinks() {
  const t = useTranslations("navLinks");
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-10">
      <li>
        <Link
          className={clsx(
            `${poppins.className} font-normal text-base py-1.75 hover:border-b`,
            {
              "border-b": pathname === "/",
            },
          )}
          href="/"
        >
          {t("home")}
        </Link>
      </li>
      <li>
        <Link
          className={clsx(
            `${poppins.className} font-normal text-base py-1.75 hover:border-b`,
            {
              "border-b": pathname === "/contact",
            },
          )}
          href="/contact"
        >
          {t("contact")}
        </Link>
      </li>
      <li>
        <Link
          className={clsx(
            `${poppins.className} font-normal text-base py-1.75 hover:border-b `,
            {
              "border-b": pathname === "/about",
            },
          )}
          href="/about"
        >
          {t("about")}
        </Link>
      </li>
      <li>
        <Link
          className={clsx(
            `${poppins.className} font-normal text-base py-1.75 hover:border-b`,
            {
              "border-b": pathname === "/signup",
            },
          )}
          href="/signup"
        >
          {t("signUpIn")}
        </Link>
      </li>
    </ul>
  );
}
