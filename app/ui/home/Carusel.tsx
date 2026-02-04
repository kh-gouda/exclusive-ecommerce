"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import FlashSalesTimer from "@ui/home/FlashSalesTimer";
import SectionTitle from "@ui/shared/SectionTitle";
import useEmblaCarousel from "embla-carousel-react";
import { ReactNode, useCallback } from "react";

export function Carusel({
  title,
  slides,
  flashSalesTimer,
}: {
  title: string;
  slides: ReactNode[];
  flashSalesTimer?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const goToPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const goToNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  return (
    <div className="embla">
      <div className="flex items-center justify-between">
        <SectionTitle>
          {title}
          {flashSalesTimer ? <FlashSalesTimer targetDate={flashSalesTimer} /> : null}
        </SectionTitle>
        <div className="flex items-center justify-center gap-1">
          <button
            className="embla__prev cursor-pointer w-11.5 h-11.5 bg-gray-bg rounded-full flex items-center justify-center"
            onClick={goToPrev}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <button
            className="embla__next cursor-pointer w-11.5 h-11.5 bg-gray-bg rounded-full flex items-center justify-center"
            onClick={goToNext}
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides && slides.length
            ? slides.map((slide, index) => (
                <div key={index} className="embla__slide">
                  {slide}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
