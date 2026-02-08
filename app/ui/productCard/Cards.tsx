import { ProductCardType } from "@/app/lib/typeDefinitions";
import ProductCard from "@ui/productCard/ProductCard";

export default function Cards({
  products,
  showDiscountLabel,
  showNewLabel,
  showAddToCartButton,
}: {
  products: ProductCardType[];
  showDiscountLabel?: boolean;
  showNewLabel?: boolean;
  showAddToCartButton?: boolean;
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
              showAddToCartButton={showAddToCartButton}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
