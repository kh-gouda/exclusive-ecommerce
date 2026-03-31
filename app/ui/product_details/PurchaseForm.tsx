"use client";
import { addOrder, addOrderItems } from "@/app/actions/addOrder";
import { CART_TYPE } from "@/app/lib/typeDefinitions";
import { HeartIcon } from "@heroicons/react/24/outline";
import ProductColors from "@ui/product_details/ProductColors";
import ProductSizes from "@ui/product_details/ProductSizes";
import { inter } from "@ui/shared/fonts";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";
import { toast } from "react-toastify";
export default function PurchaseForm({
  stock,
  orderInfo,
}: {
  stock: { color: string; size: string; quantity: number }[];
  orderInfo: CART_TYPE;
}) {
  const t = useTranslations("general");
  const { data: session } = useSession();
  const userId = session?.user.id;

  const router = useRouter();
  const notifyError = (error: string) => toast.error(error);

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

  async function handleBuyNow() {
    try {
      if (session && userId) {
        const insertedOrder = await addOrder(
          Number(userId),
          "",
          0,
          orderInfo.price * orderQuantity,
        );

        const cartProducts = [
          {
            id: orderInfo.id,
            title: orderInfo.title,
            image: orderInfo.image,
            price: orderInfo.price,
            quantity: orderQuantity,
            subtotal: orderInfo.subtotal,
          },
        ];

        await addOrderItems(Number(insertedOrder[0].orderid), cartProducts);
        router.push(
          `/account/${userId}/checkout?orderid=${insertedOrder[0].orderid}`,
        );
      } else {
        throw new Error("You Have To Login to Buy Products");
      }
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-wrap items-center gap-6 my-6">
        <p className={`${inter.className} font-normal text-xl`}>
          {t("colour")}
        </p>
        <ProductColors
          colors={colors}
          selectedColor={selectedColor}
          clickColor={(color) => setSelectedColor(color)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-6 my-6">
        <p className={`${inter.className} font-normal text-xl`}>{t("size")}</p>
        <ProductSizes
          sizes={sizes || ["one size"]}
          selectedSize={selectedSize}
          clickSize={(size) => setSelectedSize(size)}
        />
      </div>
      <div className="flex items-center gap-4 justify-between flex-wrap">
        <div className="flex items-center">
          <button
            className="w-10 h-11 rounded-s-sm border flex items-center justify-center cursor-pointer text-2xl"
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
            className="w-10 h-11 rounded-e-sm flex items-center justify-center cursor-pointer text-2xl text-white-text bg-identity"
            onClick={handlePlusClick}
          >
            +
          </button>
        </div>
        <button className="shared-btn shared-btn-solid" onClick={handleBuyNow}>
          {t("buyNow")}
        </button>
        <div className="w-10 h-10 rounded-sm border flex items-center justify-center hover:bg-identity hover:text-white-text cursor-pointer">
          <HeartIcon className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </form>
  );
}
