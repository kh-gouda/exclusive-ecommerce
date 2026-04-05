import { fetchAllProducts } from "@/app/lib/utils";
import Cards from "@ui/productCard/Cards";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import SectionTitle from "@ui/shared/SectionTitle";
import { CardsSkeleton } from "@ui/skeletons/productCard/skeletons";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function ShopProducts() {
  const t = await getTranslations("sectionLabel");
  const t2 = await getTranslations("sectionTitle");
  const t3 = await getTranslations("missedTranslations");

  const allProducts = await fetchAllProducts();
  const products = allProducts.map((product) => ({
    productID: product.productid,
    productTitle: product.productname,
    productImage: product.productimages[0],
    price: +product.productprice,
    discount: product.productdiscount,
    rating: {
      stars: product.stars,
      voters: +product.voters,
    },
    colors: product.colors,
    new: product.newproduct,
  }));

  return (
    <Section>
      <SectionLabel>{t("shop")}</SectionLabel>
      <div className="flex items-center justify-between max-[650px]:justify-center">
        <SectionTitle>{t2("allProducts")}</SectionTitle>
      </div>
      <Suspense fallback={<CardsSkeleton />}>
        {products && products.length ? (
          <Cards products={products} showDiscountLabel />
        ) : (
          <p className="text-center text-identity mt-10">
            {t3("shopNoProducts")}
          </p>
        )}
      </Suspense>
    </Section>
  );
}
