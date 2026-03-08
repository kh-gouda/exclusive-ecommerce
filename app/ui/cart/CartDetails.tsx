"use client";
import { updateCart } from "@/app/actions/updateCart";
import { CART_TYPE } from "@/app/lib/typeDefinitions";
import Cart from "@ui/cart/Cart";
import SharedButton from "@ui/shared/SharedButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartDetails({
  userid,
  products,
}: {
  userid: number;
  products: CART_TYPE[];
}) {
  const router = useRouter();
  const [cartProducts, setCartProducts] = useState(products);
  const totalInvoice = cartProducts.reduce((acc, product) => {
    return acc + product.subtotal;
  }, 0);

  const shippingCost = 0;

  const handleChangeState = (productId: number, newQuantity: number) => {
    const prev = [...cartProducts].map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: newQuantity,
          subtotal: product.price * newQuantity,
        };
      }
      return product;
    });
    setCartProducts(prev);
  };

  async function handleUpdateCart() {
    await updateCart(userid, cartProducts);
    router.push(`/account/${userid}/cart`);
  }
  return (
    <>
      <Cart
        products={cartProducts}
        changeState={handleChangeState}
        userId={userid}
      />
      <div className="flex justify-between items-center mt-6">
        <Link href="/shop" className="shared-btn shared-btn-transparent">
          Return To Shop
        </Link>
        <button
          className="shared-btn shared-btn-transparent"
          onClick={handleUpdateCart}
        >
          Update Cart
        </button>
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
            <p>${totalInvoice}</p>
          </div>
          <div className="flex items-center justify-between py-4 border-b">
            <p>Shipping:</p>
            <p>{!shippingCost ? "Free" : `$  ${shippingCost}`}</p>
          </div>
          <div className="flex items-center justify-between py-4 border-b">
            <p>Total:</p>
            <p>${!shippingCost ? totalInvoice : totalInvoice + shippingCost}</p>
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
    </>
  );
}
