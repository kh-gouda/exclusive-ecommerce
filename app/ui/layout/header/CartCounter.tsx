"use client";

import { useSession } from "next-auth/react";
import { useEffect, useEffectEvent, useState } from "react";

export default function CartCounter() {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(() => session?.user.cart.length);

  const changeCount = useEffectEvent(() =>
    setCartCount(() => session?.user.cart.length),
  );
  useEffect(() => {
    changeCount();
  }, [session?.user.cart]);
  return (
    <>
      {cartCount ? (
        <span className="absolute -top-4 -end-1.5 bg-identity min-w-4 min-h-4 rounded-full text-white text-sm flex items-center justify-center">
          {cartCount}
        </span>
      ) : null}
    </>
  );
}
