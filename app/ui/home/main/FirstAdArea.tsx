"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { FIRST_AD } from "@/app/lib/typeDefinitions";
import FirstAd from "@ui/home/main/FirstAd";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

type PropType = {
  slides: FIRST_AD[];
  options?: EmblaOptionsType;
};

export default function FirstAdArea(props: PropType) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);

  return (
    <div className="pl-10 flex-1 pt-11.25">
      <div className="w-full h-full bg-black-color ">
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {slides.map((slide) => (
                <div className="embla__slide" key={slide.productId}>
                  <FirstAd AD={slide} />
                </div>
              ))}
            </div>
          </div>

          <div className="embla__controls">
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
