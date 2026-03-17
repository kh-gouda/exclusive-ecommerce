import { fetchCategories } from "@/app/lib/utils";
import Link from "next/link";

// const categories = [
//   { title: "Woman's Fashion", link: "/category/womans-fashion" },
//   { title: "Men's Fashion", link: "/category/mens-fashion" },
//   { title: "Electronics", link: "/category/electronics" },
//   { title: "Home & Lifestyle", link: "/category/home-lifestyle" },
//   { title: "Medicine", link: "/category/medicine" },
//   { title: "Sports & Outdoor", link: "/category/sports-outdoor" },
//   { title: "Baby's & Toys", link: "/category/baby-toys" },
//   { title: "Groceries & Pets", link: "/category/groceries-pets" },
//   { title: "Health & Beauty", link: "/category/health-beauty" },
// ];

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
