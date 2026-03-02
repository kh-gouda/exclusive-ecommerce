import { CATEGORY_TYPE } from "@/app/lib/typeDefinitions";
import CategoryIcon from "@ui/home/CategoryIcon";
import Link from "next/link";

export default function Categories({
  categories,
}: {
  categories: CATEGORY_TYPE[];
}) {
  return (
    <div className="flex gap-7.5 flex-wrap my-15">
      {categories.map((category) => (
        <Link
          href={`/sub-categories/${category.id}?categoryid=${category.categoryid}`}
          key={category.id}
          className="group w-42.5 h-36.25 rounded-sm border border-border-color flex flex-col justify-center items-center gap-4 cursor-pointer hover:bg-identity hover:text-white-text"
        >
          <CategoryIcon categoryIcon={category.icon} />
          <div className="text-base text-center">{category.title}</div>
        </Link>
      ))}
    </div>
  );
}
