import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import DeliveryFeatures from "@ui/product_details/DeliveryFeatures";

export function ProductDetailsSkeleton() {
  const gallery = new Array(4).fill("dummy");
  const STARS_ARRAY = new Array(5).fill("dummy");

  return (
    <div className="mt-20 mb-35 flex gap-17.5 max-[1240px]:flex-col max-[1240px]:justify-center">
      <div className="flex gap-7.5 max-[1240px]:justify-center max-[800px]:flex-col max-[800px]:items-center max-wfull">
        <div className="flex flex-col justify-between max-[800px]:flex-row max-[800px]:flex-wrap max-[800px]:justify-center max-[800px]:gap-2 max-[380px]:hidden">
          {gallery.map((image, i) => (
            <div
              key={`${image}${i}`}
              className="w-42.5 h-34.5 bg-gray-bg  flex items-center justify-center"
              data-src={image}
            >
              <div className="w-30 h-25"></div>
            </div>
          ))}
        </div>
        <div className="w-125 max-w-full overflow-hidden bg-gray-bg flex items-center justify-center">
          <div className="max-w-111.5 max-h-78.75"></div>
        </div>
      </div>
      <div>
        <div className="border-b">
          <h2
            className={`my-6 flex items-center gap-10 max-[650px]:flex-col max-[650px]:items-start max-[650px]:gap-2.5`}
          ></h2>
          <div className="flex items-center gap-4">
            <p className="flex items-center">
              {STARS_ARRAY.map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 opacity-40" />
              ))}
              <span className="ms-3 opacity-40">( )</span>
            </p>

            <span>|</span>
            <span className="text-sm"></span>
          </div>
          <p className={`font-normal text-[24px] mt-4`}></p>
          <p className="my-6 text-sm"></p>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-6 my-6">
            <p className={`font-normal text-xl`}></p>
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-full cursor-pointer`}></div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 my-6">
            <p className={`font-normal text-xl`}></p>
            <div className="flex items-center gap-2">
              <div
                className={`p-2 border rounded-sm flex items-center justify-center cursor-pointer font-medium text-sm `}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-between flex-wrap">
            <div className="flex items-center">
              <button className="w-10 h-11 rounded-s-sm border flex items-center justify-center cursor-pointer text-2xl">
                -
              </button>
              <input
                type="number"
                defaultValue={1}
                className="w-20 h-11 border-t border-b text-center text-2xl"
              />
              <button className="w-10 h-11 rounded-e-sm flex items-center justify-center cursor-pointer text-2xl text-white-text bg-identity">
                +
              </button>
            </div>
            <button className="shared-btn shared-btn-solid"></button>
            <div className="w-10 h-10 rounded-sm border flex items-center justify-center hover:bg-identity hover:text-white-text cursor-pointer">
              <button className="w-8 5 h-8 5 rounded-full bg-white-color flex items-center justify-center cursor-pointer">
                <HeartIcon className="w-5 h-5 fill-white-color" />
              </button>
            </div>
          </div>
        </div>

        <DeliveryFeatures />
      </div>
    </div>
  );
}
