import Container from "@shared/Container";
import Link from "next/link";
import SelectLanguage from "@layout/header/SelectLanguage";
import { getTranslations } from "next-intl/server";

export default async function HeaderAd() {
  const t = await getTranslations("headerAD");
  const t2 = await getTranslations("general");
  // const ADVERTISEMENT =
  //   "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!";

  return (
    <div className="bg-black-color">
      <Container>
        <div className="flex items-center py-3 max-md:flex-col max-md:gap-2">
          <p className={` text-white-text flex-1 text-center text-sm`}>
            {t("ADVERTISEMENT")}
            <Link className="underline font-semibold ms-2" href="/shop">
              {t2("shopnow")}
            </Link>
          </p>
          <SelectLanguage />
        </div>
      </Container>
    </div>
  );
}
