import {
  fetchCategories,
  fetchColors,
  fetchDashBoardProductById,
  fetchSizes,
  fetchSubCategories,
} from "@/app/lib/utils";
import EditProductForm from "@ui/dashboard/EditProductForm";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function EditProductPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const productId = Number(searchParams.productid);
  // const product = await fetchDashBoardProductById(productId);

  const [product, categories, subcategories, colors, sizes] = await Promise.all(
    [
      fetchDashBoardProductById(productId),
      fetchCategories(),
      fetchSubCategories(),
      fetchColors(),
      fetchSizes(),
    ],
  );

  return (
    <>
      <h3 className="mb-7.5">Edit Product</h3>
      <EditProductForm
        product={product[0]}
        categories={categories}
        subcategories={subcategories}
        colors={colors}
        sizes={sizes}
      />
    </>
  );
}
