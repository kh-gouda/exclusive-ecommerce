import {
  CART_TYPE,
  CATEGORY_TYPE,
  FIRST_AD,
  NEW_ARRIVAL_TYPE,
  PRODUCT_DETAILS_Type,
  ProductCardType,
} from "@/app/lib/typeDefinitions";

export const CATEGORIES: CATEGORY_TYPE[] = [
  {
    id: 1,
    title: "Phones",
    icon: "Category-CellPhone_cnog2x",
    categoryid: 2,
  },
  {
    id: 2,
    title: "Computers",
    icon: "Category-Computer_ugrrnb",
    categoryid: 2,
  },
  {
    id: 3,
    title: "SmartWatch",
    icon: "Category-SmartWatch_orvmqt",
    categoryid: 2,
  },
  {
    id: 4,
    title: "Camera",
    icon: "Category-Camera_ao1jhm",
    categoryid: 2,
  },
  {
    id: 5,
    title: "HeadPhones",
    icon: "Category-Headphone_giwx9d",
    categoryid: 2,
  },
  {
    id: 6,
    title: "Gaming",
    icon: "Category-Gamepad_dzdvtv",
    categoryid: 2,
  },
  {
    id: 7,
    title: "Phones",
    icon: "Category-CellPhone_cnog2x",
    categoryid: 2,
  },
  {
    id: 8,
    title: "Computers",
    icon: "Category-Computer_ugrrnb",
    categoryid: 2,
  },
  {
    id: 9,
    title: "SmartWatch",
    icon: "Category-SmartWatch_orvmqt",
    categoryid: 2,
  },
  {
    id: 10,
    title: "Camera",
    icon: "Category-Camera_ao1jhm",
    categoryid: 2,
  },
  {
    id: 11,
    title: "HeadPhones",
    icon: "Category-Headphone_giwx9d",
    categoryid: 2,
  },
  {
    id: 12,
    title: "Gaming",
    icon: "Category-Gamepad_dzdvtv",
    categoryid: 2,
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
    categoryid: 3,
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

export const WISHLIST_PRODUCTS: ProductCardType[] = [
  {
    productID: 2,
    productTitle: "Gucci duffle bag",
    productImage: "/images/products_small/Gucci_duffle_bag_0.webp",
    price: 1160,
    discount: 40,
  },
  {
    productID: 3,
    productTitle: "RGB liquid CPU Cooler",
    productImage: "/images/products_small/RGB_liquid_CPU_Cooler_0.webp",
    price: 170,
    discount: 0,
  },
  {
    productID: 7,
    productTitle: "GP11 Shooter USB Gamepad",
    productImage: "/images/products_small/GP11_Shooter_USB_Gamepad_0.webp",
    price: 660,
    discount: 0,
  },
  {
    productID: 8,
    productTitle: "Quilted Satin Jacket",
    productImage: "/images/products_small/Quilted_Satin_Jacket_0.webp",
    price: 660,
    discount: 0,
  },
];

export const JUST_FOR_YOU_PRODUCTS: ProductCardType[] = [
  {
    productID: 4,
    productTitle: "ASUS FHD Gaming Laptop",
    productImage: "/images/products_small/ASUS_FHD_Gaming_Laptop_0.webp",
    price: 700,
    discount: 35,
    rating: {
      stars: 5,
      voters: 325,
    },
  },
  {
    productID: 3,
    productTitle: "IPS LCD Gaming Monitor",
    productImage: "/images/products_small/IPS_LCD_Gaming_Monitor_0.webp",
    price: 400,
    discount: 0,
    rating: {
      stars: 5,
      voters: 99,
    },
  },
  {
    productID: 1,
    productTitle: "HAVIT HV-G92 Gamepad",
    productImage: "/images/products_small/HAVIT_HV-G92_Gamepad_0.webp",
    price: 160,
    discount: 0,
    rating: {
      stars: 5,
      voters: 88,
    },
    new: true,
  },
  {
    productID: 2,
    productTitle: "AK-900 Wired Keyboard",
    productImage: "/images/products_small/AK-900_Wired_Keyboard_0.webp",
    price: 1160,
    discount: 0,
    rating: {
      stars: 4,
      voters: 75,
    },
  },
];

export const CART_DATA: CART_TYPE[] = [
  {
    id: 1,
    title: "LCD Monitor",
    image: "/images/products_small/IPS_LCD_Gaming_Monitor_0.webp",
    price: 650,
    quantity: 1,
    subtotal: 560,
  },
  {
    id: 2,
    title: "H1 Gamepad",
    image: "/images/products_small/HAVIT_HV-G92_Gamepad_0.webp",
    price: 550,
    quantity: 2,
    subtotal: 1100,
  },
];

export const STAFF = [
  {
    id: 1,
    name: "Tom Cruise",
    image: "/images/Tom_Cruise.webp",
    jobTitle: "Founder & Chairman",
    twitterLink: "https://www.linkedin.com/in/kh-gouda/",
    instagramLink: "https://www.linkedin.com/in/kh-gouda/",
    linkedinLink: "https://www.linkedin.com/in/kh-gouda/",
  },
  {
    id: 2,
    name: "Emma Watson",
    image: "/images/Emma_Watson.webp",
    jobTitle: "Managing Director",
    twitterLink: "https://www.linkedin.com/in/kh-gouda/",
    instagramLink: "https://www.linkedin.com/in/kh-gouda/",
    linkedinLink: "https://www.linkedin.com/in/kh-gouda/",
  },
  {
    id: 3,
    name: "Will Smith",
    image: "/images/Will_Smith.webp",
    jobTitle: "Product Designer",
    twitterLink: "https://www.linkedin.com/in/kh-gouda/",
    instagramLink: "https://www.linkedin.com/in/kh-gouda/",
    linkedinLink: "https://www.linkedin.com/in/kh-gouda/",
  },
  {
    id: 4,
    name: "Tom Cruise",
    image: "/images/Tom_Cruise.webp",
    jobTitle: "Founder & Chairman",
    twitterLink: "https://www.linkedin.com/in/kh-gouda/",
    instagramLink: "https://www.linkedin.com/in/kh-gouda/",
    linkedinLink: "https://www.linkedin.com/in/kh-gouda/",
  },
  {
    id: 5,
    name: "Emma Watson",
    image: "/images/Emma_Watson.webp",
    jobTitle: "Managing Director",
    twitterLink: "https://www.linkedin.com/in/kh-gouda/",
    instagramLink: "https://www.linkedin.com/in/kh-gouda/",
    linkedinLink: "https://www.linkedin.com/in/kh-gouda/",
  },
  {
    id: 6,
    name: "Will Smith",
    image: "/images/Will_Smith.webp",
    jobTitle: "Product Designer",
    twitterLink: "https://www.linkedin.com/in/kh-gouda/",
    instagramLink: "https://www.linkedin.com/in/kh-gouda/",
    linkedinLink: "https://www.linkedin.com/in/kh-gouda/",
  },
  {
    id: 7,
    name: "Tom Cruise",
    image: "/images/Tom_Cruise.webp",
    jobTitle: "Founder & Chairman",
    twitterLink: "https://www.linkedin.com/in/kh-gouda/",
    instagramLink: "https://www.linkedin.com/in/kh-gouda/",
    linkedinLink: "https://www.linkedin.com/in/kh-gouda/",
  },
  {
    id: 8,
    name: "Emma Watson",
    image: "/images/Emma_Watson.webp",
    jobTitle: "Managing Director",
    twitterLink: "https://www.linkedin.com/in/kh-gouda/",
    instagramLink: "https://www.linkedin.com/in/kh-gouda/",
    linkedinLink: "https://www.linkedin.com/in/kh-gouda/",
  },
  {
    id: 9,
    name: "Will Smith",
    image: "/images/Will_Smith.webp",
    jobTitle: "Product Designer",
    twitterLink: "https://www.linkedin.com/in/kh-gouda/",
    instagramLink: "https://www.linkedin.com/in/kh-gouda/",
    linkedinLink: "https://www.linkedin.com/in/kh-gouda/",
  },
];

export const PRODUCT_DETAILS_DATA: PRODUCT_DETAILS_Type = {
  productId: 1,
  productName: "Havic HV G-92 Gamepad",
  productDescription:
    "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
  productPrice: 192,
  productImages: [
    "Havic_HV_G-92_Gamepad_0.webp",
    "Havic_HV_G-92_Gamepad_1.webp",
    "Havic_HV_G-92_Gamepad_2.webp",
    "Havic_HV_G-92_Gamepad_3.webp",
    "Havic_HV_G-92_Gamepad_4.webp",
  ],
  productRating: {
    voters: 150,
    stars: 4,
  },
  stock: [
    { color: "#A0BCE0", size: "S", quantity: 10 },
    { color: "#A0BCE0", size: "M", quantity: 15 },
    { color: "#A0BCE0", size: "L", quantity: 8 },
    { color: "#E07575", size: "M", quantity: 15 },
    { color: "#E07575", size: "L", quantity: 12 },
    { color: "#E07575", size: "XL", quantity: 20 },
  ],
};
