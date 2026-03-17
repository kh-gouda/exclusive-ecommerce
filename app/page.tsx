import Container from "@shared/Container";
import FirstAdArea from "@home/main/FirstAdArea";
import SideNav from "@home/main/SideNav";
import SecondAdArea from "@ui/home/SecondAdArea";
import { Carusel } from "@ui/home/Carusel";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import {
  createSlides,
  fetchAllProductsLimited,
  fetchBestSellingProductsLimited,
  fetchFirstAd,
  fetchFlashSalesProductsLimited,
  fetchNewArrivals,
  fetchNewCollection,
  fetchSubCategories,
} from "@/app/lib/utils";
import { CATEGORY_TYPE, ProductCardType } from "@/app/lib/typeDefinitions";
import Cards from "@ui/productCard/Cards";
import Categories from "@ui/home/Categories";
import SectionTitle from "@ui/shared/SectionTitle";
import NewArrivals from "@ui/home/NewArrivals";
import Features from "@ui/shared/Features";
import ScrollToTopButton from "@ui/shared/ScrollToTopButton";
import Link from "next/link";

export default async function Home() {
  const firstAdData = await fetchFirstAd();
  const FIRST_AD_AREA_LIST = firstAdData.map((ad) => ({
    productId: ad.productid,
    product: ad.adtitle,
    productLogo: ad.adlogo,
    details: ad.addetails,
    link: `products/${ad.productid}`,
    imageSrc: ad.adimage,
  }));
  const adForm = {
    productId: FIRST_AD_AREA_LIST.length * 1000,
    product: "Ads Title",
    productLogo: "adlogo_qyqfuy",
    details: "You Can Add Your Ads Details Here",
    link: "/preserve-ad",
    imageSrc: "adimage_tmusbo",
  };
  const NEW_FIRST_AD_AREA_LIST = [...FIRST_AD_AREA_LIST, adForm];

  const fsProducts = await fetchFlashSalesProductsLimited();
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
    categoryid: category.categoryid,
  }));
  const categories = createSlides<CATEGORY_TYPE>(CATEGORIES, 6);
  const categoriesSlides = categories.map((slide, index) => (
    <Categories key={index} categories={slide} />
  ));

  const bestSelling_Products = await fetchBestSellingProductsLimited();
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

  const allProducts = await fetchAllProductsLimited();
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
    new: product.newproduct,
  }));
  const exploreProducts = createSlides<ProductCardType>(ALL_PRODUCTS, 8);
  const exploreSlides = exploreProducts.map((slide, index) => (
    <Cards key={index} products={slide} showNewLabel />
  ));

  const newArrivals = await Promise.all([
    fetchNewCollection(),
    fetchNewArrivals(),
  ]);

  const NEW_ARRIVAL_DATA = {
    collection: newArrivals[0].map((collection) => ({
      title: collection.collectiontitle,
      description: collection.collectiondescription,
      categoryid: collection.categoryid,
    }))[0],
    products: newArrivals[1].map((product) => ({
      title: product.productname,
      description: product.productdescription,
      image: product.productimages[0],
      link: `products/${product.productid}`,
    })),
  };

  const newArrivalData = NEW_ARRIVAL_DATA;

  return (
    <div className="">
      <Container>
        <div className="flex pb-12.5">
          <SideNav />
          <FirstAdArea
            slides={NEW_FIRST_AD_AREA_LIST}
            options={{ loop: true, duration: 60 }}
          />
        </div>

        <Section withBorder>
          <SectionLabel>Today&apos;s</SectionLabel>
          <Carusel
            title="Flash Sales"
            slides={flashSalesSlides}
            flashSalesTimer={fsProducts[0]?.endtime}
          />
          <div className="flex justify-center items-center">
            {flashSalesProducts && flashSalesProducts.length ? (
              <Link href="/flash-sales" className="shared-btn shared-btn-solid">
                View All Products
              </Link>
            ) : null}
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
            <Link href="/best-selling" className="shared-btn shared-btn-solid">
              View All Products
            </Link>
          </div>
          <Cards products={bestSellingProducts} />
        </Section>

        <SecondAdArea />

        <Section>
          <SectionLabel>Our Products</SectionLabel>
          <Carusel title="Explore Our Products" slides={exploreSlides} />
          <div className="flex justify-center items-center">
            <Link href="/shop" className="shared-btn shared-btn-solid">
              View All Products
            </Link>
            {/* <SharedButton task="fetch All Products">
              View All Products
            </SharedButton> */}
          </div>
        </Section>

        <Section>
          <SectionLabel>Featured</SectionLabel>
          <SectionTitle>New Arrivals</SectionTitle>
          <NewArrivals newArrivals={newArrivalData} />
        </Section>

        <Section>
          <Features />
        </Section>

        <ScrollToTopButton />
      </Container>
    </div>
  );
}
