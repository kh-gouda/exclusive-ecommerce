import Container from "@shared/Container";
import FirstAd from "@home/main/FirstAd";
import SideNav from "@home/main/SideNav";

import {
  BEST_SELLING_PRODUCTS,
  EXPLORE_PRODUCTS,
  FLASH_SALES_PRODUCTS,
} from "@/app/lib/dummyData";
import HomeSection from "@ui/home/HomeSection";
import CategoriesSection from "@ui/home/CategoriesSection";
import SecondAdArea from "@ui/home/SecondAdArea";
import { EmblaCarousel } from "@ui/home/Carusel";

const AD = {
  product: "iPhone 14 Series",
  productLogo: "/images/apple_logo.webp",
  details: "Up to 10% off Voucher",
  link: "/shop",
  imageSrc: "/images/iphone_14_series.webp",
};
export default function Home() {
  const flasSalesProducts = FLASH_SALES_PRODUCTS;
  const bestSellingProducts = BEST_SELLING_PRODUCTS;
  const exploreProducts = EXPLORE_PRODUCTS;

  return (
    <div className="">
      <Container>
        <main className="flex pb-12.5">
          <SideNav />
          <FirstAd AD={AD} />
        </main>
        <EmblaCarousel products={flasSalesProducts} showDiscountLabel />
        <HomeSection
          label="Today's"
          title="Flash Sales"
          products={flasSalesProducts}
          showDiscountLabel
        />
        <CategoriesSection />
        <HomeSection
          label="This Month"
          title="Best Selling Products"
          products={bestSellingProducts}
        />
        <SecondAdArea />
        <HomeSection
          label="Our Products"
          title="Explore Our Products"
          products={exploreProducts}
        />
      </Container>
    </div>
  );
}
