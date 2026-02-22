import { PRODUCT_DETAILS_DATA } from "@/app/lib/dummyData";
// import { PRODUCT_DETAILS_Type } from "@/app/lib/typeDefinitions";
import ImagesPreview from "@ui/product_details/ImagesPreview";
import ProductInfo from "@ui/product_details/ProductInfo";

export default function ProductDetailsMain() {
  // const product: PRODUCT_DETAILS_Type = PRODUCT_DETAILS_DATA;
  const { productImages, ...productInfo } = PRODUCT_DETAILS_DATA;
  return (
    <main className="mt-20 mb-35 flex gap-17.5">
      <ImagesPreview images={productImages} />
      <ProductInfo info={productInfo} />
    </main>
  );
}
