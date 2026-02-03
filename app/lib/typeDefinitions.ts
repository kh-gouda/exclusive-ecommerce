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
  rating: {
    stars: number;
    voters: number;
  };
  colors?: string[];
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
