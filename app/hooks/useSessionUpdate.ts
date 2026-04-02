import { SessionUpdateData } from "@/app/lib/typeDefinitions";
import { useSession } from "next-auth/react";

export function useSessionUpdate() {
  const { update, data: session } = useSession();

  const updateSession = async (data?: SessionUpdateData) => {
    try {
      // The update function from next-auth triggers the jwt callback with trigger="update"
      await update(data);
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  // Function to refresh wishlist data
  const refreshWishlist = async () => {
    await updateSession({ refresh: "wishlist" });
  };

  // Function to refresh cart data
  const refreshCart = async () => {
    await updateSession({ refresh: "cart" });
  };

  // Function to refresh both wishlist and cart
  const refreshAll = async () => {
    await updateSession({ refresh: "all" });
  };

  return {
    updateSession,
    refreshWishlist,
    refreshCart,
    refreshAll,
    session,
  };
}
