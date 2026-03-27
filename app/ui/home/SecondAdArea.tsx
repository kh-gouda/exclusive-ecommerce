import { fetchSecondAd } from "@/app/lib/utils";
import SecondAdImage from "@ui/home/SecondAdImage";
import SecondAdTimer from "@ui/home/SecondAdTimer";
import { inter } from "@ui/shared/fonts";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function SecondAdArea() {
  const t = await getTranslations("general");

  const ad = await fetchSecondAd();
  const adData = ad[0];

  return (
    <section className="bg-black-color p-12.5 flex items-center gap-5 my-25">
      <div className="flex-1 text-white-text">
        <div className="text-base font-semibold text-green-color">
          Categories
        </div>
        <h2
          className={`${inter.className} font-semibold text-white-text text-5xl my-8`}
        >
          <p>{adData?.adtitle}</p>
        </h2>

        <SecondAdTimer targetDate={"adData?.endtime"} />

        <Link
          href={`/products/${adData.productid}`}
          className="bg-green-color text-white-text py-4 px-12 rounded-sm font-medium text-base my-10 cursor-pointer inline-block"
        >
          {t("buyNow")}
        </Link>
      </div>

      <SecondAdImage image={adData?.adimage} />
    </section>
  );
}
