"use client";
import { FIRST_AD } from "@/app/lib/typeDefinitions";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import FirstAdImage from "@ui/home/main/FirstAdImage";
import FirstAdLogo from "@ui/home/main/FirstAdLogo";
import { inter } from "@ui/shared/fonts";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function FirstAd({ AD }: { AD: FIRST_AD }) {
  const t = useTranslations("ads");
  return (
    <div className="flex items-center justify-center group-rtl/layoutdir:[direction:rtl] max-[800px]:flex-col max-[800px]:items-center max-[800px]:gap-5 max-w-full">
      <div className="text-white-text flex-1 ps-16 max-[800px]:ps-0">
        <div className="flex items-center">
          {AD.productLogo ? <FirstAdLogo logo={AD.productLogo} /> : null}
          <span className="text-base ms-6">
            {AD.adid === "form"
              ? t("adformtitle")
              : Number(AD.adid) > 5 || Number(AD.adid) < 4
                ? AD.product
                : t(`ad${AD.adid}title`)}
          </span>
        </div>
        <div
          className={`${inter.className} font-semibold text-[48px] my-5 max-[800px]:text-2xl`}
        >
          {AD.adid === "form"
            ? t("adformdetails")
            : Number(AD.adid) > 5 || Number(AD.adid) < 4
              ? AD.details
              : t(`ad${AD.adid}details`)}
        </div>
        <div className="flex gap-2.75 items-center">
          <Link
            href={AD.link}
            className="font-medium text-base pb-1 border-b border-white-color "
          >
            {AD.link === "/preserve-ad" ? t("adformaction") : t("adaction")}
          </Link>
          <ArrowRightIcon className="w-5 h-5 group-rtl/layoutdir:rotate-180" />
        </div>
      </div>
      {AD.imageSrc ? <FirstAdImage image={AD.imageSrc} /> : null}
    </div>
  );
}
