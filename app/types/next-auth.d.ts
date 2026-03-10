import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
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
    } & DefaultSession["user"];
  }

  interface User {
    email: string;
    role: string;
    firstname: string;
    lastname: string;
    address?: {
      city?: string;
      street?: string;
      country?: string;
      building?: string;
    };
  }
}
