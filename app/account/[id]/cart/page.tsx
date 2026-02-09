import { CART_DATA } from "@/app/lib/dummyData";
import Cart from "@ui/cart/Cart";
import Container from "@ui/shared/Container";
import SharedButton from "@ui/shared/SharedButton";
import Link from "next/link";

export default function CartPage() {
  const cartProducts = CART_DATA;
  return (
    <main className="pt-20 pb-35">
      <Container>
        <section className="mt-20">
          <div className="flex items-center justify-between *:flex-1 shadow py-6 px-9.5">
            <div>Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Subtotal</div>
          </div>
          <Cart products={cartProducts} />
          <div className="flex justify-between items-center mt-6">
            <SharedButton transparent task="return to shop">
              Return To Shop
            </SharedButton>
            <SharedButton transparent task="update Cart">
              Update Cart
            </SharedButton>
          </div>
          <div className="mt-20 flex items-start *:flex-1">
            <form action="" className="flex gap-4">
              <input
                type="text"
                name="coupon"
                id="coupon"
                placeholder="Coupon Code"
                className="w-75 h-14 border rounded-sm py-4 px-6"
              />
              <SharedButton task="apply Coupon">Apply Coupon</SharedButton>
            </form>
            <div className="border rounded-sm py-8 px-6">
              <h3 className="font-medium text-xl ">Cart Total</h3>
              <div className="flex items-center justify-between py-4 border-b">
                <p>Subtotal:</p>
                <p>$1750</p>
              </div>
              <div className="flex items-center justify-between py-4 border-b">
                <p>Shipping:</p>
                <p>Free</p>
              </div>
              <div className="flex items-center justify-between py-4 border-b">
                <p>Total:</p>
                <p>$1750</p>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <Link href="/checkout">
                  <SharedButton task="Procees to checkout">
                    Procees to checkout
                  </SharedButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
