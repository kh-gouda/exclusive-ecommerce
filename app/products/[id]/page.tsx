import ImagesPreview from "@ui/product_details/ImagesPreview";
import ProductInfo from "@ui/product_details/ProductInfo";
import Container from "@ui/shared/Container";

export default function ProductDetails() {
  return (
    <Container>
      <main className="mt-20 mb-35">
        <ImagesPreview />
        <ProductInfo />
      </main>
    </Container>
  );
}
