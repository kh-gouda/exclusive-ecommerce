export default function ProductColors({
  colors,
  selectedColor,
  clickColor,
}: {
  colors: string[];
  selectedColor: string;
  clickColor: (color: string) => void;
}) {
  const handleColorClick = (color: string) => clickColor(color);

  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <div
          key={color}
          className={`w-5 h-5 rounded-full cursor-pointer ${color === selectedColor ? "outline-4 outline-gray-300" : null}`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        ></div>
      ))}
    </div>
  );
}
