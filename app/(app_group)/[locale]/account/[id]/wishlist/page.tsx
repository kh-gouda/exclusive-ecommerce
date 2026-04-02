import { authOptions } from "@/app/lib/auth";
import { FETCHED_PRODUCT_CARD_TYPE } from "@/app/lib/typeDefinitions";
import {
  fetchProductsByCategoryId2Limited,
  fetchWishList,
} from "@/app/lib/utils";
import Cards from "@ui/productCard/Cards";
import Container from "@ui/shared/Container";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import MoveAllToBagBtn from "@ui/wishlist/MoveAllToBagBtn";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { getPageMetadata } from "@/app/lib/getPageMetadata";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const param = await params;
  return getPageMetadata({
    locale: param.locale,
    page: "wishlist",
    path: "/account/[id]/wishlist",
  });
}
export default async function WishList() {
  const t = await getTranslations();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/account/wishlist");
  }

  const fetchedWishListProducts = await fetchWishList(+session.user.id);
  const wishListProducts = fetchedWishListProducts.map((product) => ({
    productID: Number(product.productid),
    productTitle: product.productname,
    productImage: product.productimages[0],
    price: parseFloat(product.productprice),
    discount: Number(product.productdiscount),
  }));
  const wishListProductsCount = wishListProducts.length;

  function getForUCategoryId(
    productsArray: FETCHED_PRODUCT_CARD_TYPE[],
  ): number {
    const categoryReputation: Record<string, number> = productsArray.reduce(
      (acc, product) => {
        const key = String(product.categoryid);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    let maxCategoryCount = 0;
    let mostRepeatedCategory = "";

    Object.keys(categoryReputation).forEach((key) => {
      if (categoryReputation[key] > maxCategoryCount) {
        maxCategoryCount = categoryReputation[key];
        mostRepeatedCategory = key;
      }
    });

    return Number(mostRepeatedCategory);
  }

  const forUCategoryId = getForUCategoryId(fetchedWishListProducts);

  const fetchedJustForUProducts =
    await fetchProductsByCategoryId2Limited(forUCategoryId);
  const justForUProducts = fetchedJustForUProducts.map((product) => ({
    productID: Number(product.productid),
    productTitle: product.productname,
    productImage: product.productimages[0],
    price: parseFloat(product.productprice),
    discount: Number(product.productdiscount),
    rating: {
      stars: Number(product.stars),
      voters: Number(product.voters),
    },
  }));

  return (
    <Container>
      <Section>
        <div className="flex flex-wrap items-center justify-between">
          <h2>
            {t("general.wishList")} ({wishListProductsCount})
          </h2>
          {wishListProductsCount ? (
            <MoveAllToBagBtn
              userId={Number(session.user.id)}
              productsIds={wishListProducts.map((p) => p.productID)}
            />
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
            {t("conditionalRender.noWishlist")}
          </p>
        )}
      </Section>
      {justForUProducts.length ? (
        <Section>
          <SectionLabel>{t("sectionLabel.justForYou")}</SectionLabel>
          <div className="pb-17.5">
            <Cards products={justForUProducts} showDiscountLabel showNewLabel />
          </div>
        </Section>
      ) : null}
    </Container>
  );
}
