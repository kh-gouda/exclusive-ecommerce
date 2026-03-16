"use server";

import sql from "@/app/lib/db";

export async function preserveAd(ad: {
  logo: string;
  image: string;
  title: string;
  details: string;
  productId: number;
  duration: number;
  totalAmount: number;
}) {
  const preservedAd = await sql`
  insert into ads (adarea, adtitle, adlogo, addetails, adimage, productid, endtime, totalamount)
  values (1, ${ad.title}, ${ad.logo}, ${ad.details}, ${ad.image}, ${ad.productId}, NOW() + (${ad.duration} * INTERVAL '1 day'), ${ad.totalAmount})
  returning adid
  `;

  return preservedAd;
}
