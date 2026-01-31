import Container from "@shared/Container";
import FirstAdArea from "@home/main/FirstAdArea";
import SideNav from "@home/main/SideNav";

import {
  BEST_SELLING_PRODUCTS,
  EXPLORE_PRODUCTS,
  FLASH_SALES_PRODUCTS,
} from "@/app/lib/dummyData";
import HomeSection from "@ui/home/HomeSection";
import CategoriesSection from "@ui/home/CategoriesSection";

export default function Home() {
  const flasSalesProducts = FLASH_SALES_PRODUCTS;
  const bestSellingProducts = BEST_SELLING_PRODUCTS;
  const exploreProducts = EXPLORE_PRODUCTS;

  return (
    <div className="">
      <Container>
        <main className="flex pb-12.5">
          <SideNav />
          <FirstAdArea />
        </main>
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
        <HomeSection
          label="Our Products"
          title="Explore Our Products"
          products={exploreProducts}
        />
      </Container>
    </div>
  );
}
