"use server";

import sql from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteCartItem(userid: number, productId: number) {
  await sql`
    delete from shoppingcart where userid = ${userid} and productid = ${productId}
    `;
  revalidatePath(`/account/${userid}/cart`);
  return { success: true };
}
