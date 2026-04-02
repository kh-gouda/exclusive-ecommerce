import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import AccountControl from "@ui/layout/header/AccountControl";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import clsx from "clsx";
import WishListCounter from "@ui/layout/header/WishListCounter";
import CartCounter from "@ui/layout/header/CartCounter";

export default async function UserLinks() {
  const session = await getServerSession(authOptions);
  const id = session?.user.id || "";
  return (
    <ul className="flex items-center gap-4">
      <li className="relative">
        <Link href={`/account/${id}/wishlist`}>
          <HeartIcon className="h-5 w-5 cursor-pointer hover:fill-identity hover:text-identity" />
        </Link>
        <WishListCounter />
      </li>
      <li className="relative">
        <Link href={`/account/${id}/cart`}>
          <ShoppingCartIcon className="h-5 w-5 cursor-pointer hover:fill-identity hover:text-identity" />
        </Link>
        <CartCounter />
      </li>
      <li
        className={clsx("", {
          block: session,
          hidden: !session,
        })}
      >
        <AccountControl />
      </li>
    </ul>
  );
}
