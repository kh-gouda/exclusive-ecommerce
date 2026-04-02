import CategoryProducts from "@ui/categories/CategoryProducts";
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
    page: "categories",
    path: "/categories/[id]",
  });
}
export default async function CategoryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = +params.id;

  return (
    <Container>
      <CategoryProducts id={id} />
    </Container>
  );
}
