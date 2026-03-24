"use server";

import sql from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export async function updateProductName(
  productId: number,
  productName: string,
) {
  await sql`
  update products
  set productname = ${productName}
  where productid = ${productId}
  `;
  revalidatePath(`/dashboard/products/edit?productid=${productId}`);

  return { success: true };
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
  revalidatePath(`/dashboard/products/edit?productid=${productId}`);

  return { success: true };
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
  revalidatePath(`/dashboard/products/edit?productid=${productId}`);

  return { success: true };
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
  revalidatePath(`/dashboard/products/edit?productid=${productId}`);

  return { success: true };
}

export async function updateProductCategory(
  productId: number,
  categoryId: number,
) {
  await sql`
  update productcategories set categoryid = ${categoryId} where productid = ${productId}
  `;

  revalidatePath(`/dashboard/products/edit?productid=${productId}`);

  return { success: true };
}

export async function updateProductSubCategory(
  productId: number,
  subcategoryId: number,
) {
  await sql`
  update productcategories set subcategoryid = ${subcategoryId} where productid = ${productId}
  `;

  revalidatePath(`/dashboard/products/edit?productid=${productId}`);

  return { success: true };
}

export async function updateProductStock(
  stockId: number,
  productId: number,
  quantity: number,
) {
  await sql`
  update stock
  set quantity = ${quantity}
  where stockid = ${stockId}
  `;
  revalidatePath(`/dashboard/products/edit?productid=${productId}`);

  return { success: true };
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
    await sql`
    update stock
    set quantity = quantity + ${quantity}
    where stockid = ${exist[0].stockid}
    `;
  } else {
    await sql`
    insert into stock (productid, sizeid, colorid, quantity)
    values (${productId}, ${sizeId}, ${colorId}, ${quantity})
    `;
  }
  revalidatePath(`/dashboard/products/edit?productid=${productId}`);

  return { success: true };
}
