import { PRODUCT_DETAILS_Type } from "@/app/lib/typeDefinitions";
import DeliveryFeatures from "@ui/product_details/DeliveryFeatures";
import PurchaseForm from "@ui/product_details/PurchaseForm";
import Rating from "@ui/productCard/Rating";
import { inter } from "@ui/shared/fonts";
import SectionTitle from "@ui/shared/SectionTitle";
import { getTranslations } from "next-intl/server";

export default async function ProductInfo({
  info,
}: {
  info: Omit<PRODUCT_DETAILS_Type, "productImages">;
}) {
  const t = await getTranslations("products");
  const t2 = await getTranslations("general");
  const t3 = await getTranslations("conditionalRender");

  const orderInfo = {
    id: info.productId,
    title: info.productName,
    image: "",
    price: info.productPrice,
    quantity: 0,
    subtotal: 0,
  };
  return (
    <div>
      <div className="border-b">
        <SectionTitle size="24px">
          {info.productId < 44 ? t(`p${info.productId}name`) : info.productName}
        </SectionTitle>
        <div className="flex items-center gap-4">
          <Rating
            stars={info.productRating.stars}
            voters={info.productRating.voters}
            reviewsString
          />
          {info.stock && info.stock.length ? (
            <>
              <span>|</span>
              <span className="text-sm text-[#00FF66]">{t2("inStock")}</span>
            </>
          ) : null}
        </div>
        <p className={`${inter.className} font-normal text-[24px] mt-4`}>
          ${info.productPrice.toFixed(2)}
        </p>
        <p className="my-6 text-sm">
          {info.productId < 44
            ? t(`p${info.productId}description`)
            : info.productDescription}
        </p>
      </div>
      {info.stock && info.stock.length ? (
        <PurchaseForm stock={info.stock} orderInfo={orderInfo} />
      ) : (
        <p className="text-identity">{t3("outOfStock")}</p>
      )}
      <DeliveryFeatures />
    </div>
  );
}
