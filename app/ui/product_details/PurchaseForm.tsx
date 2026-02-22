import { HeartIcon } from "@heroicons/react/24/outline";
import ProductColors from "@ui/product_details/ProductColors";
import ProductSizes from "@ui/product_details/ProductSizes";
import { inter } from "@ui/shared/fonts";
import SharedButton from "@ui/shared/SharedButton";
export default function PurchaseForm({
  colors,
  sizes,
}: {
  colors: string[];
  sizes: string[];
}) {
  return (
    <form>
      <div className="flex items-center gap-6 my-6">
        <p className={`${inter.className} font-normal text-xl`}>Colours: </p>
        <ProductColors colors={colors} />
      </div>
      <div className="flex items-center gap-6 my-6">
        <p className={`${inter.className} font-normal text-xl`}>Size: </p>
        <ProductSizes sizes={sizes} />
      </div>
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center">
          <button className="w-10 h-11 rounded-l-sm border flex items-center justify-center cursor-pointer text-2xl">
            -
          </button>
          <input
            type="number"
            min={1}
            defaultValue={1}
            className="w-20 h-11 border-t border-b text-center text-2xl"
          />
          <button className="w-10 h-11 rounded-r-sm flex items-center justify-center cursor-pointer text-2xl text-white-text bg-identity">
            +
          </button>
        </div>
        <SharedButton task="Buy Now">Buy Now</SharedButton>
        <div className="w-10 h-10 rounded-sm border flex items-center justify-center hover:bg-identity hover:text-white-text cursor-pointer">
          <HeartIcon className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </form>
  );
}
