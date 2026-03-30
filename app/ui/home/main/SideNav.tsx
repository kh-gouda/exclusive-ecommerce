import { fetchCategories } from "@/app/lib/utils";
import SideNavLinks from "@ui/home/main/SideNavLinks";
import { Suspense } from "react";

export default async function SideNav() {
  const fallbackArray = Array(9).map((_, index) => (
    <div key={index} className="shadow mb-4 block"></div>
  ));
  const categories = await fetchCategories();

  return (
    <Suspense fallback={fallbackArray}>
      <SideNavLinks categories={categories} />
    </Suspense>
  );
}
