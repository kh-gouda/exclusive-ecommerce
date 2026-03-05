import NextAuth, { Account, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcryptjs";
import sql from "@/app/lib/db";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

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

        return {
          id: user.userid.toString(),
          email: user.email,
          role: user.role,
          firstname: user.firstname,
          lastname: user.lastname,
          name: `${user.firstname} ${user.lastname}`,
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
        }
      }

      return true;
    },

    async jwt({ token, user }: { token: JWT; user: User | AdapterUser }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;

        session.user.role = token.role as string;

        session.user.firstname = token.firstname as string;

        session.user.lastname = token.lastname as string;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
