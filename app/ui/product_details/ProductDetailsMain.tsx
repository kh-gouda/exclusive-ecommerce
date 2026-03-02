import { fetchProductById } from "@/app/lib/utils";
import ImagesPreview from "@ui/product_details/ImagesPreview";
import ProductInfo from "@ui/product_details/ProductInfo";

export default async function ProductDetailsMain({
  productId,
}: {
  productId: number;
}) {
  const product = await fetchProductById(productId);
  const PRODUCT_DETAILS_DATA = {
    productId: product[0].productid,
    productName: product[0].productname,
    productDescription: product[0].productdescription,
    productPrice: +product[0].productprice,
    productImages: [...product[0].productimages],
    productRating: {
      voters: +product[0].voters,
      stars: +product[0].stars,
    },
    stock: product[0].stock.map((stock) => ({
      ...stock,
      quantity: +stock.quantity,
    })),
  };

  const { productImages, ...productInfo } = PRODUCT_DETAILS_DATA;
  return (
    <main className="mt-20 mb-35 flex gap-17.5">
      <ImagesPreview images={productImages} />
      <ProductInfo info={productInfo} />
    </main>
  );
}
