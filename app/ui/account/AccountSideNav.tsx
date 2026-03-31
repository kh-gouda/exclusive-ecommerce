"use client";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AccountSideNav() {
  const t = useTranslations();

  const [showLinks, setShowLinks] = useState(false);

  const pathname = usePathname();
  const { data: session } = useSession();

  const id = session?.user.id;

  return (
    <>
      <div
        className={clsx(
          "max-[750px]:absolute max-[750px]:top-0 max-[750px]:strt-0 max-[750px]:bg-white max-[750px]:p-10 max-[750px]:shadow z-10",
          {
            "max-[750px]:hidden": !showLinks,
            "max-[750px]:block": showLinks,
          },
        )}
      >
        <h3 className="font-medium">
          {t("accountManagement.manageMyAccount")}
        </h3>
        <ul className="ps-8.25">
          <li className="my-2" onClick={() => setShowLinks(false)}>
            <Link
              className={clsx("text-gray-500", {
                "text-identity": pathname.endsWith("profile"),
              })}
              href={`/account/${id}/profile`}
            >
              {t("accountManagement.myProfile")}
            </Link>
          </li>
          <li className="my-2" onClick={() => setShowLinks(false)}>
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
          <li className="my-2" onClick={() => setShowLinks(false)}>
            <Link
              className={clsx("text-gray-500", {
                "text-identity": pathname.endsWith("pending"),
              })}
              href={`/account/${id}/orders/pending`}
            >
              {t("accountManagement.pending")}
            </Link>
          </li>
          <li className="my-2" onClick={() => setShowLinks(false)}>
            <Link
              className={clsx("text-gray-500", {
                "text-identity": pathname.endsWith("in-progress"),
              })}
              href={`/account/${id}/orders/in-progress`}
            >
              {t("accountManagement.inProgress")}
            </Link>
          </li>
          <li className="my-2" onClick={() => setShowLinks(false)}>
            <Link
              className={clsx("text-gray-500", {
                "text-identity": pathname.endsWith("completed"),
              })}
              href={`/account/${id}/orders/completed`}
            >
              {t("accountManagement.completed")}
            </Link>
          </li>
          <li className="my-2" onClick={() => setShowLinks(false)}>
            <Link
              className={clsx("text-gray-500", {
                "text-identity": pathname.endsWith("returns"),
              })}
              href={`/account/${id}/orders/returns`}
            >
              {t("accountManagement.myReturns")}
            </Link>
          </li>
          <li className="my-2" onClick={() => setShowLinks(false)}>
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

        <h3 className="font-medium" onClick={() => setShowLinks(false)}>
          <Link href={`/account/${id}/wishlist`}>
            {t("accountManagement.myWishlist")}
          </Link>
        </h3>
      </div>

      <ul
        className="min-[750px]:hidden flex flex-col justify-evenly items-center cursor-pointer h-4 w-7.5 absolute top-2 start-0 z-10"
        onClick={() => setShowLinks((prev) => !prev)}
      >
        <li className="w-6.5 h-0.5 bg-black rounded-full"></li>
        <li className="w-6.5 h-0.5 bg-black rounded-full"></li>
        <li className="w-6.5 h-0.5 bg-black rounded-full"></li>
      </ul>
    </>
  );
}
