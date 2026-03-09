"use client";
import { CART_TYPE } from "@/app/lib/typeDefinitions";
import ShoppingCartImage from "@ui/cart/ShoppingCartImage";
import { ChangeEvent } from "react";

export default function Cart({
  products,
  changeState,
  deleteItem,
}: {
  products: CART_TYPE[];
  changeState: (id: number, quantity: number) => void;
  deleteItem: (productid: number) => void;
}) {
  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className="relative flex items-center justify-between mt-10 *:flex-1 shadow py-6 px-9.5"
        >
          <div className="flex items-center gap-1">
            <div className="w-12.5 h-12.5">
              <ShoppingCartImage productImage={product.image} />
            </div>
            {product.title}
          </div>
          <div className="text-center">${product.price}</div>
          <input
            type="number"
            defaultValue={product.quantity}
            className="text-center border"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              changeState(product.id, Number(e.currentTarget.value))
            }
          />
          <div className="text-right">${product.subtotal}</div>
          <button
            className="absolute w-5 h-5 rounded-full flex items-center justify-center top-50% left-4 -translate-1/2 bg-identity cursor-pointer text-white"
            onClick={() => deleteItem(product.id)}
          >
            X
          </button>
        </div>
      ))}
    </>
  );
}
