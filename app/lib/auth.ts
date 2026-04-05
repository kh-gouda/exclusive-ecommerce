import NextAuth, { Account, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import sql from "@/app/lib/db";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { SessionUpdateData } from "@/app/lib/typeDefinitions";

// Helper function to fetch wishlist products
async function fetchWishlist(userId: number): Promise<string[]> {
  try {
    const result = await sql`
      SELECT productid
      FROM wishlist
      WHERE userid = ${userId}
    `;
    return result.map((row) => row.productid.toString());
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return [];
  }
}

// Helper function to fetch cart products
async function fetchCart(userId: number): Promise<string[]> {
  try {
    const result = await sql`
      SELECT productid
      FROM shoppingcart
      WHERE userid = ${userId}
    `;
    return result.map((row) => row.productid.toString());
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
}

export const authOptions = {
  session: {
    strategy: "jwt" as const,
  },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        authenticator: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const { authenticator, password } = credentials;

        const result = await sql`
          SELECT *
          FROM users
          WHERE email = ${authenticator}
          OR phone = ${authenticator}
          LIMIT 1
        `;

        const user = result[0];

        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) return null;

        // Fetch wishlist and cart data
        const [wishlist, cart] = await Promise.all([
          fetchWishlist(user.userid),
          fetchCart(user.userid),
        ]);

        return {
          id: user.userid.toString(),
          email: user.email,
          role: user.role,
          firstname: user.firstname,
          lastname: user.lastname,
          name: `${user.firstname} ${user.lastname}`,
          wishlist: wishlist,
          cart: cart,
          address: {
            city: user.address?.city,
            street: user.address?.street,
            country: user.address?.country,
            building: user.address?.building,
          },
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: User | AdapterUser;
      account: Account | null;
    }) {
      if (account?.provider === "google") {
        const existing = await sql`
          SELECT *
          FROM users
          WHERE email = ${user.email}
          LIMIT 1
        `;

        if (!existing.length) {
          const inserted = await sql`
            INSERT INTO users (
              firstname,
              lastname,
              email,
              role
            )
            VALUES (
              ${user.name?.split(" ")[0] ?? ""},
              ${user.name?.split(" ")[1] ?? ""},
              ${user.email},
              'user'
            )
            RETURNING userid, role
          `;

          user.id = inserted[0].userid.toString();
        } else {
          user.id = existing[0].userid.toString();
          user.firstname = existing[0].firstname;
          user.lastname = existing[0].lastname;
        }

        // Fetch wishlist and cart for Google sign-in as well
        const [wishlist, cart] = await Promise.all([
          fetchWishlist(parseInt(user.id)),
          fetchCart(parseInt(user.id)),
        ]);

        // Cast user to include wishlist and cart
        (user as User & { wishlist?: string[]; cart?: string[] }).wishlist =
          wishlist;
        (user as User & { wishlist?: string[]; cart?: string[] }).cart = cart;
      }

      return true;
    },

    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: User | AdapterUser;
      trigger?: "signIn" | "update" | "signUp";
      session?: SessionUpdateData;
    }) {
      // Initial login
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.name = user.name;
        token.address = user.address;
        token.wishlist = user.wishlist || [];
        token.cart = user.cart || [];
      }

      // Handle session updates
      if (trigger === "update" && session) {
        const userId = parseInt(token.id as string);

        // Check if we should refresh specific data based on the session parameter
        const refreshType = session.refresh;

        // Fetch fresh data from database
        let wishlist = token.wishlist;
        let cart = token.cart;

        if (
          !refreshType ||
          refreshType === "all" ||
          refreshType === "wishlist"
        ) {
          wishlist = await fetchWishlist(userId);
        }

        if (!refreshType || refreshType === "all" || refreshType === "cart") {
          cart = await fetchCart(userId);
        }

        // Update user profile if needed
        if (session.user) {
          const result = await sql`
            SELECT email, firstname, lastname, address
            FROM users
            WHERE userid = ${userId}
          `;

          const updatedUser = result[0];

          if (updatedUser) {
            token.email = updatedUser.email;
            token.firstname = updatedUser.firstname;
            token.lastname = updatedUser.lastname;
            token.name = `${updatedUser.firstname} ${updatedUser.lastname}`;
            token.address = updatedUser.address;
          }
        }

        // Update token with fresh data
        token.wishlist = wishlist;
        token.cart = cart;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.firstname = token.firstname as string;
        session.user.lastname = token.lastname as string;
        session.user.wishlist = (token.wishlist as string[]) || [];
        session.user.cart = (token.cart as string[]) || [];
        session.user.address =
          token.address ||
          ({ city: "", street: "", country: "", building: "" } as {
            city: string;
            street: string;
            country: string;
            building: string;
          });
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
