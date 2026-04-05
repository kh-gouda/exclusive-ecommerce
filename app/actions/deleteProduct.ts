"use server";

import sql from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteProductById(productId: number) {
  await sql`
  delete from products where productid = ${productId}
  `;

  revalidatePath("/dashboard/products");

  return { success: true };
}
