"use client";
import { addToCart } from "@/app/actions/addToCart";
import clsx from "clsx";
import { toast } from "react-toastify";

export default function AddToCartButton({
  showAddToCartButton,
  productId,
  userId,
}: {
  showAddToCartButton?: boolean;
  productId: number;
  userId?: string;
}) {
  const notifySuccess = () => toast.success("product added successfully");
  const notifyError = (error: string) => toast.error(error);
  async function handleClick(productId: number, userId?: number) {
    try {
      if (!userId) {
        throw new Error("You Have To Login To Add Product To Your Cart");
      }
      await addToCart(userId, productId);

      notifySuccess();
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
  }
  return (
    <button
      className={clsx("add-to-cart", {
        "w-full": showAddToCartButton,
        "add-to-cart-animation": !showAddToCartButton,
      })}
      onClick={() => handleClick(productId, Number(userId))}
    >
      Add To Cart
    </button>
  );
}
