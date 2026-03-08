import DiscountLabel from "@productCard/DiscountLabel";
import ProductTitle from "@productCard/ProductTitle";
import PriceLbel from "@productCard/PriceLabel";
import Rating from "@productCard/Rating";
import AddToCartButton from "@ui/productCard/AddToCartButton";
import { ProductCardType } from "@/app/lib/typeDefinitions";
import NewLabel from "@ui/productCard/NewLabel";
import ProductColor from "@ui/productCard/ProductColor";
import CardImage from "@ui/productCard/CardImage";
import VieProductDetailsLink from "@ui/productCard/ViewProductDetilsLink";
import AddToWishListButton from "@ui/productCard/AddToWishListButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export default async function ProductCard({
  product,
  showDiscountLabel,
  showNewLabel,
  showAddToCartButton,
}: {
  product: ProductCardType;
  showDiscountLabel?: boolean;
  showNewLabel?: boolean;
  showAddToCartButton?: boolean;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  return (
    <div className="group w-67.5 cursor-pointer">
      <div className="relative w-full h-62.5 bg-gray-bg flex justify-center items-center mb-4 rounded-sm">
        <CardImage productImage={product.productImage} />

        {showDiscountLabel && product.discount ? (
          <DiscountLabel discount={product.discount} />
        ) : null}

        {showNewLabel && product.new ? <NewLabel /> : null}

        <div className="absolute right-3 top-3">
          <AddToWishListButton productId={product.productID} userId={userId} />
          <VieProductDetailsLink id={product.productID} />
        </div>
        <AddToCartButton
          showAddToCartButton={showAddToCartButton}
          productId={product.productID}
          userId={userId}
        />
      </div>

      <ProductTitle title={product.productTitle} />

      <PriceLbel price={product.price} discount={product.discount} />

      {product.rating ? (
        <Rating stars={product.rating.stars} voters={product.rating.voters} />
      ) : null}
      {product.colors && product.colors.length ? (
        <div className="mt-2">
          {product.colors.map((color) => (
            <ProductColor key={color} color={color} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
