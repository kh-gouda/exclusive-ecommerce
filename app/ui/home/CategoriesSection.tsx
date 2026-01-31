import SectionTitle from "@ui/shared/SectionTitle";
import SectionLabel from "@ui/shared/SectionLabel";
import {
  CameraIcon,
  ComputerDesktopIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { GamepadIcon, HeadphonesIcon, WatchIcon } from "lucide-react";

const CATEGORIES = [
  {
    id: 1,
    title: "Phones",
    icon: <PhoneIcon className="w-16.25 h-16.25 " />,
  },
  {
    id: 2,
    title: "Computers",
    icon: <ComputerDesktopIcon className="w-16.25 h-16.25 " />,
  },
  {
    id: 3,
    title: "SmartWatch",
    icon: <WatchIcon className="w-16.25 h-16.25 " />,
  },
  {
    id: 4,
    title: "Camera",
    icon: <CameraIcon className="w-16.25 h-16.25 " />,
  },
  {
    id: 5,
    title: "HeadPhones",
    icon: <HeadphonesIcon className="w-16.25 h-16.25 " />,
  },
  {
    id: 6,
    title: "Gaming",
    icon: <GamepadIcon className="w-16.25 h-16.25 " />,
  },
];
export default function CategoriesSection() {
  return (
    <section className="py-12.5">
      <SectionLabel>Categories</SectionLabel>
      <SectionTitle>Browse By Category</SectionTitle>
      <div className="flex gap-7.5 flex-wrap my-15">
        {CATEGORIES.map((category) => (
          <div
            key={category.id}
            className="w-42.5 h-36.25 rounded-sm border border-border-color flex flex-col justify-center items-center gap-4 cursor-pointer hover:bg-identity"
          >
            {category.icon}
            <div className="text-base">{category.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
