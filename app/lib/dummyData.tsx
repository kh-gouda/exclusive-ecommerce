import {
  CATEGRY_TYPE,
  FIRST_AD,
  NEW_ARRIVAL_TYPE,
  ProductCardType,
} from "@/app/lib/typeDefinitions";

import {
  CameraIcon,
  ComputerDesktopIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { GamepadIcon, HeadphonesIcon, WatchIcon } from "lucide-react";

export const CATEGORIES: CATEGRY_TYPE[] = [
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
  {
    id: 7,
    title: "Phones",
    icon: <PhoneIcon className="w-16.25 h-16.25 " />,
  },
  {
    id: 8,
    title: "Computers",
    icon: <ComputerDesktopIcon className="w-16.25 h-16.25 " />,
  },
  {
    id: 9,
    title: "SmartWatch",
    icon: <WatchIcon className="w-16.25 h-16.25 " />,
  },
  {
    id: 10,
    title: "Camera",
    icon: <CameraIcon className="w-16.25 h-16.25 " />,
  },
  {
    id: 11,
    title: "HeadPhones",
    icon: <HeadphonesIcon className="w-16.25 h-16.25 " />,
  },
  {
    id: 12,
    title: "Gaming",
    icon: <GamepadIcon className="w-16.25 h-16.25 " />,
  },
];

export const FIRST_AD_AREA_LIST: FIRST_AD[] = [
  {
    productId: 1,
    product: "iPhone 14 Series",
    productLogo: "/images/apple_logo.webp",
    details: "Up to 10% off Voucher",
    link: "/shop",
    imageSrc: "/images/iphone_14_series.webp",
  },
  {
    productId: 2,
    product: "iPhone 14 Series",
    productLogo: "/images/apple_logo.webp",
    details: "Up to 10% off Voucher",
    link: "/shop",
    imageSrc: "/images/iphone_14_series.webp",
  },
  {
    productId: 3,
    product: "iPhone 14 Series",
    productLogo: "/images/apple_logo.webp",
    details: "Up to 10% off Voucher",
    link: "/shop",
    imageSrc: "/images/iphone_14_series.webp",
  },
];

export const FLASH_SALES_PRODUCTS: ProductCardType[] = [
  {
    productID: 1,
    productTitle: "HAVIT HV-G92 Gamepad",
    productImage: "/images/products_small/HAVIT_HV-G92_Gamepad_0.webp",
    price: 160,
    discount: 40,
    rating: {
      stars: 5,
      voters: 88,
    },
  },
  {
    productID: 2,
    productTitle: "AK-900 Wired Keyboard",
    productImage: "/images/products_small/AK-900_Wired_Keyboard_0.webp",
    price: 1160,
    discount: 35,
    rating: {
      stars: 4,
      voters: 75,
    },
  },
  {
    productID: 3,
    productTitle: "IPS LCD Gaming Monitor",
    productImage: "/images/products_small/IPS_LCD_Gaming_Monitor_0.webp",
    price: 400,
    discount: 30,
    rating: {
      stars: 5,
      voters: 99,
    },
  },
  {
    productID: 4,
    productTitle: "S-Series Comfort Chair",
    productImage: "/images/products_small/S-Series_Comfort_Chair_0.webp",
    price: 400,
    discount: 25,
    rating: {
      stars: 4,
      voters: 99,
    },
  },
  {
    productID: 5,
    productTitle: "HAVIT HV-G92 Gamepad",
    productImage: "/images/products_small/HAVIT_HV-G92_Gamepad_0.webp",
    price: 160,
    discount: 40,
    rating: {
      stars: 5,
      voters: 88,
    },
  },
  {
    productID: 6,
    productTitle: "AK-900 Wired Keyboard",
    productImage: "/images/products_small/AK-900_Wired_Keyboard_0.webp",
    price: 1160,
    discount: 35,
    rating: {
      stars: 4,
      voters: 75,
    },
  },
  {
    productID: 7,
    productTitle: "IPS LCD Gaming Monitor",
    productImage: "/images/products_small/IPS_LCD_Gaming_Monitor_0.webp",
    price: 400,
    discount: 30,
    rating: {
      stars: 5,
      voters: 99,
    },
  },
  {
    productID: 8,
    productTitle: "S-Series Comfort Chair",
    productImage: "/images/products_small/S-Series_Comfort_Chair_0.webp",
    price: 400,
    discount: 25,
    rating: {
      stars: 4,
      voters: 99,
    },
  },
];

export const BEST_SELLING_PRODUCTS: ProductCardType[] = [
  {
    productID: 1,
    productTitle: "The north coat",
    productImage: "/images/products_small/The_north_coat_0.webp",
    price: 360,
    discount: 18,
    rating: {
      stars: 5,
      voters: 65,
    },
  },
  {
    productID: 2,
    productTitle: "Gucci duffle bag",
    productImage: "/images/products_small/Gucci_duffle_bag_0.webp",
    price: 1160,
    discount: 40,
    rating: {
      stars: 4,
      voters: 65,
    },
  },
  {
    productID: 3,
    productTitle: "RGB liquid CPU Cooler",
    productImage: "/images/products_small/RGB_liquid_CPU_Cooler_0.webp",
    price: 170,
    discount: 6,
    rating: {
      stars: 4,
      voters: 65,
    },
  },
  {
    productID: 4,
    productTitle: "Small BookSelf",
    productImage: "/images/products_small/Small_BookSelf_0.webp",
    price: 360,
    discount: 0,
    rating: {
      stars: 5,
      voters: 65,
    },
  },
];

export const EXPLORE_PRODUCTS: ProductCardType[] = [
  {
    productID: 1,
    productTitle: "Breed Dry Dog Food",
    productImage: "/images/products_small/Breed_Dry_Dog_Food_0.webp",
    price: 100,
    discount: 0,
    rating: {
      stars: 3,
      voters: 35,
    },
  },
  {
    productID: 2,
    productTitle: "CANON EOS DSLR Camera",
    productImage: "/images/products_small/CANON_EOS_DSLR_Camera_0.webp",
    price: 360,
    discount: 0,
    rating: {
      stars: 4,
      voters: 95,
    },
  },
  {
    productID: 3,
    productTitle: "ASUS FHD Gaming Laptop",
    productImage: "/images/products_small/ASUS_FHD_Gaming_Laptop_0.webp",
    price: 700,
    discount: 0,
    rating: {
      stars: 5,
      voters: 325,
    },
  },
  {
    productID: 4,
    productTitle: "Curology Product Set",
    productImage: "/images/products_small/Curology_Product_Set_0.webp",
    price: 500,
    discount: 0,
    rating: {
      stars: 4,
      voters: 145,
    },
  },
  {
    productID: 5,
    productTitle: "Kids Electric Car",
    productImage: "/images/products_small/Kids_Electric_Car_0.webp",
    price: 960,
    discount: 0,
    rating: {
      stars: 5,
      voters: 65,
    },
    colors: ["#FB1314", "#DB4444"],
    new: true,
  },
  {
    productID: 6,
    productTitle: "Jr. Zoom Soccer Cleats",
    productImage: "/images/products_small/Jr._Zoom_Soccer_Cleats_0.webp",
    price: 1160,
    discount: 0,
    rating: {
      stars: 5,
      voters: 35,
    },
    colors: ["#EEFF61", "#DB4444"],
  },
  {
    productID: 7,
    productTitle: "GP11 Shooter USB Gamepad",
    productImage: "/images/products_small/GP11_Shooter_USB_Gamepad_0.webp",
    price: 660,
    discount: 0,
    rating: {
      stars: 4,
      voters: 65,
    },
    colors: ["#000", "#DB4444"],
    new: true,
  },
  {
    productID: 8,
    productTitle: "Quilted Satin Jacket",
    productImage: "/images/products_small/Quilted_Satin_Jacket_0.webp",
    price: 660,
    discount: 0,
    rating: {
      stars: 4,
      voters: 55,
    },
    colors: ["#184A48", "#DB4444"],
  },
  {
    productID: 9,
    productTitle: "Breed Dry Dog Food",
    productImage: "/images/products_small/Breed_Dry_Dog_Food_0.webp",
    price: 100,
    discount: 0,
    rating: {
      stars: 3,
      voters: 35,
    },
  },
  {
    productID: 10,
    productTitle: "CANON EOS DSLR Camera",
    productImage: "/images/products_small/CANON_EOS_DSLR_Camera_0.webp",
    price: 360,
    discount: 0,
    rating: {
      stars: 4,
      voters: 95,
    },
  },
  {
    productID: 11,
    productTitle: "ASUS FHD Gaming Laptop",
    productImage: "/images/products_small/ASUS_FHD_Gaming_Laptop_0.webp",
    price: 700,
    discount: 0,
    rating: {
      stars: 5,
      voters: 325,
    },
  },
  {
    productID: 12,
    productTitle: "Curology Product Set",
    productImage: "/images/products_small/Curology_Product_Set_0.webp",
    price: 500,
    discount: 0,
    rating: {
      stars: 4,
      voters: 145,
    },
  },
  {
    productID: 13,
    productTitle: "Kids Electric Car",
    productImage: "/images/products_small/Kids_Electric_Car_0.webp",
    price: 960,
    discount: 0,
    rating: {
      stars: 5,
      voters: 65,
    },
    colors: ["#FB1314", "#DB4444"],
    new: true,
  },
  {
    productID: 14,
    productTitle: "Jr. Zoom Soccer Cleats",
    productImage: "/images/products_small/Jr._Zoom_Soccer_Cleats_0.webp",
    price: 1160,
    discount: 0,
    rating: {
      stars: 5,
      voters: 35,
    },
    colors: ["#EEFF61", "#DB4444"],
  },
  {
    productID: 15,
    productTitle: "GP11 Shooter USB Gamepad",
    productImage: "/images/products_small/GP11_Shooter_USB_Gamepad_0.webp",
    price: 660,
    discount: 0,
    rating: {
      stars: 4,
      voters: 65,
    },
    colors: ["#000", "#DB4444"],
    new: true,
  },
  {
    productID: 16,
    productTitle: "Quilted Satin Jacket",
    productImage: "/images/products_small/Quilted_Satin_Jacket_0.webp",
    price: 660,
    discount: 0,
    rating: {
      stars: 4,
      voters: 55,
    },
    colors: ["#184A48", "#DB4444"],
  },
];

export const NEW_ARRIVAL_DATA: NEW_ARRIVAL_TYPE = {
  collection: {
    title: "Women's Collections",
    description: "Featured woman collections that give you another vibe.",
    link: "shop",
  },
  products: [
    {
      title: "PlayStation 5",
      description: "Black and White version of the PS5 coming out on sale.",
      image: "/images/products_large/PlayStation_5_0.webp",
      link: "shop",
    },
    {
      title: "Speakers",
      description: "Amazon wireless speakers",
      image: "/images/products_large/speakers_0.webp",
      link: "shop",
    },
    {
      title: "Perfume",
      description: "GUCCI INTENSE OUD EDP",
      image: "/images/products_large/perfume_0.webp",
      link: "shop",
    },
  ],
};
