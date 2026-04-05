import fetchSearchResult from "@/app/actions/fetchSearchResult";
import { FETCHED_PRODUCT_CARD_TYPE } from "@/app/lib/typeDefinitions";
import SearchResult from "@ui/searchResult/SearchResult";
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
    page: "searchResult",
    path: "/search-result",
  });
}
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SearchPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const searchItem = searchParams.searchItem;

  let products: FETCHED_PRODUCT_CARD_TYPE[] = [];

  if (searchItem && typeof searchItem === "string") {
    products = await fetchSearchResult(searchItem);
  }

  return (
    <Container>
      <SearchResult searchResult={products} />
    </Container>
  );
}
