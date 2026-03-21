"use server";

import sql from "@/app/lib/db";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export async function deleteProductById(productId: number) {
  await sql`
  delete from products where productid = ${productId}
  `;

  revalidatePath("/dashboard/products");
  // redirect("/dashboard/products");
  return { success: true };
}
