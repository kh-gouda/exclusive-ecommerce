"use client";
import { ORDER_DETAILS_TYPE } from "@/app/lib/typeDefinitions";
import { CheckIcon } from "@heroicons/react/24/outline";
import CheckoutImage from "@ui/checkout/CheckoutImage";
import Image from "next/image";
import { ChangeEvent, SubmitEvent, useState } from "react";

export default function CheckoutForm({
  orderDetails,
}: {
  orderDetails: ORDER_DETAILS_TYPE;
}) {
  const [orderState, setOrderState] = useState(orderDetails);

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

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(orderState);
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
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
          value={orderState.userData.firstname}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeUserDataInput(e, "firstname")
          }
        />

        <label htmlFor="comp-name" className="billing-data-label">
          Company Name
        </label>
        <input
          type="text"
          name="comp-name"
          id="comp-name"
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeUserDataInput(e, "company")
          }
        />

        <label htmlFor="st-address" className="billing-data-label">
          Street Address<span className="text-identity">*</span>
        </label>
        <input
          type="text"
          name="st-address"
          id="st-address"
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
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
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
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
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
          value={orderState.userData.address?.city}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeUserAddressInput(e, "city")
          }
        />

        <label htmlFor="phone" className="billing-data-label">
          Phone Number<span className="text-identity">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
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
          className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
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
            <input
              type="text"
              name="coupon"
              id="coupon"
              placeholder="Coupon Code"
              className="h-14 border rounded-sm py-4 px-6"
            />
            {/* <button className="shared-btn shared-btn-solid">
              Apply Coupon
            </button> */}
          </div>
          <button className="shared-btn shared-btn-solid">Place Order</button>
        </div>
      </div>
    </form>
  );
}
