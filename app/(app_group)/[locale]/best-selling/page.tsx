import BestSellingProducts from "@ui/bestSelling/BestSellingProducts";
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
    page: "bestSelling",
    path: "/best-selling",
  });
}
export default async function BestSellingPage() {
  return (
    <Container>
      <BestSellingProducts />
    </Container>
  );
}
