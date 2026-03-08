"use server";

import sql from "@/app/lib/db";
import { CART_TYPE } from "@/app/lib/typeDefinitions";

export async function updateCart(userid: number, products: CART_TYPE[]) {
  await Promise.all(
    products.map(
      (product) =>
        sql`
        update shoppingcart set quantity = ${product.quantity} where userid = ${userid} and productid = ${product.id}
        `,
    ),
  );

  return { success: true };
}
