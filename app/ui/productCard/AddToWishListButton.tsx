"use client";
import { addToWishList } from "@/app/actions/addToWishList";
import { useSessionUpdate } from "@/app/hooks/useSessionUpdate";
import { HeartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddToWishListButton({
  productId,
  userId,
}: {
  productId: number;
  userId?: string;
}) {
  const notifySuccess = () => toast.success("product added successfully");
  const notifyError = (error: string) => toast.error(error);

  const { data: session } = useSession();

  const [isInWishList, setIsInWishList] = useState(() =>
    session?.user.wishlist.includes(productId.toString()),
  );

  useEffect(() => {
    setIsInWishList(() =>
      session?.user.wishlist.includes(productId.toString()),
    );
  }, [productId, session]);
  const { refreshAll } = useSessionUpdate();
  async function handleClick(productId: number, userId?: number) {
    try {
      if (!userId) {
        throw new Error("You Have To Login To Add Product To Your Wish List");
      }
      await addToWishList(userId, productId);

      setIsInWishList(!isInWishList);

      await refreshAll();

      notifySuccess();

      if (location.href.endsWith("/wishlist")) {
        location.reload();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        notifyError(error.message);
      }
    }
  }
  return (
    <button
      className="w-8 5 h-8 5 rounded-full bg-white-color flex items-center justify-center cursor-pointer"
      onClick={() => handleClick(productId, Number(userId))}
    >
      <HeartIcon
        className={clsx("w-5 h-5", {
          "fill-identity text-identity": isInWishList,
          "fill-white-color": !isInWishList,
        })}
      />
    </button>
  );
}
