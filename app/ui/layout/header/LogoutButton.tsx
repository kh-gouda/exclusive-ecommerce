"use client";

import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function LogoutButton() {
  const t = useTranslations("accountControl");
  return (
    <button
      className="flex gap-2 items-center cursor-pointer w-full"
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      <ArrowLeftEndOnRectangleIcon className="text-white-color" />
      <span>{t("logout")}</span>
    </button>
  );
}
