export default function ProductColor({ color }: { color: string }) {
  const style = { backgroundColor: color };
  return (
    <span
      className={`w-3.75 h-3.75 rounded-full mr-1 inline-block first:border`}
      style={style}
    ></span>
  );
}
