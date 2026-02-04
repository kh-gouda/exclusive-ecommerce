import { PhoneIcon, TruckIcon } from "@heroicons/react/24/outline";
import { BadgeCheckIcon } from "lucide-react";

const FEATURES = [
  {
    id: 1,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
    icon: <TruckIcon className="w-10 h-10 text-white-color" />,
  },
  {
    id: 2,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
    icon: <PhoneIcon className="w-10 h-10 text-white-color" />,
  },
  {
    id: 3,
    title: "MONEY BACK GUARANTEE",
    description: "We reurn money within 30 days",
    icon: <BadgeCheckIcon className="w-10 h-10 text-white-color" />,
  },
];

export default function Features() {
  return (
    <div className="flex items-center justify-evenly pb-17.5">
      {FEATURES.map((feature) => (
        <div key={feature.id} className="text-center">
          <div className="w-20 h-20 flex justify-center items-center bg-gray-300 rounded-full mx-auto mb-6">
            <div className="w-15 h-15 flex justify-center items-center bg-[#2F2E30] rounded-full">
              {feature.icon}
            </div>
          </div>
          <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
          <p className="text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
