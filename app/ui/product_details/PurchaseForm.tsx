"use client";
import { HeartIcon } from "@heroicons/react/24/outline";
import ProductColors from "@ui/product_details/ProductColors";
import ProductSizes from "@ui/product_details/ProductSizes";
import { inter } from "@ui/shared/fonts";
import SharedButton from "@ui/shared/SharedButton";
import { useEffect, useEffectEvent, useState } from "react";
export default function PurchaseForm({
  stock,
}: {
  stock: { color: string; size: string; quantity: number }[];
}) {
  const colorsGroup = Object.groupBy(stock, (item) => item.color);
  const colors = Object.keys(colorsGroup);

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const [sizes, setSizes] = useState(() => {
    return colorsGroup[selectedColor]?.map((color) => color.size);
  });

  const [selectedSize, setSelectedSize] = useState(() => {
    const size = sizes && sizes.length ? sizes[0] : "onesize";
    return size;
  });

  const [orderQuantity, setOrderQuantity] = useState(1);

  const [targetStock, setTargetStock] = useState(() => {
    const stockObject = colorsGroup[selectedColor]?.filter(
      (color) => color.color === selectedColor && color.size === selectedSize,
    );
    const stock =
      stockObject && stockObject.length ? stockObject[0].quantity : 0;
    return stock;
  });

  const changeSizes = useEffectEvent(() => {
    setSizes(() => colorsGroup[selectedColor]?.map((color) => color.size));
  });

  const changeSelectedSize = useEffectEvent(() => {
    const size = sizes && sizes.length ? sizes[0] : "onesize";
    setSelectedSize(size);
  });

  const changeTargetStock = useEffectEvent(() => {
    const stockObject = colorsGroup[selectedColor]?.filter(
      (color) => color.color === selectedColor && color.size === selectedSize,
    );

    const stock =
      stockObject && stockObject.length ? stockObject[0].quantity : 0;

    setTargetStock(stock);
  });

  const changeOrderQuantity = useEffectEvent(() => {
    setOrderQuantity(1);
  });

  useEffect(() => {
    changeSizes();
    changeSelectedSize();
    changeTargetStock();
    changeOrderQuantity();
  }, [selectedColor]);

  useEffect(() => {
    changeTargetStock();
    changeOrderQuantity();
  }, [selectedSize]);

  const handlePlusClick = () =>
    setOrderQuantity((orderQuantity) =>
      orderQuantity < targetStock ? orderQuantity + 1 : orderQuantity,
    );

  const handleMinusClick = () =>
    setOrderQuantity((orderQuantity) =>
      orderQuantity > 1 ? orderQuantity - 1 : 1,
    );

  return (
    <form onClick={(e) => e.preventDefault()}>
      <div className="flex items-center gap-6 my-6">
        <p className={`${inter.className} font-normal text-xl`}>Colours: </p>
        <ProductColors
          colors={colors}
          selectedColor={selectedColor}
          clickColor={(color) => setSelectedColor(color)}
        />
      </div>
      <div className="flex items-center gap-6 my-6">
        <p className={`${inter.className} font-normal text-xl`}>Size: </p>
        <ProductSizes
          sizes={sizes || ["one size"]}
          selectedSize={selectedSize}
          clickSize={(size) => setSelectedSize(size)}
        />
      </div>
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center">
          <button
            className="w-10 h-11 rounded-l-sm border flex items-center justify-center cursor-pointer text-2xl"
            onClick={handleMinusClick}
          >
            -
          </button>
          <input
            type="number"
            min={orderQuantity}
            max={targetStock}
            defaultValue={orderQuantity}
            className="w-20 h-11 border-t border-b text-center text-2xl"
          />
          <button
            className="w-10 h-11 rounded-r-sm flex items-center justify-center cursor-pointer text-2xl text-white-text bg-identity"
            onClick={handlePlusClick}
          >
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
