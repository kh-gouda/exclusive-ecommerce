import Container from "@shared/Container";
import Link from "next/link";
import SelectLanguage from "@layout/header/SelectLanguage";

export default function HeaderAd() {
  const ADVERTISEMENT =
    "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!";

  return (
    <div className="bg-black-color">
      <Container>
        <div className="flex items-center py-3">
          <p className={` text-white-text flex-1 text-center text-sm`}>
            {ADVERTISEMENT}
            <Link className="underline font-semibold ml-2" href="/shop">
              ShopNow
            </Link>
          </p>
          <SelectLanguage />
        </div>
      </Container>
    </div>
  );
}
