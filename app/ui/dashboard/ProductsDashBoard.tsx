"use client";

import { FETCHED_PRODUCT_BY_ID_TYPE } from "@/app/lib/typeDefinitions";
import DashBoardProductImage from "@ui/dashboard/DashBoardProductImage";
import Link from "next/link";
import { ChangeEvent, useEffect, useEffectEvent, useState } from "react";

export default function ProductsDashBoard({
  categories,
  products,
}: {
  categories: { categoryid: number; category: string }[];
  products: FETCHED_PRODUCT_BY_ID_TYPE[];
}) {
  const [productsList, setProductsList] = useState(() =>
    products.map((product) => {
      return {
        ...product,
        totalStock: product.stock.reduce(
          (acc, stock) => acc + stock.quantity,
          0,
        ),
      };
    }),
  );

  const [category, setCategory] = useState("all");

  const filterProducts = useEffectEvent(() => {
    if (category === "all") {
      const filteredProducts = products.map((product) => {
        return {
          ...product,
          totalStock: product.stock.reduce(
            (acc, stock) => acc + stock.quantity,
            0,
          ),
        };
      });

      setProductsList(filteredProducts);
    } else {
      const filteredProducts = products
        .filter((product) => product.categoryid === Number(category))
        .map((product) => {
          return {
            ...product,
            totalStock: product.stock.reduce(
              (acc, stock) => acc + stock.quantity,
              0,
            ),
          };
        });

      setProductsList(filteredProducts);
    }
  });

  useEffect(() => {
    filterProducts();
  }, [category]);

  return (
    <div>
      <div className="mb-12 flex items-center justify-between">
        <div>
          <label htmlFor="category" className="mr-4">
            Filter By Category
          </label>
          <select
            name="category"
            id="category"
            className="border"
            value={category}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setCategory(e.target.value)
            }
          >
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category.categoryid} value={category.categoryid}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        <div>
          Products Count :-{" "}
          <span className="text-green-600">
            ({productsList.length}) Products
          </span>
        </div>
      </div>
      <ul className="flex items-center gap-4 *:flex-1 *:border *:text-center">
        <li>product</li>
        <li>price</li>
        <li>stock</li>
        <li>actions</li>
      </ul>

      {productsList.map((product) => (
        <ul
          key={product.productid}
          className="flex items-center gap-4 *:flex-1  *:text-center my-7.5"
        >
          <li className="flex items-center gap-1">
            <DashBoardProductImage image={product.productimages[0]} />
            <span>{product.productname}</span>
          </li>
          <li>$ {product.productprice}</li>
          <li>
            <span className="text-green-600">({product.totalStock})</span> Item
          </li>
          <li className="flex items-center justify-center gap-7.5">
            <Link
              href={`/dashboard/products/edit?productid=${product.productid}`}
              className="text-green-600"
            >
              Edit
            </Link>
            <button className="text-identity">Delete</button>
          </li>
        </ul>
      ))}
    </div>
  );
}
