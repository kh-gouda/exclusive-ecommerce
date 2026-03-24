import { fetchCategories, fetchDashBoardProducts } from "@/app/lib/utils";
import ProductsDashBoard from "@ui/dashboard/ProductsDashBoard";

export default async function ProductsPage() {
  const [categories, allProducts] = await Promise.all([
    fetchCategories(),
    fetchDashBoardProducts(),
  ]);
  return <ProductsDashBoard categories={categories} products={allProducts} />;
}
