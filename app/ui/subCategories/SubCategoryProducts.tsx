import {
  fetchProductsBySubCategoryId,
  fetchSubCategoryById,
} from "@/app/lib/utils";
import Cards from "@ui/productCard/Cards";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import SectionTitle from "@ui/shared/SectionTitle";
export default async function SubCategoryProducts({ id }: { id: number }) {
  const subCategoryProducts = await fetchProductsBySubCategoryId(id);
  const products = subCategoryProducts.map((product) => ({
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

  const subCategoryName = await fetchSubCategoryById(id);
  return (
    <Section>
      <SectionLabel>Sub Category</SectionLabel>
      <div className="flex items-center justify-between">
        <SectionTitle>{subCategoryName[0].subcategory}</SectionTitle>
      </div>
      {products && products.length ? (
        <Cards products={products} showDiscountLabel showNewLabel />
      ) : (
        <p className="text-center text-identity mt-10">
          No products related to this sub category added yet.
        </p>
      )}
    </Section>
  );
}
