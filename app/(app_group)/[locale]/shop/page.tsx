import Container from "@ui/shared/Container";
import ShopProducts from "@ui/shop/ShopProducts";
import { getPageMetadata } from "@/app/lib/getPageMetadata";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const param = await params;
  return getPageMetadata({
    locale: param.locale,
    page: "shop",
    path: "/shop",
  });
}
export default async function ShopPage() {
  return (
    <Container>
      <ShopProducts />
    </Container>
  );
}
