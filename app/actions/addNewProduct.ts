"use server";

import sql from "@/app/lib/db";
import { NEW_PRODUCT_TYPE } from "@/app/lib/typeDefinitions";
import { revalidatePath } from "next/cache";

export async function addNewProduct(product: NEW_PRODUCT_TYPE) {
  const existing = await sql`
  select productname from products where productname = ${product.name}
  `;

  if (existing.length) {
    throw new Error("The Product Already Exists You can Edit from edit page");
  } else {
    const insertedProduct = await sql`
    insert into products (productname, productdescription, productimages, productprice, productdiscount, editable)
    values (${product.name}, ${product.description}, ${product.images}, ${product.price}, ${product.discount}, true)
    returning productid;
    `;

    const productId = insertedProduct[0].productid;

    if (insertedProduct && productId) {
      await sql`
      insert into productcategories (productid, categoryid, subcategoryid)
      values (${productId}, ${product.category}, ${product.subCategory})
      `;

      await Promise.all(
        product.stock.map(
          (stock) => sql`
          insert into stock (productid, sizeid, colorid, quantity)
          values (${productId}, ${stock.sizeid}, ${stock.colorid}, ${stock.quantity})
          `,
        ),
      );

      revalidatePath("/dashboard/products");

      return { success: true };
    } else {
      throw new Error("something went wrong");
    }
  }
}
