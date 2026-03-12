"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ClipboardDocumentCheckIcon,
  StarIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import LogoutButton from "@ui/layout/header/LogoutButton";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function AccountControl() {
  const { data: session } = useSession();
  const id = session?.user.id;

  const [isOpen, setIsOpen] = useState(false);
  const handleItemClick = () => {
    setIsOpen(false); // Close the menu
  };
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <UserIcon
          className={clsx(
            "h-5 w-5 cursor-pointer hover:fill-identity hover:text-identity",
            {
              "fill-identity text-identity": isOpen,
            },
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-linear-to-r from-identity to-black-color">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleItemClick}>
            <Link
              href={`/account/${id}/profile`}
              className="flex gap-2 items-center w-full"
            >
              <UserIcon className="text-white-color" />
              <span>Manage My Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleItemClick}>
            <Link
              href={`/account/${id}/orders/in-progress`}
              className="flex gap-2 items-center w-full"
            >
              <ClipboardDocumentCheckIcon className="text-white-color" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleItemClick}>
            <Link
              href={`/account/${id}/orders/cancellations`}
              className="flex gap-2 items-center w-full"
            >
              <XCircleIcon className="text-white-color" />
              <span>My cancellations</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleItemClick}>
            <Link
              href={`/account/${id}/reviews`}
              className="flex gap-2 items-center w-full"
            >
              <StarIcon className="text-white-color" />
              <span>My Reviews</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleItemClick}>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
