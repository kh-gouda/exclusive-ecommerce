import { FIRST_AD } from "@/app/lib/typeDefinitions";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import FirstAdImage from "@ui/home/main/FirstAdImage";
import FirstAdLogo from "@ui/home/main/FirstAdLogo";
import { inter } from "@ui/shared/fonts";
import Link from "next/link";

export default function FirstAd({ AD }: { AD: FIRST_AD }) {
  return (
    <div className="flex items-center justify-center">
      <div className="text-white-text flex-1 pl-16">
        <div className="flex items-center">
          <FirstAdLogo logo={AD.productLogo || ""} />
          <span className="text-base ml-6">{AD.product}</span>
        </div>
        <div className={`${inter.className} font-semibold text-[48px] my-5`}>
          {AD.details}
        </div>
        <div className="flex gap-2.75 items-center">
          <Link
            href={AD.link}
            className="font-medium text-base pb-1 border-b border-white-color "
          >
            Shop Now
          </Link>
          <ArrowRightIcon className="w-5 h-5" />
        </div>
      </div>
      <FirstAdImage image={AD.imageSrc || ""} />
    </div>
  );
}
