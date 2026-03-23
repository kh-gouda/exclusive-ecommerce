"use server";

import sql from "@/app/lib/db";

export async function updateProductName(
  productId: number,
  productName: string,
) {
  await sql`
  update products
  set productname = ${productName}
  where productid = ${productId}
  `;
}

export async function updateProductDescription(
  productId: number,
  productDescription: string,
) {
  await sql`
  update products
  set productdescription = ${productDescription}
  where productid = ${productId}
  `;
}

export async function updateProductPrice(
  productId: number,
  productPrice: number,
) {
  await sql`
  update products
  set productprice = ${productPrice}
  where productid = ${productId}
  `;
}

export async function updateProductDiscount(
  productId: number,
  productDiscount: number,
) {
  await sql`
  update products
  set productdiscount = ${productDiscount}
  where productid = ${productId}
  `;
}

export async function updateProductStock(stockId: number, quantity: number) {
  await sql`
  update stock
  set quantity = ${quantity}
  where stockid = ${stockId}
  `;
}

export async function addNewStock(
  productId: number,
  sizeId: number,
  colorId: number,
  quantity: number,
) {
  const exist = await sql`
  select * from stock where productid = ${productId} and sizeid = ${sizeId} and colorid = ${colorId}
  `;
  if (exist.length) {
    throw new Error("Stock Variants Already Exist, You Can Edit Quantity");
  } else {
    await sql`
    insert into stock (productid, sizeid, colorid, quantity)
    values (${productId}, ${sizeId}, ${colorId}, ${quantity})
    `;
  }

  return { success: true };
}
