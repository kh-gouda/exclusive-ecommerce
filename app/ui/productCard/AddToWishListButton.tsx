"use client";
import { addToWishList } from "@/app/actions/addToWishList";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function AddToWishListButton({
  productId,
  userId,
}: {
  productId: number;
  userId?: string;
}) {
  const router = useRouter();
  async function handleClick(productId: number, userId?: number) {
    try {
      if (!userId) {
        throw new Error("You Have To Login To Add Product To Your Wish List");
      }
      await addToWishList(userId, productId);

      router.push(`/account/${userId}/wishlist`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button
      className="w-8 5 h-8 5 rounded-full bg-white-color flex items-center justify-center cursor-pointer"
      onClick={() => handleClick(productId, Number(userId))}
    >
      <HeartIcon className="w-5 h-5" />
    </button>
  );
}
