import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import sql from "@/app/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        authenticator: {},
        password: {},
      },

      async authorize(credentials) {
        const authenticator = credentials?.authenticator as string;

        const password = credentials?.password as string;

        if (!authenticator || !password) return null;

        const result = await sql`
          SELECT 
            userid,
            firstname,
            lastname,
            email,
            phone,
            password,
            role
          FROM users
          WHERE email = ${authenticator} OR phone = ${authenticator}
          LIMIT 1
        `;

        const user = result[0];

        if (!user || !user.password) return null;

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return null;

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

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // GOOGLE LOGIN
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
            RETURNING id, role
          `;

          user.id = inserted[0].id.toString();

          user.role = inserted[0].role;
        } else {
          user.id = existing[0].id.toString();

          user.role = existing[0].role;
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;

      session.user.role = token.role as string;

      session.user.firstname = token.firstname as string;

      session.user.lastname = token.lastname as string;

      return session;
    },
  },
});
