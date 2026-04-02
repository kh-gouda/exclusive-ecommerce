import { authOptions } from "@/app/lib/auth";
import { fetchUserReviews } from "@/app/lib/utils";
import Cards from "@ui/productCard/Cards";
import Container from "@ui/shared/Container";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { getPageMetadata } from "@/app/lib/getPageMetadata";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const param = await params;
  return getPageMetadata({
    locale: param.locale,
    page: "reviews",
    path: "/account/[id]/reviews",
  });
}
export default async function MyProductsReviews() {
  const t = await getTranslations("sectionLabel");

  const session = await getServerSession(authOptions);

  const data = await fetchUserReviews(Number(session?.user.id));
  const products = data.map((review) => ({
    productID: review.productid,
    productTitle: review.productname,
    productImage: review.productimages[0],
    price: review.productprice,
    discount: review.productdiscount,
    rating: {
      voters: 1,
      stars: review.ratingvalue,
    },
  }));

  return (
    <Container>
      <Section>
        <SectionLabel>{t("myReviews")}</SectionLabel>
        <Cards products={products} />
      </Section>
    </Container>
  );
}
