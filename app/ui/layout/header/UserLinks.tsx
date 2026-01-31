import {
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

export default function UserLinks() {
  const isLogged = false;
  return (
    <ul
      className={clsx("", {
        "flex items-center gap-4": isLogged,
        hidden: !isLogged,
      })}
    >
      <li>
        <Link href="/wishlist">
          <HeartIcon className="h-5 w-5 cursor-pointer" />
        </Link>
      </li>
      <li>
        <ShoppingCartIcon className="h-5 w-5 cursor-pointer" />
      </li>
      <li>
        <UserIcon className="h-5 w-5 cursor-pointer" />
      </li>
    </ul>
  );
}
