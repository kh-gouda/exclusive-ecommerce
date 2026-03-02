import GalleryImage from "@ui/product_details/GalleryImage";
import { MouseEvent } from "react";

export default function Gallery({
  gallery,
  clickHandler,
}: {
  gallery: string[];
  clickHandler: (e: MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div>
      {gallery.map((image) => (
        <div
          key={image}
          className="w-42.5 h-34.5 bg-gray-bg mb-4 flex items-center justify-center"
          data-src={image}
          onClick={clickHandler}
        >
          <GalleryImage image={image} />
        </div>
      ))}
    </div>
  );
}
