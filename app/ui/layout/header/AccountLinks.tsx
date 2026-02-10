import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import AccountControl from "@ui/layout/header/AccountControl";
import clsx from "clsx";
import Link from "next/link";

export default function UserLinks() {
  const id = 1;
  const isLogged = true;
  return (
    <ul className="flex items-center gap-4">
      <li>
        <Link href={`/account/${id}/wishlist`}>
          <HeartIcon className="h-5 w-5 cursor-pointer hover:fill-identity hover:text-identity" />
        </Link>
      </li>
      <li>
        <Link href={`/account/${id}/cart`}>
          <ShoppingCartIcon className="h-5 w-5 cursor-pointer hover:fill-identity hover:text-identity" />
        </Link>
      </li>
      <li
        className={clsx("", {
          block: isLogged,
          hidden: !isLogged,
        })}
      >
        <AccountControl />
      </li>
    </ul>
  );
}
