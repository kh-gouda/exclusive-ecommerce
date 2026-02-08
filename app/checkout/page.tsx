import { CART_DATA } from "@/app/lib/dummyData";
import { CheckIcon } from "@heroicons/react/24/outline";
import Container from "@ui/shared/Container";
import SectionTitle from "@ui/shared/SectionTitle";
import SharedButton from "@ui/shared/SharedButton";
import Image from "next/image";

export default function Checkout() {
  const cartProducts = CART_DATA;
  return (
    <main className="pt-20 pb-35">
      <Container>
        <SectionTitle weight="medium">Billing Details</SectionTitle>
        <form action="" className="flex *:flex-1 gap-20">
          <div>
            <label htmlFor="fname" className="billing-data-label">
              First Name<span className="text-identity">*</span>
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
              required
            />

            <label htmlFor="comp-name" className="billing-data-label">
              Company Name
            </label>
            <input
              type="text"
              name="comp-name"
              id="comp-name"
              className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
            />

            <label htmlFor="st-address" className="billing-data-label">
              Street Address<span className="text-identity">*</span>
            </label>
            <input
              type="text"
              name="st-address"
              id="st-address"
              className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
              required
            />

            <label htmlFor="apartment" className="billing-data-label">
              Apartment, floor, etc. (optional)
            </label>
            <input
              type="text"
              name="apartment"
              id="apartment"
              className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
            />

            <label htmlFor="town-city" className="billing-data-label">
              Town/City<span className="text-identity">*</span>
            </label>
            <input
              type="text"
              name="town-city"
              id="town-city"
              className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
              required
            />

            <label htmlFor="phone" className="billing-data-label">
              Phone Number<span className="text-identity">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
              required
            />

            <label htmlFor="email" className="billing-data-label">
              Email Address<span className="text-identity">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-bg rounded-sm h-12.5 w-full mt-2 mb-8"
              required
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
            {cartProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between mb-8"
              >
                <div className="flex items-center gap-1">
                  <div className="w-12.5 h-12.5">
                    <Image
                      width={190}
                      height={190}
                      src={product.image}
                      alt={product.title}
                      className="max-w-full"
                    />
                  </div>
                  {product.title}
                </div>
                <div className="text-center">${product.subtotal}</div>
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
                  <input type="radio" name="payment-method" id="bank" />
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
                  defaultChecked
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
                <SharedButton task="apply Coupon">Apply Coupon</SharedButton>
              </div>
              <SharedButton task="place order">Place Order</SharedButton>
            </div>
          </div>
        </form>
      </Container>
    </main>
  );
}
