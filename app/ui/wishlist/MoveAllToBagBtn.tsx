"use client";

import { addToCart } from "@/app/actions/addToCart";
import { useSessionUpdate } from "@/app/hooks/useSessionUpdate";
import { useTranslations } from "next-intl";
import { usePathname } from "next/dist/client/components/navigation";

export default function MoveAllToBagBtn({
  userId,
  productsIds,
}: {
  userId: number;
  productsIds: number[];
}) {
  const t = useTranslations();
  const pathname = usePathname();

  const { refreshAll } = useSessionUpdate();

  const handleMoveAllToBag = async () => {
    await Promise.all(
      productsIds.map((productId) => addToCart(userId, productId)),
    );

    await refreshAll();

    if (pathname.includes("/account/[id]/wishlist")) {
      location.reload();
    }
  };
  return (
    <button
      className="shared-btn shared-btn-transparent"
      onClick={handleMoveAllToBag}
    >
      {t("general.moveToBag")}
    </button>
  );
}
