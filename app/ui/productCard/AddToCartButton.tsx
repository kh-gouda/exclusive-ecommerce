"use client";
import { addToCart } from "@/app/actions/addToCart";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function AddToCartButton({
  showAddToCartButton,
  productId,
  userId,
}: {
  showAddToCartButton?: boolean;
  productId: number;
  userId?: string;
}) {
  const router = useRouter();
  async function handleClick(productId: number, userId?: number) {
    try {
      if (!userId) {
        throw new Error("You Have To Login To Add Product To Your Cart");
      }
      await addToCart(userId, productId);

      router.push(`/account/${userId}/cart`);
    } catch (error) {
      console.log(error);
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
