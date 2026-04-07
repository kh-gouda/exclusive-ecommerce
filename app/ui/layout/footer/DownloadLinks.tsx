import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default async function Downloadlinks() {
  const t = await getTranslations("footer");
  return (
    <div className="min-w-49.5">
      <h3 className="text-white-text font-medium text-xl">
        {t("downloadHeading")}
      </h3>
      <p className="text-white-text font-medium text-sm mt-6 mb-2">
        {t("downloadOffer")}
      </p>
      <div className="flex gap-2 items-center">
        <Image width={80} height={80} src="/images/Qrcode.webp" alt="qr code" />
        <div>
          <Image
            width={110}
            height={40}
            src="/images/google_play_store_logo.webp"
            alt="google_play_store_logo"
            className="mb-1 border border-white-text rounded-sm cursor-pointer"
          />
          <Image
            width={110}
            height={40}
            src="/images/apple_store_logo.webp"
            alt="apple_store_logo"
            className="border border-white-text rounded-sm cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4 *:cursor-pointer">
        <Link href={"https://www.linkedin.com/in/kh-gouda/"}>
          <FaFacebook className="h-6 w-6 text-white-color hover:text-blue-900" />
        </Link>
        <Link href={"https://www.linkedin.com/in/kh-gouda/"}>
          <FaTwitter className="h-6 w-6 text-white-color hover:text-blue-700" />
        </Link>
        <Link href={"https://www.linkedin.com/in/kh-gouda/"}>
          <FaInstagram className="h-6 w-6 text-white-color hover:text-pink-700" />
        </Link>
        <Link href={"https://www.linkedin.com/in/kh-gouda/"}>
          <FaLinkedin className="h-6 w-6 text-white-color hover:text-blue-900" />
        </Link>
      </div>
    </div>
  );
}
