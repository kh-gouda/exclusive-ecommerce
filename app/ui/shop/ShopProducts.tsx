import { fetchAllProducts } from "@/app/lib/utils";
import Cards from "@ui/productCard/Cards";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import SectionTitle from "@ui/shared/SectionTitle";
export default async function ShopProducts() {
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
      <SectionLabel>Shop</SectionLabel>
      <div className="flex items-center justify-between">
        <SectionTitle>All Products</SectionTitle>
      </div>
      {products && products.length ? (
        <Cards products={products} showDiscountLabel />
      ) : (
        <p className="text-center text-identity mt-10">
          No products added yet.
        </p>
      )}
    </Section>
  );
}
