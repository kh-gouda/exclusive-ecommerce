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
  categoryid: number;
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

export type COUPON_TYPE = {
  couponid: number;
  coupon: string;
  coupondiscount: number;
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
  stock: { color: string; size: string; quantity: number }[];
};

export type FETCHED_PRODUCT_CARD_TYPE = {
  flashsaleid?: number;
  endtime?: string;
  productid: number;
  productname: string;
  productimages: string[];
  productprice: string;
  productdiscount: number;
  voters: string;
  stars: number;
  colors?: string[];
  newproduct?: boolean;
  categoryid?: number;
  quantity?: number;
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

export type FETCHED_PRODUCT_BY_ID_TYPE = {
  productid: number;
  productname: string;
  productdescription: string;
  productimages: string[];
  productprice: string;
  productdiscount: number;
  newproduct: boolean;
  categoryid: number;
  voters: string;
  stars: number;
  stock: {
    size: string;
    color: string;
    quantity: number;
  }[];
  editable: boolean;
};

export type FETCHED_DASHBOARD_PRODUCT_BY_ID_TYPE = {
  productid: number;
  productname: string;
  productdescription: string;
  productimages: string[];
  productprice: string;
  productdiscount: number;
  newproduct: boolean;
  editable: boolean;
  categoryid: number;
  subcategoryid: number;
  stock: {
    stockid: number;
    size: string;
    color: string;
    sizeid: number;
    colorid: number;
    quantity: number;
  }[];
};

export type FETCHED_STAFF_TYPE = {
  id: number;
  name: string;
  image: string;
  jobtitle: string;
  sociallinks: {
    twitterLink: string;
    instagramLink: string;
    linkedinLink: string;
  };
};

export type FETCHED_ORDER_TYPE = {
  orderid: number;
  userid: number;
  phone: string;
  orderstatus: string;
  orderdate: Date;
  paymentmethod: string;
  appliedcoupon: string;
  appliedcoupondiscount: number;
  orderpaid: boolean;
  orderconfirmed: boolean;
  orderitems: {
    productid: number;
    quantity: number;
    unit_price: number;
    productname: string;
    productimages: string[];
  }[];
};

export type ORDER_DETAILS_TYPE = {
  orderid: number;
  userid: number;
  orderstatus: string;
  orderdate: Date;
  paymentmethod: string;
  appliedcoupon: string;
  appliedcoupondiscount: number;
  orderpaid: boolean;
  orderconfirmed: boolean;
  orderitems: {
    productid: number;
    quantity: number;
    unit_price: number;
    productname: string;
    productimages: string[];
  }[];
  userData: {
    name: string;
    email: string;
    phone: string;
    image?: string;
    id: string;
    role: string;
    firstname: string;
    lastname: string;
    address?: {
      city?: string;
      street?: string;
      country?: string;
      building?: string;
    };
  };
};

export type FETCHED_USER_ORDERS = {
  orderid: number;
  userid: number;
  orderstatus: string;
  orderdate: string;
  paymentmethod: string;
  appliedcoupon: string;
  appliedcoupondiscount: number;
  orderpaid: boolean;
  orderconfirmed: boolean;
  totalamount: string;
  stripe_session_id: string;
  stripe_session_expires_at: string;
};

export type NEW_PRODUCT_TYPE = {
  name: string;
  description: string;
  price: number;
  discount: number;
  category: number;
  subCategory: number;
  stock: {
    stockId: string;
    sizeid: number;
    colorid: number;
    colorHex: string;
    quantity: number;
  }[];
  images: string[];
};
