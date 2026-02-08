import { CART_TYPE } from "@/app/lib/typeDefinitions";
import Image from "next/image";

export default function Cart({ products }: { products: CART_TYPE[] }) {
  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between mt-10 *:flex-1 shadow py-6 px-9.5"
        >
          <div className="flex items-center gap-1">
            <div className="w-12.5 h-12.5">
              <Image
                width={190}
                height={190}
                src={product.image}
                alt={product.title}
                className="max-w-full"
              />
            </div>
            {product.title}
          </div>
          <div className="text-center">${product.price}</div>
          <div className="text-center">{product.quantity}</div>
          <div className="text-right">${product.subtotal}</div>
        </div>
      ))}
    </>
  );
}
