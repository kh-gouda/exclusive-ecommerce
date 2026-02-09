import { JUST_FOR_YOU_PRODUCTS, WISHLIST_PRODUCTS } from "@/app/lib/dummyData";
import Cards from "@ui/productCard/Cards";
import Container from "@ui/shared/Container";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import SharedButton from "@ui/shared/SharedButton";

export default function WishList() {
  const wishListProductsCount = 4;
  const wishListProducts = WISHLIST_PRODUCTS;
  const justForUProducts = JUST_FOR_YOU_PRODUCTS;
  return (
    <Container>
      <Section>
        <div className="flex items-center justify-between">
          <h2>Wishlist ({wishListProductsCount})</h2>
          <SharedButton transparent task="Move All To Bag">
            Move All To Bag
          </SharedButton>
        </div>
        <Cards
          products={wishListProducts}
          showDiscountLabel
          showAddToCartButton
        />
      </Section>
      <Section>
        <SectionLabel>Just For You</SectionLabel>
        <div className="pb-17.5">
          <Cards products={justForUProducts} showDiscountLabel showNewLabel />
        </div>
      </Section>
    </Container>
  );
}
