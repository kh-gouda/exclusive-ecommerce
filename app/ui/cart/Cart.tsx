"use client";
import { deleteCartItem } from "@/app/actions/deleteCartItem";
import { CART_TYPE } from "@/app/lib/typeDefinitions";
import ShoppingCartImage from "@ui/cart/ShoppingCartImage";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export default function Cart({
  products,
  changeState,
  userId,
}: {
  products: CART_TYPE[];
  changeState: (id: number, quantity: number) => void;
  userId: number;
}) {
  const router = useRouter();

  async function handleDeleteItem(userid: number, productId: number) {
    await deleteCartItem(userid, productId);
    // router.push(`/account/${userid}/cart`);
    router.refresh();
  }

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
            onClick={() => handleDeleteItem(userId, product.id)}
          >
            X
          </button>
        </div>
      ))}
    </>
  );
}
