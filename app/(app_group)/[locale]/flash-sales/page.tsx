import FlashSalesProducts from "@ui/flashSales/FlashSalesProducts";
import Container from "@ui/shared/Container";
import { getPageMetadata } from "@/app/lib/getPageMetadata";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const param = await params;
  return getPageMetadata({
    locale: param.locale,
    page: "flashSales",
    path: "/flash-sales",
  });
}
export default async function FlashSalesPage() {
  return (
    <Container>
      <FlashSalesProducts />
    </Container>
  );
}
