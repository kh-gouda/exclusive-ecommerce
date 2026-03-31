"use client";
import {
  addOrder,
  addOrderItems,
  clearShoppingCart,
} from "@/app/actions/addOrder";
import { deleteCartItem } from "@/app/actions/deleteCartItem";
import { fetchCoupon } from "@/app/actions/fetchCoupon";
import { updateCart } from "@/app/actions/updateCart";
import { CART_TYPE } from "@/app/lib/typeDefinitions";
import Cart from "@ui/cart/Cart";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  SubmitEvent,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { toast } from "react-toastify";

export default function CartDetails({
  userid,
  products,
}: {
  userid: number;
  products: CART_TYPE[];
}) {
  const t = useTranslations();
  const router = useRouter();
  const [cartProducts, setCartProducts] = useState(products);
  const [totalInvoice, setTotalInvoice] = useState(() =>
    cartProducts.reduce((acc, product) => {
      return acc + product.subtotal;
    }, 0),
  );

  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const notifyDeleteItem = () => toast.success("Item Deleted Successfully");

  const applyCoupon = useEffectEvent(() => {
    const AppliedCoupon = totalInvoice - totalInvoice * (couponDiscount / 100);
    setTotalInvoice(AppliedCoupon);
  });

  const changeQuantity = useEffectEvent(() => {
    const newTotalInvoice = cartProducts.reduce((acc, product) => {
      return acc + product.subtotal;
    }, 0);
    setTotalInvoice(newTotalInvoice);
    setCoupon("");
    setCouponDiscount(0);
    setIsCouponApplied(false);
  });

  useEffect(() => applyCoupon(), [couponDiscount]);
  useEffect(() => changeQuantity(), [cartProducts]);

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

  const deleteProductFromState = (productId: number) => {
    const prev = [...cartProducts].filter(
      (product) => product.id !== productId,
    );
    setCartProducts(prev);
  };

  async function handleUpdateCart() {
    await updateCart(userid, cartProducts);
    router.push(`/account/${userid}/cart`);
  }

  async function handleDeleteItem(productId: number) {
    await deleteCartItem(userid, productId);
    deleteProductFromState(productId);
    notifyDeleteItem();
  }

  async function handleApplyCoupon(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const fetchedCoupon = await fetchCoupon(coupon);
    const fetchedCouponDiscount = fetchedCoupon[0]?.coupondiscount || 0;
    if (fetchedCouponDiscount) {
      setCouponDiscount(fetchedCouponDiscount);
      setIsCouponApplied(true);
    }
  }

  async function handleProcessToCheckOut() {
    const totalAmount = totalInvoice + shippingCost;
    const insertedOrder = await addOrder(
      userid,
      coupon,
      couponDiscount,
      totalAmount,
    );

    await addOrderItems(insertedOrder[0].orderid, cartProducts);
    await clearShoppingCart(userid);
    router.push(
      `/account/${userid}/checkout?orderid=${insertedOrder[0].orderid}`,
    );
  }

  return (
    <>
      {cartProducts && cartProducts.length ? (
        <Cart
          products={cartProducts}
          changeState={handleChangeState}
          deleteItem={handleDeleteItem}
        />
      ) : (
        <div className="text-identity my-4 text-center">
          {t("conditionalRender.noCart")}
        </div>
      )}
      <div className="flex flex-wrap gap-7.5 justify-between items-center mt-6">
        <Link href="/shop" className="shared-btn shared-btn-transparent">
          {t("general.returnToShop")}
        </Link>
        {cartProducts && cartProducts.length ? (
          <button
            className="shared-btn shared-btn-transparent"
            onClick={handleUpdateCart}
          >
            {t("general.updateCart")}
          </button>
        ) : null}
      </div>
      <div className="mt-20 flex flex-wrap gap-7.5 items-start *:flex-1">
        {isCouponApplied ? null : cartProducts && cartProducts.length ? ( // </div> //   </p> //     <span className="text-green-500"> %{couponDiscount}</span> //     Applied Coupon Discount :{" "} //   <p className="my-4"> //   </p> //     Applied Coupon : <span className="text-green-500"> {coupon}</span> //   <p className="my-4"> // <div>
          <form
            action=""
            className="flex gap-4 flex-wrap max-w-full"
            onSubmit={(e: SubmitEvent<HTMLFormElement>) => handleApplyCoupon(e)}
          >
            <input
              type="text"
              name="coupon"
              id="coupon"
              placeholder={t("placeHolders.couponCode")}
              className="w-75 max-w-full h-14 border rounded-sm py-4 px-6"
              value={coupon}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCoupon(e.target.value)
              }
            />
            <button className="shared-btn shared-btn-solid">
              {t("general.applyCoupon")}
            </button>
          </form>
        ) : null}
        <div className="border rounded-sm py-8 px-6">
          <h3 className="font-medium text-xl ">
            {t("listHeading.cartTotal")}:
          </h3>
          <div className="flex items-center justify-between py-4 border-b">
            <p>{t("listHeading.subTotal")}:</p>
            <p>${totalInvoice}</p>
          </div>
          <div className="flex items-center justify-between py-4 border-b">
            <p>{t("listHeading.shipping")}:</p>
            <p>{!shippingCost ? t("general.free") : `$  ${shippingCost}`}</p>
          </div>
          <div className="flex items-center justify-between py-4 border-b">
            <p>{t("listHeading.total")}:</p>
            <p>${!shippingCost ? totalInvoice : totalInvoice + shippingCost}</p>
          </div>
          <div className="mt-4 flex items-center justify-center">
            {cartProducts && cartProducts.length ? (
              <button
                className="shared-btn shared-btn-solid"
                onClick={handleProcessToCheckOut}
              >
                {t("general.proceedToCheckout")}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
