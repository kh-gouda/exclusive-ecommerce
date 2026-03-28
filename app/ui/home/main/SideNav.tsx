import { fetchCategories } from "@/app/lib/utils";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";

export default async function SideNav() {
  const t = await getTranslations("categories");
  const fallbackArray = Array(9).map((_, index) => (
    <div key={index} className="shadow mb-4 block"></div>
  ));
  const categories = await fetchCategories();
  return (
    <div className="pe-4 border-e pt-11.25 text-nowrap">
      <Suspense fallback={fallbackArray}>
        {categories.map((category) => (
          <Link
            key={category.categoryid}
            className="text-base not-last:mb-4 block"
            href={`/categories/${category.categoryid}`}
          >
            {t(`category${category.categoryid}`)}
          </Link>
        ))}
      </Suspense>
    </div>
  );
}
