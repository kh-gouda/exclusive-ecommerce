import { fetchCategories } from "@/app/lib/utils";
import Link from "next/link";

export default async function SideNav() {
  const categories = await fetchCategories();
  return (
    <div className="pr-4 border-r pt-11.25 text-nowrap">
      {categories.map((category) => (
        <Link
          key={category.categoryid}
          className="text-base not-last:mb-4 block"
          href={`/categories/${category.categoryid}`}
        >
          {category.category}
        </Link>
      ))}
    </div>
  );
}
