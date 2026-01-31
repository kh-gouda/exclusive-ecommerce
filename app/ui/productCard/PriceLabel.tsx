export default function PriceLbel({
  price,
  discount,
}: {
  price: number;
  discount: number;
}) {
  const PRICE_AFTER_DISCOUNT = price - price * (discount / 100);
  return (
    <p className="my-2">
      <span className="font-medium text-identity text-base">
        ${PRICE_AFTER_DISCOUNT}
      </span>
      {discount ? (
        <span className="line-through font-medium text-base ml-4 opacity-40">
          ${price}
        </span>
      ) : null}
    </p>
  );
}
