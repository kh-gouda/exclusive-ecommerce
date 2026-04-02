"use client";
import { addToCart } from "@/app/actions/addToCart";
import { useSessionUpdate } from "@/app/hooks/useSessionUpdate";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
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
  const t = useTranslations("general");

  const pathname = usePathname();

  const notifySuccess = () => toast.success("product added successfully");
  const notifyError = (error: string) => toast.error(error);

  const { refreshAll } = useSessionUpdate();
  async function handleClick(productId: number, userId?: number) {
    try {
      if (!userId) {
        throw new Error("You Have To Login To Add Product To Your Cart");
      }
      await addToCart(userId, productId);

      await refreshAll();

      notifySuccess();
      if (pathname.includes("/account/[id]/wishlist")) {
        location.reload();
      }
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
      {t("addToCart")}
    </button>
  );
}
