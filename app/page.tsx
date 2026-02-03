import Container from "@shared/Container";
import FirstAdArea from "@home/main/FirstAdArea";
import SideNav from "@home/main/SideNav";

import {
  CATEGORIES,
  BEST_SELLING_PRODUCTS,
  EXPLORE_PRODUCTS,
  FIRST_AD_AREA_LIST,
  FLASH_SALES_PRODUCTS,
} from "@/app/lib/dummyData";
import SecondAdArea from "@ui/home/SecondAdArea";
import { Carusel } from "@ui/home/Carusel";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import { createSlides } from "@/app/lib/utils";
import { CATEGRY_TYPE, ProductCardType } from "@/app/lib/typeDefinitions";
import Cards from "@ui/productCard/Cards";
import SharedButton from "@ui/shared/SharedButton";
import Categories from "@ui/home/Categories";
import SectionTitle from "@ui/shared/SectionTitle";

export default function Home() {
  const flashSalesProducts = createSlides<ProductCardType>(
    FLASH_SALES_PRODUCTS,
    4,
  );
  const flashSalesSlides = flashSalesProducts.map((slide, index) => (
    <Cards key={index} products={slide} showDiscountLabel />
  ));

  const categories = createSlides<CATEGRY_TYPE>(CATEGORIES, 6);
  const categoriesSlides = categories.map((slide, index) => (
    <Categories key={index} categories={slide} />
  ));

  const bestSellingProducts = BEST_SELLING_PRODUCTS;

  const exploreProducts = createSlides<ProductCardType>(EXPLORE_PRODUCTS, 8);
  const exploreSlides = exploreProducts.map((slide, index) => (
    <Cards key={index} products={slide} />
  ));

  return (
    <div className="">
      <Container>
        <main className="flex pb-12.5">
          <SideNav />
          <FirstAdArea slides={FIRST_AD_AREA_LIST} options={{ loop: true }} />
        </main>

        <Section withBorder>
          <SectionLabel>Today&apos;s</SectionLabel>
          <Carusel title="Flash Sales" slides={flashSalesSlides} />
          <div className="text-center">
            <SharedButton task="fetch All Flash Sales Products">
              View All Products
            </SharedButton>
          </div>
        </Section>

        <Section withBorder>
          <SectionLabel>Categories</SectionLabel>
          <Carusel title="Browse By Category" slides={categoriesSlides} />
        </Section>

        <Section>
          <SectionLabel>This Month</SectionLabel>
          <div className="flex items-center justify-between">
            <SectionTitle>Best Selling Products</SectionTitle>
            <SharedButton task="fetch All Best Selling Products">
              View All
            </SharedButton>
          </div>
          <Cards products={bestSellingProducts} />
        </Section>

        <SecondAdArea />

        <Section withBorder>
          <SectionLabel>Today&apos;s</SectionLabel>
          <Carusel title="Flash Sales" slides={exploreSlides} />
          <div className="text-center">
            <SharedButton task="fetch All Products">
              View All Products
            </SharedButton>
          </div>
        </Section>
      </Container>
    </div>
  );
}
