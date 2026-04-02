"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { poppins } from "@shared/fonts";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, SubmitEvent, useState } from "react";

export default function SearchBar() {
  const t = useTranslations("placeHolders");
  const [searchItem, setSearchItem] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const searchResult = await fetchSearchResult(searchItem);
    // console.log(searchResult);
    router.push(`/search-result?searchItem=${searchItem}`);
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <input
        className={`w-60.75 h-9.5 py-1.75 ps-5 pe-3 bg-gray-bg rounded-sm placeholder:${poppins.className} placeholder:text-xs`}
        type="search"
        id="search"
        name="search"
        placeholder={t("headerSearch")}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchItem(e.target.value)
        }
      />
      <MagnifyingGlassIcon
        className="h-4 w-4 absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer"
        role="button"
      />
    </form>
  );
}
