import { getTranslations } from "next-intl/server";

export default async function PreserveAdSideBar() {
  const t = await getTranslations();
  return (
    <div className="w-50 font-medium text-lg text-gray-500 max-[781px]:w-full max-[781px]:px-2">
      <p>
        {t("preserveAd.p1start")}
        <span className="text-identity text-base">
          {t("preserveAd.p1span")}
        </span>{" "}
        {t("preserveAd.p1end")}
      </p>
      <p className="my-3">{t("preserveAd.p2")}</p>
      <p>{t("preserveAd.p3")}</p>
    </div>
  );
}
