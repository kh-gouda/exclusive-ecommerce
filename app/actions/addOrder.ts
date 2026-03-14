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

export async function applyCouponOnOrder(
  orderid: number,
  coupon: string,
  couponDiscount: number,
) {
  await sql`
  update orders set
  appliedcoupon = ${coupon},
  appliedcoupondiscount = ${couponDiscount}
  where orderid = ${orderid}
  `;

  return { success: true };
}

export async function setTotalAmount(orderId: number, totalAmount: number) {
  await sql`
  update orders set totalamount = ${totalAmount}
  where orderid = ${orderId}
  `;

  return { success: true };
}

export async function setPaymentMethod(orderId: number, paymentMethod: string) {
  await sql`
  update orders set paymentmethod = ${paymentMethod}
  where orderid = ${orderId}
  `;

  return { success: true };
}

export async function confirmOrder(orderId: number, state: boolean) {
  await sql`
  update orders set orderconfirmed = ${state}
  where orderid = ${orderId}
  `;

  return { success: true };
}

export async function confirmPayment(orderId: number, state: boolean) {
  await sql`
  update orders set orderpaid = ${state}
  where orderid = ${orderId}
  `;

  return { success: true };
}
