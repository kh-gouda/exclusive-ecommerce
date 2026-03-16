import { fetchAllProducts } from "@/app/lib/utils";
import PreserveAdForm from "@ui/preserve-ad/PreserveAdForm";
import PreserveAdSideBar from "@ui/preserve-ad/PreserveAdSideBar";
import Container from "@ui/shared/Container";

export default async function PreserveAd() {
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
