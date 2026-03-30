import { fetchProductsByCategoryId } from "@/app/lib/utils";
import Cards from "@ui/productCard/Cards";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import SectionTitle from "@ui/shared/SectionTitle";
import { getTranslations } from "next-intl/server";
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
      <div className="flex items-center justify-between">
        <SectionTitle>{t(`categories.category${id}`)}</SectionTitle>
      </div>
      {products && products.length ? (
        <Cards products={products} showDiscountLabel showNewLabel />
      ) : (
        <p className="text-center text-identity mt-10">
          No products related to this category added yet.
        </p>
      )}
    </Section>
  );
}
