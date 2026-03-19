import { fetchCategories, fetchDashBoardProducts } from "@/app/lib/utils";
import ProductsDashBoard from "@ui/dashboard/ProductsDashBoard";

export default async function ProductsPage() {
  const categories = await fetchCategories();
  const allProducts = await fetchDashBoardProducts();
  return <ProductsDashBoard categories={categories} products={allProducts} />;
}
