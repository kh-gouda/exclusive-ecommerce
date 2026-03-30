"use client";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountSideNav() {
  const t = useTranslations();

  const pathname = usePathname();
  const { data: session } = useSession();

  const id = session?.user.id;

  return (
    <div>
      <h3 className="font-medium">{t("accountManagement.manageMyAccount")}</h3>
      <ul className="ps-8.25">
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("profile"),
            })}
            href={`/account/${id}/profile`}
          >
            {t("accountManagement.myProfile")}
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("address-book"),
            })}
            href={`/account/${id}/address-book`}
          >
            {t("accountManagement.addressBook")}
          </Link>
        </li>
      </ul>

      <h3 className="font-medium">{t("accountManagement.myOrders")}</h3>
      <ul className="ps-8.25">
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("pending"),
            })}
            href={`/account/${id}/orders/pending`}
          >
            {t("accountManagement.pending")}
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("in-progress"),
            })}
            href={`/account/${id}/orders/in-progress`}
          >
            {t("accountManagement.inProgress")}
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("completed"),
            })}
            href={`/account/${id}/orders/completed`}
          >
            {t("accountManagement.completed")}
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("returns"),
            })}
            href={`/account/${id}/orders/returns`}
          >
            {t("accountManagement.myReturns")}
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("cancellations"),
            })}
            href={`/account/${id}/orders/cancellations`}
          >
            {t("accountManagement.myCancellations")}
          </Link>
        </li>
      </ul>

      <h3 className="font-medium">
        <Link href={`/account/${id}/wishlist`}>
          {t("accountManagement.myWishlist")}
        </Link>
      </h3>
    </div>
  );
}
