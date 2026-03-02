export default function ProductSizes({
  sizes,
  selectedSize,
  clickSize,
}: {
  sizes: string[];
  selectedSize: string;
  clickSize: (size: string) => void;
}) {
  const handleSizeClick = (size: string) => clickSize(size);

  return (
    <div className="flex items-center gap-2">
      {sizes.map((size) => (
        <div
          key={size}
          data-size={size}
          className={`p-2 border rounded-sm flex items-center justify-center cursor-pointer font-medium text-sm ${size === selectedSize ? "bg-identity text-white-color" : null}`}
          onClick={() => handleSizeClick(size)}
        >
          {size}
        </div>
      ))}
    </div>
  );
}
