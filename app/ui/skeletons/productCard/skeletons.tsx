import { EyeIcon, HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export function ProductCardSkeleton() {
  const STARS_ARRAY = new Array(5).fill("dummy");

  return (
    <div className="group w-67.5 cursor-pointer group-rtl/layoutdir:[direction:rtl]">
      <div className="relative w-full h-62.5 bg-gray-bg flex justify-center items-center mb-4 rounded-sm">
        <div className="w-47.5 h-47.5"></div>

        <div className="absolute right-3 top-3">
          <button className="w-8 5 h-8 5 rounded-full bg-white-color flex items-center justify-center cursor-pointer">
            <HeartIcon className={"w-5 h-5 fill-white-color"} />
          </button>
          <span className="w-8.5 h-8.5 rounded-full bg-white-color flex items-center justify-center mt-2">
            <EyeIcon className="w-5 h-5" />
          </span>
        </div>
        <button className={"add-to-cart w-full add-to-cart-animation"}></button>
      </div>
      <h3 className="font-medium text-base"></h3>;
      <p className="my-2">
        <span className="font-medium text-identity text-base"></span>

        <span className="line-through font-medium text-base ml-4 opacity-40"></span>
      </p>
      <p className="flex items-center">
        {STARS_ARRAY.map((_, i) => (
          <StarIcon key={i} className="h-5 w-5 opacity-40" />
        ))}
        <span className="ms-3 opacity-40"></span>
      </p>
    </div>
  );
}

export function CardsSkeleton() {
  const products = new Array(4).fill("dummy");

  return (
    <>
      {products && products.length ? (
        <div className="flex gap-6 flex-wrap mt-10 mb-12 justify-center">
          {products.map((product, i) => (
            <ProductCardSkeleton key={`${product}${i}`} />
          ))}
        </div>
      ) : null}
    </>
  );
}
