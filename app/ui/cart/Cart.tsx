"use client";
import { useSessionUpdate } from "@/app/hooks/useSessionUpdate";
import { CART_TYPE } from "@/app/lib/typeDefinitions";
import ShoppingCartImage from "@ui/cart/ShoppingCartImage";
import { useTranslations } from "next-intl";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

export default function Cart({
  products,
  changeState,
  deleteItem,
}: {
  products: CART_TYPE[];
  changeState: (id: number, quantity: number) => void;
  deleteItem: (productid: number) => void;
}) {
  const t = useTranslations("products");
  const { refreshAll } = useSessionUpdate();
  const [isLoading, setIsLoading] = useState(false);

  const notifyError = (error: string) => toast.error(error);
  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className="relative flex items-center justify-between mt-10 *:flex-1 shadow py-6 px-9.5 max-[850px]:px-2"
        >
          <div className="flex items-center gap-1 max-[850px]:flex-col max-[850px]:items-start">
            <div className="w-12.5 h-12.5">
              <ShoppingCartImage productImage={product.image} />
            </div>
            {product.id < 44 ? t(`p${product.id}name`) : product.title}
          </div>
          <div className="text-center">${product.price}</div>
          <input
            type="number"
            defaultValue={product.quantity}
            className="text-center border w-12.5"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              changeState(product.id, Number(e.currentTarget.value))
            }
          />
          <div className="text-end">${product.subtotal}</div>
          <button
            className="absolute w-5 h-5 rounded-full flex items-center justify-center top-50% max-[850px]:top-0 start-4 -translate-1/2 bg-identity cursor-pointer text-white"
            disabled={isLoading}
            onClick={async () => {
              try {
                setIsLoading(true);
                deleteItem(product.id);
                await refreshAll();
              } catch (error: unknown) {
                if (error instanceof Error) {
                  notifyError(error.message);
                }
              } finally {
                setIsLoading(false);
              }
            }}
          >
            X
          </button>
        </div>
      ))}
    </>
  );
}
