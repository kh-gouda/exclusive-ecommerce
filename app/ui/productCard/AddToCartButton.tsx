import clsx from "clsx";

export default function AddToCartButton({
  showAddToCartButton,
}: {
  showAddToCartButton?: boolean;
}) {
  return (
    <button
      className={clsx("add-to-cart", {
        "w-full": showAddToCartButton,
        "add-to-cart-animation": !showAddToCartButton,
      })}
    >
      Add To Cart
    </button>
  );
}
