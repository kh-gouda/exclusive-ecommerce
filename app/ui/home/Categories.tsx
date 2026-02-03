import { CATEGRY_TYPE } from "@/app/lib/typeDefinitions";

export default function Categories({
  categories,
}: {
  categories: CATEGRY_TYPE[];
}) {
  return (
    <div className="flex gap-7.5 flex-wrap my-15">
      {categories.map((category) => (
        <div
          key={category.id}
          className="w-42.5 h-36.25 rounded-sm border border-border-color flex flex-col justify-center items-center gap-4 cursor-pointer hover:bg-identity"
        >
          {category.icon}
          <div className="text-base">{category.title}</div>
        </div>
      ))}
    </div>
  );
}
