"use server";

import sql from "@/app/lib/db";

export async function deleteCartItem(userid: number, productId: number) {
  await sql`
    delete from shoppingcart where userid = ${userid} and productid = ${productId}
    `;
  return { success: true };
}
