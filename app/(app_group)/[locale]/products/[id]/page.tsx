import {
  fetchProductById,
  fetchProductsByCategoryId2Limited,
} from "@/app/lib/utils";
import ProductDetailsMain from "@ui/product_details/ProductDetailsMain";
import Cards from "@ui/productCard/Cards";
import BreadCrumbs from "@ui/shared/BreadCrumbs";
import Container from "@ui/shared/Container";
import Section from "@ui/shared/Section";
import SectionLabel from "@ui/shared/SectionLabel";
import { getTranslations } from "next-intl/server";
import { getPageMetadata } from "@/app/lib/getPageMetadata";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const param = await params;
  return getPageMetadata({
    locale: param.locale,
    page: "products",
    path: "/products/[id]",
  });
}
export default async function ProductDetails(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = +params.id;

  const breadCrumbs = [
    { label: "products", href: "/shop" },
    { label: `${id}`, href: `/products/${id}`, number: true },
  ];

  const t = await getTranslations("sectionLabel");
  const t2 = await getTranslations("conditionalRender");

  const product = await fetchProductById(id);
  const PRODUCT_DETAILS_DATA = {
    productId: product[0].productid,
    productName: product[0].productname,
    productDescription: product[0].productdescription,
    productPrice: +product[0].productprice,
    productImages: [...product[0].productimages],
    productRating: {
      voters: +product[0].voters,
      stars: +product[0].stars,
    },
    stock: product[0].stock.map((stock) => ({
      ...stock,
      quantity: +stock.quantity,
    })),
  };

  const categoryId = product[0].categoryid;
  const relatedProducts = await fetchProductsByCategoryId2Limited(categoryId);
  const products = relatedProducts.map((product) => ({
    productID: product.productid,
    productTitle: product.productname,
    productImage: product.productimages[0],
    price: +product.productprice,
    discount: product.productdiscount,
    rating: {
      stars: product.stars,
      voters: +product.voters,
    },
    colors: product.colors,
    new: product.newproduct,
  }));

  return (
    <Container>
      <div className="pt-20">
        <BreadCrumbs breadCrumbs={breadCrumbs} />
      </div>
      <ProductDetailsMain productDetails={PRODUCT_DETAILS_DATA} />
      <Section>
        <SectionLabel>{t("relatedItems")}</SectionLabel>

        {products && products.length ? (
          <Cards products={products} showDiscountLabel />
        ) : (
          <p className="text-center text-identity mt-10">
            {t2("noRelatedSubCategory")}
          </p>
        )}
      </Section>
    </Container>
  );
}
