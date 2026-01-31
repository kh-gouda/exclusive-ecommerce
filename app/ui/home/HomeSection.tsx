import ProductCard from "@productCard/ProductCard";
import SectionTitle from "@ui/shared/SectionTitle";
import SectionLabel from "@ui/shared/SectionLabel";
import { ProductCardType } from "@/app/lib/typeDefinitions";

type ProductType = ProductCardType;
export default function HomeSection({
  label,
  title,
  products,
  showDiscountLabel,
}: {
  label: string;
  title: string;
  products: ProductType[];
  showDiscountLabel?: boolean;
}) {
  return (
    <section className="py-12.5">
      <SectionLabel>{label}</SectionLabel>
      <SectionTitle>{title}</SectionTitle>
      {products && products.length ? (
        <div className="flex gap-7.5 flex-wrap">
          {products.map((product) => (
            <ProductCard
              key={product.productID}
              product={product}
              showDiscountLabel={showDiscountLabel}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
