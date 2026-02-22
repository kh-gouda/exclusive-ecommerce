"use client";
import { MouseEvent, useState } from "react";

export default function ProductSizes({ sizes }: { sizes: string[] }) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const handleSizeClick = (e: MouseEvent<HTMLDivElement>) => {
    const clickedElement = e.currentTarget as HTMLElement;
    setSelectedSize(clickedElement.dataset.size || sizes[0]);
  };

  return (
    <div className="flex items-center gap-2">
      {sizes.map((size) => (
        <div
          key={size}
          data-size={size}
          className={`w-8 h-8 border rounded-sm flex items-center justify-center cursor-pointer font-medium text-sm ${size === selectedSize ? "bg-identity text-white-color" : null}`}
          onClick={handleSizeClick}
        >
          {size}
        </div>
      ))}
    </div>
  );
}
