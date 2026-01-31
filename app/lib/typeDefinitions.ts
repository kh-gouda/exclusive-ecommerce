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
