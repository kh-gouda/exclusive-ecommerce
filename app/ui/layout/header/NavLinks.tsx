"use client";
import clsx from "clsx";
import Link from "next/link";
import { poppins } from "@shared/fonts";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function NavLinks() {
  const t = useTranslations("navLinks");
  const pathname = usePathname();
  const [showLinks, setShowLinks] = useState(false);
  return (
    <>
      <ul
        className={clsx("flex items-center gap-10", {
          "max-[550px]:hidden": !showLinks,
          "max-[550px]:flex max-[550px]:flex-col max-[550px]:absolute max-[550px]:-bottom-60 max-[550px]:end-0 max-[550px]:w-50 bg-white max-[550px]:py-4 max-[550px]:z-10":
            showLinks,
        })}
      >
        <li onClick={() => setShowLinks(false)}>
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
        <li onClick={() => setShowLinks(false)}>
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
        <li onClick={() => setShowLinks(false)}>
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
        <li onClick={() => setShowLinks(false)}>
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
      <ul
        className="min-[550px]:hidden flex flex-col justify-evenly items-center cursor-pointer h-4 w-7.5"
        onClick={() => setShowLinks((prev) => !prev)}
      >
        <li className="w-6.5 h-0.5 bg-black rounded-full"></li>
        <li className="w-6.5 h-0.5 bg-black rounded-full"></li>
        <li className="w-6.5 h-0.5 bg-black rounded-full"></li>
      </ul>
    </>
  );
}
