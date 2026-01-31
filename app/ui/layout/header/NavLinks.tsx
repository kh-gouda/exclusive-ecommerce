"use client";
import clsx from "clsx";
import Link from "next/link";
import { poppins } from "@shared/fonts";
import { usePathname } from "next/navigation";

export default function NavLinks() {
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
          Home
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
          Contact
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
          About
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
          SignUp
        </Link>
      </li>
    </ul>
  );
}
