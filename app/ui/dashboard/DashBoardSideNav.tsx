"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashBoardSideNav() {
  const pathname = usePathname();

  return (
    <div>
      <ul className="pl-8.25">
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("dashboard"),
            })}
            href={`/dashboard`}
          >
            Home
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("products"),
            })}
            href={`/dashboard/products`}
          >
            All Products
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("add-product"),
            })}
            href={`/dashboard/add-product`}
          >
            Add Product
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={clsx("text-gray-500", {
              "text-identity": pathname.endsWith("edit-product"),
            })}
            href={`/dashboard/edit-product`}
          >
            Edit Product
          </Link>
        </li>
      </ul>
    </div>
  );
}
