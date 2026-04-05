import Container from "@ui/shared/Container";
import RelatedCategoryProducts from "@ui/subCategories/RelatedCategoryProducts";
import SubCategoryProducts from "@ui/subCategories/SubCategoryProducts";
import { getPageMetadata } from "@/app/lib/getPageMetadata";
import { Suspense } from "react";
import { CardsSkeleton } from "@ui/skeletons/productCard/skeletons";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const param = await params;
  return getPageMetadata({
    locale: param.locale,
    page: "subCategories",
    path: "/sub-categories/[id]",
  });
}
export default async function CategoryPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const id = +params.id;
  const categoryId = searchParams?.categoryid;
  const categoryIdNumber = categoryId ? +categoryId : 1;

  return (
    <Container>
      <Suspense fallback={<CardsSkeleton />}>
        <SubCategoryProducts id={id} />
      </Suspense>
      <Suspense fallback={<CardsSkeleton />}>
        <RelatedCategoryProducts id={categoryIdNumber} subCategoryId={id} />
      </Suspense>
    </Container>
  );
}
