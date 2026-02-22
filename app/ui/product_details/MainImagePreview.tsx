import Image from "next/image";

export default function MainImagePreview({ image }: { image: string }) {
  return (
    <div className="w-125 h-150 bg-gray-bg flex items-center justify-center">
      <Image
        width={446}
        height={315}
        src={`/images/products_large/${image}`}
        alt={image}
      />
    </div>
  );
}
