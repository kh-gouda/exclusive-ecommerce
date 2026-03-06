import { authOptions } from "@/app/lib/auth";
import { JUST_FOR_YOU_PRODUCTS } from "@/app/lib/dummyData";
import { fetchWishList } from "@/app/lib/utils";
import Cards from "@ui/productCard/Cards";
import Container from "@ui/shared/Container";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import SharedButton from "@ui/shared/SharedButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function WishList() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/account/wishlist");
  }

  const fetchedWishListProducts = await fetchWishList(+session.user.id);
  const wishListProducts = fetchedWishListProducts.map((product) => ({
    productID: +product.productid,
    productTitle: product.productname,
    productImage: product.productimages[0],
    price: parseFloat(product.productprice),
    discount: +product.productdiscount,
  }));
  const wishListProductsCount = wishListProducts.length;

  const justForUProducts = JUST_FOR_YOU_PRODUCTS;
  return (
    <Container>
      <Section>
        <div className="flex items-center justify-between">
          <h2>Wishlist ({wishListProductsCount})</h2>
          {wishListProductsCount ? (
            <SharedButton transparent task="Move All To Bag">
              Move All To Bag
            </SharedButton>
          ) : null}
        </div>
        {wishListProductsCount ? (
          <Cards
            products={wishListProducts}
            showDiscountLabel
            showAddToCartButton
          />
        ) : (
          <p className="text-identity pt-4">
            No Products Added To Your Wishlist Yet
          </p>
        )}
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
