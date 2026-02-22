export default function ProductColors({ colors }: { colors: string[] }) {
  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <div
          key={color}
          className="w-5 h-5 rounded-full cursor-pointer"
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
  );
}
