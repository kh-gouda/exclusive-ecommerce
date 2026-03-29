import { fetchBestSellingProducts } from "@/app/lib/utils";
import Cards from "@ui/productCard/Cards";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import SectionTitle from "@ui/shared/SectionTitle";
import { getTranslations } from "next-intl/server";
export default async function BestSellingProducts() {
  const t = await getTranslations("sectionTitle");
  const t2 = await getTranslations("conditionalRender");

  const bestSelling = await fetchBestSellingProducts();
  const products = bestSelling.map((product) => ({
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
      <SectionLabel>{t("bestSelling")}</SectionLabel>
      <div className="flex items-center justify-between">
        <SectionTitle>{t("bestSellingProducts")}</SectionTitle>
      </div>
      {products && products.length ? (
        <Cards products={products} showDiscountLabel />
      ) : (
        <p className="text-center text-identity mt-10">{t2("noProducts")}</p>
      )}
    </Section>
  );
}
