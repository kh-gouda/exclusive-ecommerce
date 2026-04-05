import { ArrowRightIcon } from "@heroicons/react/24/outline";

export function FirstAdSkeleton() {
  return (
    <div className="flex items-center justify-center group-rtl/layoutdir:[direction:rtl] max-[800px]:flex-col max-[800px]:items-center max-[800px]:gap-5 max-w-full">
      <div className="text-white-text flex-1 ps-16 max-[800px]:ps-0">
        <div className="flex items-center">
          <div className="w-12.25 h-12.25"></div>
          <span className="text-base ms-6"></span>
        </div>
        <div
          className={` font-semibold text-[48px] my-5 max-[800px]:text-2xl`}
        ></div>
        <div className="flex gap-2.75 items-center">
          <span className="font-medium text-base pb-1 border-b border-white-color "></span>
          <ArrowRightIcon className="w-5 h-5 group-rtl/layoutdir:rotate-180" />
        </div>
      </div>
      <div className="max-w-62 max-h-44"></div>
    </div>
  );
}

export function SubCategoriesSkeleton() {
  const categories = new Array(6).fill("dummy");

  return (
    <div className="flex gap-6 flex-wrap my-15 justify-center">
      {categories.map((category, i) => (
        <div
          key={`${category}${i}`}
          className="group w-42.5 h-36.25 rounded-sm border border-border-color flex flex-col justify-center items-center gap-4 cursor-pointer hover:bg-identity hover:text-white-text"
        >
          <div className="w-14 h-14"></div>
          <div className="text-base text-center"></div>
        </div>
      ))}
    </div>
  );
}

export function SecondAdSkeleton() {
  return (
    <section className="bg-black-color p-12.5 flex items-center gap-5 my-25 max-[990px]:flex-col-reverse max-[990px]:text-center max-[990px]:gap-10">
      <div className="flex-1 text-white-text">
        <div className="text-base font-semibold text-green-color"></div>
        <h2 className={`font-semibold text-white-text text-5xl my-8`}>
          <p></p>
        </h2>

        <div className="flex gap-5 max-[990px]:gap-2 max-[990px]:justify-center">
          <div className="time">
            <span className="text-base font-semibold"></span>
          </div>
          <div className="time">
            <span className="text-base font-semibold"></span>
          </div>
          <div className="time">
            <span className="text-base font-semibold"></span>
          </div>
          <div className="time">
            <span className="text-base font-semibold"></span>
          </div>
        </div>

        <span className="bg-green-color text-white-text py-4 px-12 rounded-sm font-medium text-base my-10 cursor-pointer inline-block"></span>
      </div>

      <div className="max-w-142 max-h-82.5"></div>
    </section>
  );
}

export function NewArrivalsSkeleton() {
  return (
    <div className="new-arrivals">
      <div className="col-span-2 row-span-2 max-[900px]:row-span-1 max-[670px]:col-span-1 max-[670px]:w-full max-[670px]:h-78.5">
        <div className="max-w-111.5 max-h-78.75"></div>
        <div className="absolute start-7.5 bottom-7.5  text-white-text">
          <h3 className={`font-semibold text-2xl`}></h3>
          <p className="text-sm my-2"></p>
          <span className="border-b border-white-text text-base font-medium"></span>
        </div>
      </div>
      <div className="col-span-2 max-[670px]:col-span-1 max-[670px]:w-full h-78.5">
        <div className="absolute start-7.5 bottom-7.5  text-white-text">
          <h3 className={`font-semibold text-2xl`}></h3>
          <p className="text-sm my-2"></p>
          <span className="border-b border-white-text text-base font-medium"></span>
        </div>
      </div>
      <div className="max-[900px]:col-span-2 max-[670px]:col-span-1 max-[670px]:w-full h-78.5">
        <div className="max-w-111.5 max-h-78.75"></div>
        <div className="absolute start-7.5 bottom-7.5  text-white-text">
          <h3 className={`font-semibold text-2xl`}></h3>
          <p className="text-sm my-2"></p>
          <span className="border-b border-white-text text-base font-medium"></span>
        </div>
      </div>
      <div className="max-[900px]:col-span-2 max-[670px]:col-span-1 max-[670px]:w-full h-78.5">
        <div className="max-w-111.5 max-h-78.75"></div>
        <div className="absolute start-7.5 bottom-7.5  text-white-text">
          <h3 className={`font-semibold text-2xl`}></h3>
          <p className="text-sm my-2"></p>
          <span className="border-b border-white-text text-base font-medium"></span>
        </div>
      </div>
    </div>
  );
}
