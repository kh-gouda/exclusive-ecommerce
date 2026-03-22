import { fetchCategories } from "@/app/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default async function SideNav() {
  const fallbackArray = Array(9).map((_, index) => (
    <div key={index} className="shadow mb-4 block"></div>
  ));
  const categories = await fetchCategories();
  return (
    <div className="pr-4 border-r pt-11.25 text-nowrap">
      <Suspense fallback={fallbackArray}>
        {categories.map((category) => (
          <Link
            key={category.categoryid}
            className="text-base not-last:mb-4 block"
            href={`/categories/${category.categoryid}`}
          >
            {category.category}
          </Link>
        ))}
      </Suspense>
    </div>
  );
}
