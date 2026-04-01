"use client";

import DashBoardBreadCrumbs from "@ui/dashboard/DashBoardBreadCrumbs";
import { useParams, usePathname, useSearchParams } from "next/navigation";

export default function DashBoardBreadCrumbDetector() {
  const pathname = usePathname();
  const params = useSearchParams();
  const routeParams = useParams();

  let breadCrumbs: { label: string; href: string }[] = [];

  if (pathname.endsWith("/dashboard")) {
    breadCrumbs = [{ label: "DASHBOARD", href: `/dashboard` }];
  }

  if (pathname.includes("/dashboard/") && pathname.includes("/products")) {
    breadCrumbs = [
      { label: "DASHBOARD", href: `/dashboard` },
      { label: "PRODUCTS", href: `/dashboard/products` },
    ];
  }

  if (pathname.includes("/dashboard/") && pathname.includes("/products/edit")) {
    const productId = params.get("productid");
    breadCrumbs = [
      { label: "DASHBOARD", href: `/dashboard` },
      { label: "PRODUCTS", href: `/dashboard/products` },
      {
        label: "EDIT",
        href: `/dashboard/products/edit?productid=${productId}`,
      },
    ];
  }

  if (
    pathname.includes("/dashboard/") &&
    pathname.includes("/products/add-new")
  ) {
    breadCrumbs = [
      { label: "DASHBOARD", href: `/dashboard` },
      { label: "PRODUCTS", href: `/dashboard/products` },
      {
        label: "ADD NEW",
        href: `/dashboard/products/add-new`,
      },
    ];
  }

  if (pathname.includes("/dashboard/") && pathname.includes(`/orders`)) {
    breadCrumbs = [
      { label: "DASHBOARD", href: `/dashboard` },
      { label: "ORDERS", href: `/dashboard/orders` },
    ];
  }

  if (
    pathname.includes("/dashboard/") &&
    pathname.includes(`/orders/${routeParams.id}`)
  ) {
    breadCrumbs = [
      { label: "DASHBOARD", href: `/dashboard` },
      { label: "ORDERS", href: `/dashboard/orders` },
      {
        label: `${routeParams.id}`,
        href: `/dashboard/orders/${routeParams.id}`,
      },
    ];
  }

  return <DashBoardBreadCrumbs breadCrumbs={breadCrumbs} />;
}
