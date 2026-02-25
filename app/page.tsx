import Container from "@shared/Container";
import FirstAdArea from "@home/main/FirstAdArea";
import SideNav from "@home/main/SideNav";
import { FIRST_AD_AREA_LIST, NEW_ARRIVAL_DATA } from "@/app/lib/dummyData";
import SecondAdArea from "@ui/home/SecondAdArea";
import { Carusel } from "@ui/home/Carusel";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import {
  createSlides,
  fetchAllProducts,
  fetchBestSellingProducts,
  fetchFlashSalesProducts,
  fetchSubCategories,
} from "@/app/lib/utils";
import { CATEGORY_TYPE, ProductCardType } from "@/app/lib/typeDefinitions";
import Cards from "@ui/productCard/Cards";
import SharedButton from "@ui/shared/SharedButton";
import Categories from "@ui/home/Categories";
import SectionTitle from "@ui/shared/SectionTitle";
import NewArrivals from "@ui/home/NewArrivals";
import Features from "@ui/shared/Features";
import ScrollToTopButton from "@ui/shared/ScrollToTopButton";

export default async function Home() {
  const fsProducts = await fetchFlashSalesProducts();
  const FLASH_SALES_PRODUCTS = fsProducts.map((product) => ({
    productID: product.productid,
    productTitle: product.productname,
    productImage: product.productimages[0],
    price: parseFloat(product.productprice),
    discount: product.productdiscount,
    rating: {
      stars: product.stars,
      voters: +product.voters,
    },
  }));
  const flashSalesProducts = createSlides<ProductCardType>(
    FLASH_SALES_PRODUCTS,
    4,
  );
  const flashSalesSlides = flashSalesProducts.map((slide, index) => (
    <Cards key={index} products={slide} showDiscountLabel />
  ));

  const subCategories = await fetchSubCategories();
  const CATEGORIES = subCategories.map((category) => ({
    id: category.subcategoryid,
    title: category.subcategory,
    icon: category.icon,
  }));
  const categories = createSlides<CATEGORY_TYPE>(CATEGORIES, 6);
  const categoriesSlides = categories.map((slide, index) => (
    <Categories key={index} categories={slide} />
  ));

  const bestSelling_Products = await fetchBestSellingProducts();
  const BEST_SELLING_PRODUCTS = bestSelling_Products.map((product) => ({
    productID: product.productid,
    productTitle: product.productname,
    productImage: product.productimages[0],
    price: parseFloat(product.productprice),
    discount: product.productdiscount,
    rating: {
      stars: product.stars,
      voters: +product.voters,
    },
  }));

  const bestSellingProducts = BEST_SELLING_PRODUCTS;

  const allProducts = await fetchAllProducts();
  const ALL_PRODUCTS = allProducts.map((product) => ({
    productID: product.productid,
    productTitle: product.productname,
    productImage: product.productimages[0],
    price: parseFloat(product.productprice),
    discount: product.productdiscount,
    rating: {
      stars: product.stars,
      voters: +product.voters,
    },
    colors: product.colors,
  }));
  const exploreProducts = createSlides<ProductCardType>(ALL_PRODUCTS, 8);
  const exploreSlides = exploreProducts.map((slide, index) => (
    <Cards key={index} products={slide} showNewLabel />
  ));

  const newArrivalData = NEW_ARRIVAL_DATA;

  return (
    <div className="">
      <Container>
        <main className="flex pb-12.5">
          <SideNav />
          <FirstAdArea
            slides={FIRST_AD_AREA_LIST}
            options={{ loop: true, duration: 60 }}
          />
        </main>

        <Section withBorder>
          <SectionLabel>Today&apos;s</SectionLabel>
          <Carusel
            title="Flash Sales"
            slides={flashSalesSlides}
            flashSalesTimer={fsProducts[0]?.endtime}
          />
          <div className="flex justify-center items-center">
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

        <Section>
          <SectionLabel>Our Products</SectionLabel>
          <Carusel title="Explore Our Products" slides={exploreSlides} />
          <div className="flex justify-center items-center">
            <SharedButton task="fetch All Products">
              View All Products
            </SharedButton>
          </div>
        </Section>

        {/* <Section>
          <SectionLabel>Featured</SectionLabel>
          <SectionTitle>New Arrivals</SectionTitle>
          <NewArrivals newArrivals={newArrivalData} />
        </Section> */}

        <Section>
          <Features />
        </Section>

        <ScrollToTopButton />
      </Container>
    </div>
  );
}
