import { confirmAd } from "@/app/actions/preserveAd";
import { fetchAllProducts } from "@/app/lib/utils";
import PreserveAdForm from "@ui/preserve-ad/PreserveAdForm";
import PreserveAdSideBar from "@ui/preserve-ad/PreserveAdSideBar";
import Container from "@ui/shared/Container";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default async function PreserveAd(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const adId = Number(searchParams.adid);
  const paymentSuccess = searchParams.success;

  if (paymentSuccess) {
    await confirmAd(adId);
    redirect("/");
  }

  const fetchedProducts = await fetchAllProducts();
  const products = fetchedProducts.map((product) => ({
    productId: product.productid,
    productName: product.productname,
  }));
  return (
    <Container>
      <main className="flex gap-25 pt-20 pb-35">
        <PreserveAdSideBar />
        <div className="flex-1 shadow p-10 rounded-sm">
          <PreserveAdForm products={products} />
        </div>
      </main>
    </Container>
  );
}
