"use client";

import { deleteProductById } from "@/app/actions/deleteProduct";
import { deleteMultipleImages } from "@/app/lib/cloudinaryDelete";
import { FETCHED_PRODUCT_BY_ID_TYPE } from "@/app/lib/typeDefinitions";
import DashBoardProductImage from "@ui/dashboard/DashBoardProductImage";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useEffectEvent, useState } from "react";
import { toast } from "react-toastify";

export default function ProductsDashBoard({
  categories,
  products,
}: {
  categories: { categoryid: number; category: string }[];
  products: FETCHED_PRODUCT_BY_ID_TYPE[];
}) {
  const router = useRouter();
  const notifyDeleted = () => toast.success("Product Deleted Successfully");
  const notifyError = (error: string) => toast.error(error);

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

  const handleEditButton = (productId: number, editable: boolean) => {
    try {
      if (!editable) {
        throw new Error(
          "Sorry To Edit Or Delete Product (Please Add New Product First)",
        );
      }
      router.push(`/dashboard/products/edit?productid=${productId}`);
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
      router.push("/dashboard/products");
    }
  };

  const handleDeleteButton = async (
    productId: number,
    editable: boolean,
    productImages: string[],
  ) => {
    try {
      if (!editable) {
        throw new Error(
          "Sorry To Edit Or Delete Product (Please Add New Product First)",
        );
      }

      await deleteMultipleImages(productImages);

      await deleteProductById(productId);

      notifyDeleted();
      location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
      router.push("/dashboard/products");
    }
  };

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-4 items-center justify-between">
        <div>
          <label htmlFor="category" className="me-4">
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
        <li className="max-[600px]:hidden">price</li>
        <li className="max-[450px]:hidden">stock</li>
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
          <li className="max-[600px]:hidden">$ {product.productprice}</li>
          <li className="max-[450px]:hidden">
            <span className="text-green-600">({product.totalStock})</span> Item
          </li>
          <li className="flex items-center justify-center gap-7.5">
            <button
              className="text-green-600 cursor-pointer"
              onClick={() =>
                handleEditButton(product.productid, product.editable)
              }
            >
              Edit
            </button>
            <button
              className="text-identity cursor-pointer"
              onClick={() =>
                handleDeleteButton(
                  product.productid,
                  product.editable,
                  product.productimages,
                )
              }
            >
              Delete
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
}
