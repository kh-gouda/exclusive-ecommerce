"use server";

import sql from "@/app/lib/db";
import { CART_TYPE } from "@/app/lib/typeDefinitions";

export async function addOrder(
  userid: number,
  appliedCoupon: string,
  appliedCouponDiscount: number,
) {
  const insertedOrder = await sql`
  insert into orders (userid, appliedcoupon, appliedcoupondiscount) values (${userid}, ${appliedCoupon}, ${appliedCouponDiscount}) returning orderid
  `;

  return insertedOrder;
}

export async function addOrderItems(orderId: number, products: CART_TYPE[]) {
  await Promise.all(
    products.map(
      (product) => sql`
  insert into orderItems (orderid, productid, quantity, unitprice) values (${orderId}, ${product.id}, ${product.quantity}, ${product.price})
  `,
    ),
  );
  return { success: true };
}

export async function clearShoppingCart(userId: number) {
  await sql`delete from shoppingcart where userid = ${userId}`;
}
