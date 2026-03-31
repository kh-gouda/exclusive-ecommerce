import { PRODUCT_DETAILS_Type } from "@/app/lib/typeDefinitions";
import ImagesPreview from "@ui/product_details/ImagesPreview";
import ProductInfo from "@ui/product_details/ProductInfo";

export default async function ProductDetailsMain({
  productDetails,
}: {
  productDetails: PRODUCT_DETAILS_Type;
}) {
  const { productImages, ...productInfo } = productDetails;
  return (
    <div className="mt-20 mb-35 flex gap-17.5 max-[1240px]:flex-col max-[1240px]:justify-center">
      <ImagesPreview images={productImages} />
      <ProductInfo info={productInfo} />
    </div>
  );
}
