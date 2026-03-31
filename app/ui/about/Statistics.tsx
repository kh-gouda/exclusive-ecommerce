import { inter } from "@ui/shared/fonts";
import {
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";

const STATISTICS = [
  {
    id: 1,
    total: 10.5,
    description: "Sallers active our site",
    icon: (
      <BuildingStorefrontIcon className="w-10 h-10 text-white-color group-hover:text-black-color" />
    ),
  },
  {
    id: 2,
    total: 25,
    description: "Monthly Produduct Sale",
    icon: (
      <CurrencyDollarIcon className="w-10 h-10 text-white-color group-hover:text-black-color" />
    ),
  },
  {
    id: 3,
    total: 45.5,
    description: "Customer active in our site",
    icon: (
      <Square2StackIcon className="w-10 h-10 text-white-color group-hover:text-black-color" />
    ),
  },
  {
    id: 4,
    total: 33,
    description: "Anual gross sale in our site",
    icon: (
      <CurrencyDollarIcon className="w-10 h-10 text-white-color group-hover:text-black-color" />
    ),
  },
];
export default async function Statistics() {
  const t = await getTranslations("aboutPage");

  return (
    <section className="flex items-center justify-center gap-7.5 flex-wrap ">
      {STATISTICS.map((stat) => (
        <div
          key={stat.id}
          className="group border p-4 flex flex-col items-center justify-center gap-6 hover:bg-identity hover:*:text-white-color w-66.5"
        >
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center group-hover:bg-about-area">
            <div className="w-12.5 h-12.5 rounded-full bg-black-color flex items-center justify-center group-hover:bg-white-color">
              {stat.icon}
            </div>
          </div>
          <h3 className={`${inter.className} font-bold text-[32px]`}>
            {stat.total}k
          </h3>
          <p>{t(`stat${stat.id}`)}</p>
        </div>
      ))}
    </section>
  );
}
