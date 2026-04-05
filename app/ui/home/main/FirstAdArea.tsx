"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { FIRST_AD } from "@/app/lib/typeDefinitions";
import FirstAd from "@ui/home/main/FirstAd";
import Autoplay from "embla-carousel-autoplay";
import { Suspense, useEffect } from "react";
import { FirstAdSkeleton } from "@ui/skeletons/home/skeletons";

type PropType = {
  slides: FIRST_AD[];
  options?: EmblaOptionsType;
};

export default function FirstAdArea(props: PropType) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 2800, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);

  return (
    <div className="ps-10 flex-1 pt-11.25 max-[805px]:ps-0 max-w-full">
      <div className="w-full h-full bg-black-color ">
        <div className="embla">
          <div className="embla__viewport [direction:ltr]" ref={emblaRef}>
            <div className="embla__container">
              {slides.map((slide) => (
                <div className="embla__slide" key={slide.productId}>
                  <Suspense fallback={<FirstAdSkeleton />}>
                    <FirstAd AD={slide} />
                  </Suspense>
                </div>
              ))}
            </div>
          </div>

          <div className="embla__controls [direction:ltr]">
            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={"embla__dot".concat(
                    index === selectedIndex ? " embla__dot--selected" : "",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
