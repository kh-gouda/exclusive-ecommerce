import { fetchFlashSalesProducts } from "@/app/lib/utils";
import FlashSalesTimer from "@ui/home/FlashSalesTimer";
import Cards from "@ui/productCard/Cards";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import SectionTitle from "@ui/shared/SectionTitle";
import { CardsSkeleton } from "@ui/skeletons/productCard/skeletons";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
export default async function FlashSalesProducts() {
  const t = await getTranslations("sectionTitle");
  const t2 = await getTranslations("conditionalRender");

  const flashSales = await fetchFlashSalesProducts();
  const products = flashSales.map((product) => ({
    productID: product.productid,
    productTitle: product.productname,
    productImage: product.productimages[0],
    price: +product.productprice,
    discount: product.productdiscount,
    rating: {
      stars: product.stars,
      voters: +product.voters,
    },
  }));

  return (
    <Section>
      <SectionLabel>{t("flashSales")}</SectionLabel>
      <div className="flex items-center justify-between max-[650px]:justify-center">
        <SectionTitle>
          {t("flashSalesProducts")}
          <Suspense fallback={<></>}>
            {flashSales && flashSales.length ? (
              <FlashSalesTimer targetDate={"flashSales[0].endtime"} />
            ) : null}
          </Suspense>
        </SectionTitle>
      </div>
      <Suspense fallback={<CardsSkeleton />}>
        {products && products.length ? (
          <Cards products={products} showDiscountLabel />
        ) : (
          <p className="text-center text-identity mt-10">
            {t2("waitingSales")}
          </p>
        )}
      </Suspense>
    </Section>
  );
}
