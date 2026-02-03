import { inter } from "@ui/shared/fonts";
import Image from "next/image";

export default function SecondAdArea() {
  return (
    <section className="bg-black-color p-12.5 flex items-center gap-5 my-25">
      <div className="flex-1 text-white-text">
        <div className="text-base font-semibold text-green-color">
          Categories
        </div>
        <h2
          className={`${inter.className} font-semibold text-white-text text-5xl my-8`}
        >
          <p>Enhance Your</p>
          <p>Music Experience</p>
        </h2>
        <div className="flex gap-5">
          <div className="time">
            <span className="text-base font-semibold">23</span>
            <span className="text-xs">Hours</span>
          </div>
          <div className="time">
            <span className="text-base font-semibold">05</span>
            <span className="text-xs">Days</span>
          </div>
          <div className="time">
            <span className="text-base font-semibold">59</span>
            <span className="text-xs">Minutes</span>
          </div>
          <div className="time">
            <span className="text-base font-semibold">35</span>
            <span className="text-xs">Seconds</span>
          </div>
        </div>
        <button className="bg-green-color text-white-text py-4 px-12 rounded-sm font-medium text-base my-10 cursor-pointer">
          Buy Now
        </button>
      </div>
      <Image
        width={568}
        height={330}
        src="/images/jbl_speakers.webp"
        alt="jbl speakers"
        className="bg-white-color inset-shadow-custome rotate-y-180"
      />
    </section>
  );
}
