"use client";

import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
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
      <span>Logout</span>
    </button>
  );
}
