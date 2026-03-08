"use server";

import sql from "@/app/lib/db";

export async function addToWishList(userid: number, productid: number) {
  const exist = await sql`
  select * from wishlist where userid = ${userid} and productid = ${productid}`;

  if (exist.length) {
    await sql`delete from wishlist where userid = ${userid} and productid = ${productid}`;
  } else {
    await sql`insert into wishlist (userid, productid) values (${userid}, ${productid})`;
  }

  return { success: true };
}
