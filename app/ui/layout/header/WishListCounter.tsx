"use client";

import { useSession } from "next-auth/react";
import { useEffect, useEffectEvent, useState } from "react";

export default function WishListCounter() {
  const { data: session } = useSession();
  const [wishlistCount, setWishlistCount] = useState(
    () => session?.user.wishlist.length,
  );

  const changeCount = useEffectEvent(() =>
    setWishlistCount(() => session?.user.wishlist.length),
  );
  useEffect(() => {
    changeCount();
  }, [session?.user.wishlist]);
  return (
    <>
      {wishlistCount ? (
        <span className="absolute -top-4 -end-1.5 bg-identity min-w-4 min-h-4 rounded-full text-white text-sm flex items-center justify-center">
          {wishlistCount}
        </span>
      ) : null}
    </>
  );
}
