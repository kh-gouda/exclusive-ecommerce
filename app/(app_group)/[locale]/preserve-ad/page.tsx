import { fetchAllProducts } from "@/app/lib/utils";
import PreserveAdForm from "@ui/preserve-ad/PreserveAdForm";
import PreserveAdSideBar from "@ui/preserve-ad/PreserveAdSideBar";
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
    page: "reserveAds",
    path: "/preserve-ad",
  });
}
export default async function PreserveAd() {
  const fetchedProducts = await fetchAllProducts();
  const products = fetchedProducts.map((product) => ({
    productId: product.productid,
    productName: product.productname,
  }));
  return (
    <Container>
      <div className="flex flex-wrap gap-25 pt-20 pb-35">
        <PreserveAdSideBar />
        <div className="flex-1 max-w-full shadow p-10 max-[781px]:px-2 rounded-sm">
          <PreserveAdForm products={products} />
        </div>
      </div>
    </Container>
  );
}
