"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { poppins } from "@shared/fonts";
import { useTranslations } from "next-intl";

export default function SearchBar() {
  const t = useTranslations("placeHolders");
  return (
    <form className="relative">
      <input
        className={`w-60.75 h-9.5 py-1.75 ps-5 pe-3 bg-gray-bg rounded-sm placeholder:${poppins.className} placeholder:text-xs`}
        type="search"
        id="search"
        name="search"
        placeholder={t("headerSearch")}
      />
      <MagnifyingGlassIcon
        className="h-4 w-4 absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer"
        role="button"
      />
    </form>
  );
}
