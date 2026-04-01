"use client";

import BreadCrumbs from "@ui/shared/BreadCrumbs";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function BreadCrumbDetector() {
  const pathname = usePathname();
  const { data: session } = useSession();

  let breadCrumbs: { label: string; href: string }[] = [];

  if (pathname.includes("/account/") && pathname.includes("/profile")) {
    breadCrumbs = [
      { label: "myAccount", href: `/account/${session?.user.id}/profile` },
    ];
  }

  if (pathname.includes("/account/") && pathname.includes("/address-book")) {
    breadCrumbs = [
      {
        label: "addressBook",
        href: `/account/${session?.user.id}/address-book`,
      },
    ];
  }

  if (pathname.includes("/account/") && pathname.includes("/orders/pending")) {
    breadCrumbs = [
      {
        label: "orders",
        href: `/account/${session?.user.id}/orders/pending`,
      },
      {
        label: "pending",
        href: `/account/${session?.user.id}/orders/pending`,
      },
    ];
  }

  if (
    pathname.includes("/account/") &&
    pathname.includes("/orders/in-progress")
  ) {
    breadCrumbs = [
      {
        label: "orders",
        href: `/account/${session?.user.id}/orders/pending`,
      },
      {
        label: "inProgress",
        href: `/account/${session?.user.id}/orders/in-progress`,
      },
    ];
  }

  if (
    pathname.includes("/account/") &&
    pathname.includes("/orders/completed")
  ) {
    breadCrumbs = [
      {
        label: "orders",
        href: `/account/${session?.user.id}/orders/pending`,
      },
      {
        label: "completed",
        href: `/account/${session?.user.id}/orders/completed`,
      },
    ];
  }

  if (pathname.includes("/account/") && pathname.includes("/orders/returns")) {
    breadCrumbs = [
      {
        label: "orders",
        href: `/account/${session?.user.id}/orders/pending`,
      },
      {
        label: "returns",
        href: `/account/${session?.user.id}/orders/returns`,
      },
    ];
  }

  if (
    pathname.includes("/account/") &&
    pathname.includes("/orders/cancellations")
  ) {
    breadCrumbs = [
      {
        label: "orders",
        href: `/account/${session?.user.id}/orders/pending`,
      },
      {
        label: "cancellations",
        href: `/account/${session?.user.id}/orders/cancellations`,
      },
    ];
  }

  return <BreadCrumbs breadCrumbs={breadCrumbs} />;
}
