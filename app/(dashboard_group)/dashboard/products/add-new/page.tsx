import {
  fetchCategories,
  fetchColors,
  fetchSizes,
  fetchSubCategories,
} from "@/app/lib/utils";
import AddNewProductForm from "@ui/dashboard/AddNewProductForm";

export default async function AddNewProductPage() {
  const [categories, subcategories, colors, sizes] = await Promise.all([
    fetchCategories(),
    fetchSubCategories(),
    fetchColors(),
    fetchSizes(),
  ]);

  return (
    <>
      <h3 className="mb-7.5">Add New Product</h3>
      <AddNewProductForm
        categories={categories}
        subcategories={subcategories}
        colors={colors}
        sizes={sizes}
      />
    </>
  );
}
