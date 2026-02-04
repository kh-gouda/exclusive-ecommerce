import { ProductCardType } from "@/app/lib/typeDefinitions";
import ProductCard from "@ui/productCard/ProductCard";

export default function Cards({
  products,
  showDiscountLabel,
  showNewLabel,
}: {
  products: ProductCardType[];
  showDiscountLabel?: boolean;
  showNewLabel?: boolean;
}) {
  return (
    <>
      {products && products.length ? (
        <div className="flex gap-7.5 flex-wrap mt-10 mb-12">
          {products.map((product) => (
            <ProductCard
              key={product.productID}
              product={product}
              showDiscountLabel={showDiscountLabel}
              showNewLabel={showNewLabel}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
