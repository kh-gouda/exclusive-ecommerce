import { CATEGORY_TYPE } from "@/app/lib/typeDefinitions";
import CategoryIcon from "@ui/home/CategoryIcon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Categories({
  categories,
}: {
  categories: CATEGORY_TYPE[];
}) {
  const t = await getTranslations("subCategories");
  return (
    <div className="flex gap-6 flex-wrap my-15 justify-center">
      {categories.map((category) => (
        <Link
          href={`/sub-categories/${category.id}?categoryid=${category.categoryid}`}
          key={category.id}
          className="group w-42.5 h-36.25 rounded-sm border border-border-color flex flex-col justify-center items-center gap-4 cursor-pointer hover:bg-identity hover:text-white-text"
        >
          <CategoryIcon categoryIcon={category.icon} />
          <div className="text-base text-center">
            {t(`subcategory${category.id}`)}
          </div>
        </Link>
      ))}
    </div>
  );
}
