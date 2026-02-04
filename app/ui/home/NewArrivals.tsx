import { NEW_ARRIVAL_TYPE } from "@/app/lib/typeDefinitions";
import { inter } from "@ui/shared/fonts";
import Image from "next/image";
import Link from "next/link";

export default function NewArrivals({
  newArrivals,
}: {
  newArrivals: NEW_ARRIVAL_TYPE;
}) {
  return (
    <div className="new-arrivals">
      <div className="col-span-2 row-span-2">
        <Image
          className="max-w-full"
          width={446}
          height={315}
          src={newArrivals.products[0].image}
          alt={newArrivals.products[0].title}
        />
        <div className="absolute left-7.5 bottom-7.5  text-white-text">
          <h3 className={`${inter.className} font-semibold text-2xl`}>
            {newArrivals.products[0].title}
          </h3>
          <p className="text-sm my-2">{newArrivals.products[0].description}</p>
          <Link
            href={newArrivals.products[0].link}
            className="border-b border-white-text text-base font-medium"
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div className="col-span-2">
        <div className="absolute left-7.5 bottom-7.5  text-white-text">
          <h3 className={`${inter.className} font-semibold text-2xl`}>
            {newArrivals.collection.title}
          </h3>
          <p className="text-sm my-2">{newArrivals.collection.description}</p>
          <Link
            href={newArrivals.collection.link}
            className="border-b border-white-text text-base font-medium"
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div className="">
        <Image
          className="max-w-full"
          width={446}
          height={315}
          src={newArrivals.products[1].image}
          alt="speakers_0"
        />
        <div className="absolute left-7.5 bottom-7.5  text-white-text">
          <h3 className={`${inter.className} font-semibold text-2xl`}>
            {newArrivals.products[1].title}
          </h3>
          <p className="text-sm my-2">{newArrivals.products[1].description}</p>
          <Link
            href={newArrivals.products[1].link}
            className="border-b border-white-text text-base font-medium"
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div className="">
        <Image
          className="max-w-full"
          width={446}
          height={315}
          src={newArrivals.products[2].image}
          alt="perfume_0"
        />
        <div className="absolute left-7.5 bottom-7.5  text-white-text">
          <h3 className={`${inter.className} font-semibold text-2xl`}>
            {newArrivals.products[2].title}
          </h3>
          <p className="text-sm my-2">{newArrivals.products[2].description}</p>
          <Link
            href={newArrivals.products[2].link}
            className="border-b border-white-text text-base font-medium"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
