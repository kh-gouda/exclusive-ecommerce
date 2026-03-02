import CategoryProducts from "@ui/categories/CategoryProducts";
import Container from "@ui/shared/Container";

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
