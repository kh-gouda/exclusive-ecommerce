"use client";
import Gallery from "@ui/product_details/Gallery";
import MainImagePreview from "@ui/product_details/MainImagePreview";
import { MouseEvent, useState } from "react";

export default function ImagesPreview({ images }: { images: string[] }) {
  const [mainPreviewImage, setMainPreviewImage] = useState(images[0]);
  const gallery = images.filter((image) => image !== mainPreviewImage);

  const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
    const clickedElement = e.currentTarget as HTMLElement;
    setMainPreviewImage(clickedElement.dataset.src || images[0]);
  };

  return (
    <div className="flex gap-7.5 max-[1240px]:justify-center max-[800px]:flex-col max-[800px]:items-center max-wfull">
      <Gallery gallery={gallery} clickHandler={handleImageClick} />
      <MainImagePreview image={mainPreviewImage} />
    </div>
  );
}
