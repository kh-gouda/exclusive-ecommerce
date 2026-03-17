"use client";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountSideNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const id = session?.user.id;

  return (
    <div>
      <h3 className="font-medium">Manage My Account</h3>
      <ul className="pl-8.25">
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("profile"),
            })}
            href={`/account/${id}/profile`}
          >
            My Profile
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("address-book"),
            })}
            href={`/account/${id}/address-book`}
          >
            Address Book
          </Link>
        </li>
        {/* <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("payment-options"),
            })}
            href={`/account/${id}/payment-options`}
          >
            My Payment Options
          </Link>
        </li> */}
      </ul>

      <h3 className="font-medium">My Orders</h3>
      <ul className="pl-8.25">
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("pending"),
            })}
            href={`/account/${id}/orders/pending`}
          >
            Pending
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("in-progress"),
            })}
            href={`/account/${id}/orders/in-progress`}
          >
            In Progress
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("completed"),
            })}
            href={`/account/${id}/orders/completed`}
          >
            Completed
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("returns"),
            })}
            href={`/account/${id}/orders/returns`}
          >
            My Returns
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("cancellations"),
            })}
            href={`/account/${id}/orders/cancellations`}
          >
            My Cancellations
          </Link>
        </li>
      </ul>

      <h3 className="font-medium">
        <Link href={`/account/${id}/wishlist`}>My WishList</Link>
      </h3>
    </div>
  );
}
