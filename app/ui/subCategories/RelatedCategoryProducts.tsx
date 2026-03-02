import {
  fetchCategoryById,
  fetchProductsByCategoryIdLimited,
} from "@/app/lib/utils";
import Cards from "@ui/productCard/Cards";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import SectionTitle from "@ui/shared/SectionTitle";
export default async function RelatedCategoryProducts({
  id,
  subCategoryId,
}: {
  id: number;
  subCategoryId: number;
}) {
  const categoryProducts = await fetchProductsByCategoryIdLimited(
    id,
    subCategoryId,
  );
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

  const categoryName = await fetchCategoryById(id);
  return (
    <Section>
      <SectionLabel>Related Category</SectionLabel>
      <div className="flex items-center justify-between">
        <SectionTitle>{categoryName[0].category}</SectionTitle>
      </div>
      {products && products.length ? (
        <Cards products={products} showDiscountLabel showNewLabel />
      ) : (
        <p className="text-center text-identity mt-10">
          No products for other sub-category related to this category added yet.
        </p>
      )}
    </Section>
  );
}
