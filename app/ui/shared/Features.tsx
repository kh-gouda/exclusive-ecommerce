import { PhoneIcon, TruckIcon } from "@heroicons/react/24/outline";
import { BadgeCheckIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

const FEATURES = [
  {
    id: 1,
    title: "feature1",
    description: "description1",
    icon: <TruckIcon className="w-10 h-10 text-white-color" />,
  },
  {
    id: 2,
    title: "feature2",
    description: "description2",
    icon: <PhoneIcon className="w-10 h-10 text-white-color" />,
  },
  {
    id: 3,
    title: "feature3",
    description: "description3",
    icon: <BadgeCheckIcon className="w-10 h-10 text-white-color" />,
  },
];

export default async function Features() {
  const t = await getTranslations("features");
  return (
    <div className="flex items-center justify-evenly pb-17.5">
      {FEATURES.map((feature) => (
        <div key={feature.id} className="text-center">
          <div className="w-20 h-20 flex justify-center items-center bg-gray-300 rounded-full mx-auto mb-6">
            <div className="w-15 h-15 flex justify-center items-center bg-[#2F2E30] rounded-full">
              {feature.icon}
            </div>
          </div>
          <h3 className="mb-2 text-xl font-semibold">{t(feature.title)}</h3>
          <p className="text-sm">{t(feature.description)}</p>
        </div>
      ))}
    </div>
  );
}
