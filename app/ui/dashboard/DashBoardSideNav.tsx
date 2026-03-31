"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashBoardSideNav() {
  const pathname = usePathname();
  const [showLinks, setShowLinks] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "max-[1200px]:absolute max-[1200px]:top-0 max-[1200px]:strt-0 max-[1200px]:bg-white max-[1200px]:p-10 max-[1200px]:shadow z-10",
          {
            "max-[1200px]:hidden": !showLinks,
            "max-[1200px]:block": showLinks,
          },
        )}
      >
        <ul className="ps-8.25">
          <li className="my-2" onClick={() => setShowLinks(false)}>
            <Link
              className={clsx("text-gray-500", {
                "text-identity": pathname.endsWith("dashboard"),
              })}
              href={`/dashboard`}
            >
              Dashboard Home
            </Link>
          </li>
          <li className="my-2" onClick={() => setShowLinks(false)}>
            <Link
              className={clsx("text-gray-500", {
                "text-identity": pathname.endsWith("products"),
              })}
              href={`/dashboard/products`}
            >
              All Products
            </Link>
          </li>
          <li className="my-2" onClick={() => setShowLinks(false)}>
            <Link
              className={clsx("text-gray-500", {
                "text-identity": pathname.endsWith("add-new"),
              })}
              href={`/dashboard/products/add-new`}
            >
              Add New Product
            </Link>
          </li>
          <li className="my-2" onClick={() => setShowLinks(false)}>
            <Link
              className={clsx("text-gray-500", {
                "text-identity": pathname.endsWith("orders"),
              })}
              href={`/dashboard/orders`}
            >
              Orders
            </Link>
          </li>
        </ul>
      </div>
      <ul
        className="min-[1200px]:hidden flex flex-col justify-evenly items-center cursor-pointer h-4 w-7.5 absolute top-2 start-0 z-10"
        onClick={() => setShowLinks((prev) => !prev)}
      >
        <li className="w-6.5 h-0.5 bg-identity rounded-full"></li>
        <li className="w-6.5 h-1 bg-identity rounded-full"></li>
        <li className="w-6.5 h-0.5 bg-identity rounded-full"></li>
      </ul>
    </>
  );
}
