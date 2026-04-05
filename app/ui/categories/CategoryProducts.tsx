import { fetchProductsByCategoryId } from "@/app/lib/utils";
import Cards from "@ui/productCard/Cards";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import SectionTitle from "@ui/shared/SectionTitle";
import { CardsSkeleton } from "@ui/skeletons/productCard/skeletons";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
export default async function CategoryProducts({ id }: { id: number }) {
  const t = await getTranslations();

  const categoryProducts = await fetchProductsByCategoryId(id);
  const products = categoryProducts.map((product) => ({
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
      <SectionLabel>{t("sectionLabel.category")}</SectionLabel>
      <div className="flex items-center justify-between max-[650px]:justify-center">
        <Suspense
          fallback={
            <h2
              className={`my-6 flex items-center gap-10 max-[650px]:flex-col max-[650px]:items-start max-[650px]:gap-2.5`}
            ></h2>
          }
        >
          <SectionTitle>{t(`categories.category${id}`)}</SectionTitle>
        </Suspense>
      </div>
      <Suspense fallback={<CardsSkeleton />}>
        {products && products.length ? (
          <Cards products={products} showDiscountLabel showNewLabel />
        ) : (
          <p className="text-center text-identity mt-10">
            {t("missedTranslations.noRelatedCategoryProducts")}
          </p>
        )}
      </Suspense>
    </Section>
  );
}
