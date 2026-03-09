"use server";

import sql from "@/app/lib/db";
import { COUPON_TYPE } from "@/app/lib/typeDefinitions";

export async function fetchCoupon(coupon: string) {
  const fetchedCoupon = await sql<COUPON_TYPE[]>`
  select * from coupons where coupon = ${coupon}
  `;

  return fetchedCoupon;
}
