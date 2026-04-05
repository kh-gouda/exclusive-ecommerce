import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      firstname: string;
      lastname: string;
      wishlist: string[]; // Array of product IDs
      cart: string[]; // Array of product IDs
      address?: {
        city?: string;
        street?: string;
        country?: string;
        building?: string;
      };
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    role: string;
    firstname: string;
    lastname: string;
    wishlist?: string[];
    cart?: string[];
    address?: {
      city?: string;
      street?: string;
      country?: string;
      building?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
    firstname: string;
    lastname: string;
    wishlist: string[];
    cart: string[];
    address?: {
      city?: string;
      street?: string;
      country?: string;
      building?: string;
    };
  }
}
