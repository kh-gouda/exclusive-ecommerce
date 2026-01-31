export default function DiscountLabel({ discount }: { discount: number }) {
  return (
    <span className="absolute inline-block py-1 px-3 bg-identity text-xs text-white-text top-3 left-3">
      {-discount}%
    </span>
  );
}
