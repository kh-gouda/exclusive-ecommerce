import { PRODUCT_DETAILS_Type } from "@/app/lib/typeDefinitions";
import PurchaseForm from "@ui/product_details/PurchaseForm";
import Rating from "@ui/productCard/Rating";
import { inter } from "@ui/shared/fonts";
import SectionTitle from "@ui/shared/SectionTitle";

export default function ProductInfo({
  info,
}: {
  info: Omit<PRODUCT_DETAILS_Type, "productImages">;
}) {
  return (
    <div>
      <div className="border-b">
        <SectionTitle size="24px">{info.productName}</SectionTitle>
        <div className="flex items-center gap-4">
          <Rating
            stars={info.productRating.stars}
            voters={info.productRating.voters}
            reviewsString
          />
          {info.stock && info.stock.length ? (
            <>
              <span>|</span>
              <span className="text-sm text-[#00FF66]">In Stock</span>
            </>
          ) : null}
        </div>
        <p className={`${inter.className} font-normal text-[24px] mt-4`}>
          ${info.productPrice.toFixed(2)}
        </p>
        <p className="my-6 text-sm">{info.productDescription}</p>
      </div>
      {info.stock && info.stock.length ? (
        <PurchaseForm stock={info.stock} />
      ) : (
        <p className="text-identity">Sorry Out Of Stock</p>
      )}
    </div>
  );
}
