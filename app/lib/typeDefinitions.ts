export type FIRST_AD = {
  productId: number;
  product: string;
  productLogo?: string;
  details?: string;
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

export type CATEGORY_TYPE = {
  id: number;
  title: string;
  icon: string;
};
export type FOOTER_LIST = {
  listHeading: string;
  listItems: string[] | { name: string; link: string }[];
};

export type NEW_ARRIVAL_TYPE = {
  collection: {
    title: string;
    description: string;
    categoryid: number;
  };
  products: {
    title: string;
    description: string;
    image: string;
    link: string;
  }[];
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

export type FETCHED_PRODUCT_CARD_TYPE = {
  flashsaleid: number;
  endtime: string;
  productid: number;
  productname: string;
  productimages: string[];
  productprice: string;
  productdiscount: number;
  voters: string;
  stars: number;
  colors?: string[];
  newproduct?: boolean;
};

export type FETCHED_CATEGORY_TYPE = {
  subcategoryid: number;
  subcategory: string;
  icon: string;
  categoryid: number;
};

export type FETCHED_BEST_SELLING_PRODUCT_TYPE = {
  productid: number;
  productname: string;
  productimages: string[];
  productprice: string;
  productdiscount: number;
  total_sold: string;
  voters: string;
  stars: number;
};

export type FETCHED_NEW_ARRIVALS_TYPE = {
  productid: number;
  productname: string;
  productdescription: string;
  productimages: string[];
};

export type FETCHED_NEW_COLLECTION_TYPE = {
  collectionid: number;
  collectiontitle: string;
  collectiondescription: string;
  categoryid: number;
};

export type FETCHED_AD_TYPE = {
  adid: number;
  adarea: number;
  adtitle: string;
  adlogo?: string;
  addetails?: string;
  adimage: string;
  productid: number;
  endtime: string;
};
