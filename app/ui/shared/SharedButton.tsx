"use client";
import { ReactNode } from "react";
import { clsx } from "clsx";

export default function SharedButton({
  transparent,
  full,
  task,
  children,
}: {
  transparent?: boolean;
  full?: boolean;
  task: string;
  children: ReactNode;
}) {
  const handleClick = () => console.log(task);

  return (
    <button
      className={clsx(
        "py-4 px-12  font-medium text-base  rounded-sm cursor-pointer flex items-center justify-center gap-2",
        {
          "bg-identity text-white-text": !transparent,
          "border border-gray-300": transparent,
          "w-full": full,
        },
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
