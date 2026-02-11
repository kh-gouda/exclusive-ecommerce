import DiscountLabel from "@productCard/DiscountLabel";
import ProductTitle from "@productCard/ProductTitle";
import PriceLbel from "@productCard/PriceLabel";
import Image from "next/image";
import Rating from "@productCard/Rating";
import { EyeIcon, HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import AddToCartButton from "@ui/productCard/AddToCartButton";
import { ProductCardType } from "@/app/lib/typeDefinitions";
import NewLabel from "@ui/productCard/NewLabel";
import ProductColor from "@ui/productCard/ProductColor";

export default function ProductCard({
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
  return (
    <div className="group w-67.5 cursor-pointer">
      <div className="relative w-full h-62.5 bg-gray-bg flex justify-center items-center mb-4 rounded-sm">
        <Image
          width={190}
          height={190}
          src={product.productImage}
          alt={product.productTitle}
        />
        {showDiscountLabel && product.discount ? (
          <DiscountLabel discount={product.discount} />
        ) : null}
        {showNewLabel && product.new ? <NewLabel /> : null}
        <div className="absolute right-3 top-3">
          <div className="w-8 5 h-8 5 rounded-full bg-white-color flex items-center justify-center">
            <HeartIcon className="w-5 h-5" />
          </div>
          <div className="w-8 5 h-8 5 rounded-full bg-white-color flex items-center justify-center mt-2">
            <EyeIcon className="w-5 h-5" />
          </div>
        </div>
        <AddToCartButton showAddToCartButton={showAddToCartButton} />
      </div>
      <Link href={`/products/${product.productID}`}>
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
      </Link>
    </div>
  );
}
