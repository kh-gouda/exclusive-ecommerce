"use client";
import {
  applyCouponOnOrder,
  confirmOrder,
  setPaymentMethod,
  setTotalAmount,
} from "@/app/actions/addOrder";
import { createStripeCheckoutSession } from "@/app/actions/createStripeCheckoutSession";
import {
  fetchUserByEmail,
  fetchUserByPhone,
  updateUserForDelivery,
} from "@/app/actions/fetchAndUpdateUser";
import { fetchCoupon } from "@/app/actions/fetchCoupon";
import { revalidate } from "@/app/actions/revalidatePath";
import { ORDER_DETAILS_TYPE } from "@/app/lib/typeDefinitions";
import { CheckIcon } from "@heroicons/react/24/outline";
import CheckoutImage from "@ui/checkout/CheckoutImage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, SubmitEvent, useState } from "react";
import { toast } from "react-toastify";

export default function CheckoutForm({
  orderDetails,
}: {
  orderDetails: ORDER_DETAILS_TYPE;
}) {
  const { update } = useSession();
  const [orderState, setOrderState] = useState(orderDetails);

  const shipping = 0;
  const itemsCostNoCoupon = orderState.orderitems.reduce((acc, item) => {
    return acc + item.unit_price * item.quantity;
  }, 0);

  const itemsCostWithCoupon =
    itemsCostNoCoupon -
    itemsCostNoCoupon * (orderState.appliedcoupondiscount / 100);
  const totalInvoice = itemsCostWithCoupon + shipping;

  const notifySuccess = () =>
    toast.success("Your Order Is Placed And Will Be Processed Soon");
  const notifyError = (error: string) => toast.error(error);

  const handleChangeUserDataInput = (
    e: ChangeEvent<HTMLInputElement>,
    property: string,
  ) => {
    setOrderState((prev) => ({
      ...prev,
      userData: { ...prev.userData, [property]: e.target.value },
    }));
  };

  const handleChangeUserAddressInput = (
    e: ChangeEvent<HTMLInputElement>,
    property: string,
  ) => {
    setOrderState((prev) => ({
      ...prev,
      userData: {
        ...prev.userData,
        address: { ...prev.userData.address, [property]: e.target.value },
      },
    }));
  };

  const handleChangePaymentMethod = (value: string) => {
    setOrderState((prev) => ({
      ...prev,
      paymentmethod: value,
    }));
  };

  const handleChangeCoupon = (coupon: string) => {
    setOrderState((prev) => ({
      ...prev,
      appliedcoupon: coupon,
    }));
  };

  const handleApplyCoupon = async (coupon: string) => {
    try {
      const fetchedCoupon = await fetchCoupon(coupon);
      const fetchedCouponDiscount = fetchedCoupon[0]?.coupondiscount || 0;
      if (fetchedCouponDiscount) {
        setOrderState((prev) => ({
          ...prev,
          appliedcoupondiscount: fetchedCouponDiscount,
        }));
        await applyCouponOnOrder(
          Number(orderState.orderid),
          orderState.appliedcoupon,
          fetchedCouponDiscount,
        );
      } else {
        setOrderState((prev) => ({
          ...prev,
          appliedcoupon: "",
        }));
        throw new Error("Your Coupon Is Not Found");
      }
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        !orderState.userData.firstname ||
        !orderState.userData.phone ||
        !orderState.userData.email ||
        !orderState.userData.address?.street ||
        !orderState.userData.address?.city ||
        !orderState.userData.address?.country
      ) {
        throw new Error("All required Inputs Cant Be Empty");
      }

      const fetchedUserByEmail = await fetchUserByEmail(
        orderState.userData.email,
      );
      const existingEmail = fetchedUserByEmail.filter(
        (fetchedUser) => fetchedUser.userid !== Number(orderState.userid),
      );
      if (existingEmail && existingEmail.length) {
        throw new Error("Email already exist with different user");
      }

      const fetchedUserByPhone = await fetchUserByPhone(
        orderState.userData.phone,
      );
      const existingPhone = fetchedUserByPhone.filter(
        (fetchedUser) => fetchedUser.userid !== Number(orderState.userid),
      );
      if (existingPhone && existingPhone.length) {
        throw new Error("Phone already exist with different user");
      }

      const userToUpdate = {
        userId: Number(orderState.userid),
        userEmail: orderState.userData.email,
        userPhone: orderState.userData.phone,
        userAddress: {
          city: orderState.userData.address.city,
          street: orderState.userData.address.street,
          country: orderState.userData.address.country,
          building: orderState.userData.address.building,
        },
      };
      await updateUserForDelivery(userToUpdate);

      await setTotalAmount(Number(orderState.orderid), totalInvoice);

      if (orderState.paymentmethod === "cash on delivery") {
        await confirmOrder(Number(orderState.orderid), true);
      } else {
        await setPaymentMethod(Number(orderState.orderid), "bank");
        const stripeSession = await createStripeCheckoutSession(
          Number(orderState.orderid),
          orderState.userid.toString(),
        );

        if (stripeSession && stripeSession.url) {
          window.location.href = stripeSession.url;
        }
      }

      await revalidate(
        `/account/${orderState.userid}/checkout?orderid=${orderState.orderid}`,
      );

      await update();

      notifySuccess();
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
  };

  return (
    <form
      action=""
      className="flex *:flex-1 gap-20"
      onSubmit={(e: SubmitEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <div>
        <label htmlFor="fname" className="billing-data-label">
          First Name<span className="text-identity">*</span>
        </label>
        <input
          type="text"
          name="fname"
          id="fname"
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8 p-2"
          value={orderState.userData.firstname}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeUserDataInput(e, "firstname")
          }
        />

        <label htmlFor="st-address" className="billing-data-label">
          Street Address<span className="text-identity">*</span>
        </label>
        <input
          type="text"
          name="st-address"
          id="st-address"
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8 p-2"
          value={orderState.userData.address?.street}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeUserAddressInput(e, "street")
          }
        />

        <label htmlFor="apartment" className="billing-data-label">
          Apartment, floor, etc. (optional)
        </label>
        <input
          type="text"
          name="apartment"
          id="apartment"
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8 p-2"
          value={orderState.userData.address?.building}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeUserAddressInput(e, "building")
          }
        />

        <label htmlFor="town-city" className="billing-data-label">
          Town/City<span className="text-identity">*</span>
        </label>
        <input
          type="text"
          name="town-city"
          id="town-city"
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8 p-2"
          value={orderState.userData.address?.city}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeUserAddressInput(e, "city")
          }
        />

        <label htmlFor="country" className="billing-data-label">
          Country<span className="text-identity">*</span>
        </label>
        <input
          type="text"
          name="country"
          id="country"
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8 p-2"
          value={orderState.userData.address?.country}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeUserAddressInput(e, "country")
          }
        />

        <label htmlFor="phone" className="billing-data-label">
          Phone Number<span className="text-identity">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8 p-2"
          value={orderState.userData.phone}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeUserDataInput(e, "phone")
          }
        />

        <label htmlFor="email" className="billing-data-label">
          Email Address<span className="text-identity">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8 p-2"
          value={orderState.userData.email}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeUserDataInput(e, "email")
          }
        />

        <input
          type="checkbox"
          name="save-data"
          id="save-data"
          defaultChecked
          hidden
        />
        <label htmlFor="save-data" className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-sm bg-identity border inline-block mr-2">
            <CheckIcon className="text-white-text w-5 h-5" />
          </span>
          Save this information for faster check-out next time
        </label>
      </div>
      <div>
        {orderState.orderitems.map((product) => (
          <div
            key={product.productid}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-1">
              <div className="w-12.5 h-12.5">
                <CheckoutImage productImage={product.productimages[0]} />
              </div>
              {product.productname}{" "}
              <span className="text-identity"> X {product.quantity}</span>
            </div>
            <div className="text-center">
              ${product.unit_price * product.quantity}
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between py-4 border-b">
          <p>Subtotal:</p>
          <p>${itemsCostWithCoupon}</p>
        </div>
        <div className="flex items-center justify-between py-4 border-b">
          <p>Shipping:</p>
          <p>{shipping ? shipping : "Free"}</p>
        </div>
        <div className="flex items-center justify-between py-4 border-b">
          <p>Total:</p>
          <p>${totalInvoice}</p>
        </div>
        <div>
          <div className="flex items-center justify-between my-8">
            <div>
              <input
                type="radio"
                name="payment-method"
                id="bank"
                checked={orderState.paymentmethod === "bank"}
                onChange={() => handleChangePaymentMethod("bank")}
              />
              <label className="ml-2" htmlFor="bank">
                Bank
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Image
                width={42}
                height={28}
                src="/images/bKash.webp"
                alt="bkash"
              />
              <Image
                width={42}
                height={28}
                src="/images/visa.webp"
                alt="visa"
              />
              <Image
                width={42}
                height={28}
                src="/images/master_card.webp"
                alt="master card"
              />
              <Image
                width={42}
                height={28}
                src="/images/nagad_bengali.webp"
                alt="master card"
              />
            </div>
          </div>
          <div>
            <input
              type="radio"
              name="payment-method"
              id="cash"
              checked={orderState.paymentmethod === "cash on delivery"}
              onChange={() => handleChangePaymentMethod("cash on delivery")}
            />
            <label className="ml-2" htmlFor="cash">
              Cash on delivery
            </label>
          </div>
          <div className="flex items-center justify-between py-8">
            {orderState.appliedcoupondiscount ? (
              <div>
                <p className="my-4">
                  Applied Coupon :{" "}
                  <span className="text-green-500">
                    {" "}
                    {orderState.appliedcoupon}
                  </span>
                </p>
                <p className="my-4">
                  Applied Coupon Discount :{" "}
                  <span className="text-green-500">
                    {" "}
                    %{orderState.appliedcoupondiscount}
                  </span>
                </p>
              </div>
            ) : !orderState.orderconfirmed ? (
              <>
                <input
                  type="text"
                  name="coupon"
                  id="coupon"
                  placeholder="Coupon Code"
                  className="h-14 border rounded-sm py-4 px-6"
                  value={orderState.appliedcoupon}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChangeCoupon(e.target.value)
                  }
                />
                <button
                  className="shared-btn shared-btn-solid"
                  type="button"
                  onClick={() => handleApplyCoupon(orderState.appliedcoupon)}
                >
                  Apply Coupon
                </button>
              </>
            ) : null}
          </div>
          {!orderState.orderconfirmed ? (
            <button className="shared-btn shared-btn-solid" type="submit">
              Place Order
            </button>
          ) : (
            <div className="text-green-500">
              Your Order Is Already Placed And Confirmed And Moved To The Next
              Process
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
