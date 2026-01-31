import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { inter } from "@ui/shared/fonts";
import Image from "next/image";
import Link from "next/link";

export default function FirstAdArea() {
  const AD = {
    product: "iPhone 14 Series",
    productLogo: "/images/apple_logo.webp",
    details: "Up to 10% off Voucher",
    link: "/shop",
    imageSrc: "/images/iphone_14_series.webp",
  };
  return (
    <div className="pl-10 flex-1 pt-11.25">
      <div className="w-full h-full bg-black-color flex items-center justify-center">
        <div className="text-white-text flex-1 pl-16">
          <div className="flex items-center">
            <Image
              width={49}
              height={49}
              src={AD.productLogo}
              alt={AD.productLogo}
            />
            <span className="text-base ml-6">{AD.product}</span>
          </div>
          <div className={`${inter.className} font-semibold text-[48px] my-5 `}>
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
        <Image
          className="flex-1"
          width={248}
          height={176}
          src={AD.imageSrc}
          alt={AD.imageSrc}
        />
      </div>
    </div>
  );
}
