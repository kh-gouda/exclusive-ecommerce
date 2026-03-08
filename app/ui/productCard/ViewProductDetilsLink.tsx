import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function VieProductDetailsLink({ id }: { id: number }) {
  return (
    <Link
      href={`/products/${id}`}
      className="w-8 5 h-8 5 rounded-full bg-white-color flex items-center justify-center mt-2"
    >
      <EyeIcon className="w-5 h-5" />
    </Link>
  );
}
