"use server";

import sql from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export async function addToCart(userid: number, productid: number) {
  const exist = await sql`
  select * from shoppingcart where userid = ${userid} and productid = ${productid}`;

  if (!exist.length) {
    await sql`insert into shoppingcart (userid, productid, quantity) values (${userid}, ${productid}, 1)`;
  }

  await sql`
  delete from wishlist where userid = ${userid} and productid = ${productid}
  `;

  revalidatePath("/account/[id]/wishlist");
  revalidatePath("/account/[id]/cart");

  return { success: true };
}
