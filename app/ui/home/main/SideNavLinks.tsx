"use client";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export default function SideNavLinks({
  categories,
}: {
  categories: { categoryid: number; category: string }[];
}) {
  const t = useTranslations("categories");

  const [showLinks, setShowLinks] = useState(false);

  return (
    <>
      <div
        className={clsx("pe-4 border-e pt-11.25 text-nowrap ", {
          "max-[950px]:hidden": !showLinks,
          "max-[950px]:block max-[950px]:absolute max-[950px]:top-0 max-[950px]:start-0 max-[950px]:bg-white max-[950px]:w-50 max-[950px]:z-10":
            showLinks,
        })}
      >
        {categories.map((category) => (
          <Link
            key={category.categoryid}
            className="text-base not-last:mb-4 block"
            href={`/categories/${category.categoryid}`}
            onClick={() => setShowLinks(false)}
          >
            {t(`category${category.categoryid}`)}
          </Link>
        ))}
      </div>
      <ul
        className="min-[950px]:hidden flex flex-col justify-evenly items-center cursor-pointer h-4 w-7.5 absolute top-2 start-0 z-10"
        onClick={() => setShowLinks((prev) => !prev)}
      >
        <li className="w-6.5 h-0.5 bg-black rounded-full"></li>
        <li className="w-6.5 h-0.5 bg-black rounded-full"></li>
        <li className="w-6.5 h-0.5 bg-black rounded-full"></li>
      </ul>
    </>
  );
}
