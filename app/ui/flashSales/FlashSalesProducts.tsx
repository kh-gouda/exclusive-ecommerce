import { fetchFlashSalesProducts } from "@/app/lib/utils";
import FlashSalesTimer from "@ui/home/FlashSalesTimer";
import Cards from "@ui/productCard/Cards";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import SectionTitle from "@ui/shared/SectionTitle";
export default async function FlashSalesProducts() {
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
      <SectionLabel>Flash Sales</SectionLabel>
      <div className="flex items-center justify-between">
        <SectionTitle>
          Flash Sales Products
          {flashSales && flashSales.length ? (
            <FlashSalesTimer targetDate={flashSales[0].endtime} />
          ) : null}
        </SectionTitle>
      </div>
      {products && products.length ? (
        <Cards products={products} showDiscountLabel />
      ) : (
        <p className="text-center text-identity mt-10">
          Waiting For The Next Flash Sales.
        </p>
      )}
    </Section>
  );
}
