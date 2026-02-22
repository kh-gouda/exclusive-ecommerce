import { ReactNode } from "react";

export type FIRST_AD = {
  productId: number;
  product: string;
  productLogo: string;
  details: string;
  link: string;
  imageSrc: string;
};
export type ProductCardType = {
  productID: number;
  productTitle: string;
  productImage: string;
  price: number;
  discount: number;
  rating?: {
    stars: number;
    voters: number;
  };
  colors?: string[];
  new?: boolean;
};

export type CATEGRY_TYPE = {
  id: number;
  title: string;
  icon: ReactNode;
};
export type FOOTER_LIST = {
  listHeading: string;
  listItems: string[] | { name: string; link: string }[];
};

export type NEW_ARRIVAL_TYPE = {
  collection: {
    title: string;
    description: string;
    link: string;
  };
  products: [
    {
      title: string;
      description: string;
      image: string;
      link: string;
    },
    {
      title: string;
      description: string;
      image: string;
      link: string;
    },
    {
      title: string;
      description: string;
      image: string;
      link: string;
    },
  ];
};

export type CART_TYPE = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type STAFF_TYPE = {
  id: number;
  name: string;
  image: string;
  jobTitle: string;
  twitterLink: string;
  instagramLink: string;
  linkedinLink: string;
};

export type PRODUCT_DETAILS_Type = {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImages: string[];
  productRating: {
    voters: number;
    stars: number;
  };
  colors: string[];
  sizes: string[];
  stock: boolean;
};
