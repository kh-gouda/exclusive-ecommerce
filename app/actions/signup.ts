"use server";

import bcrypt from "bcryptjs";
import sql from "@/app/lib/db";

type SignupData = {
  firstname: string;
  lastname: string;
  authenticator: string;
  password: string;
};

export async function signup(data: SignupData) {
  const { firstname, lastname, authenticator, password } = data;

  if (!firstname || !lastname || !authenticator || !password) {
    throw new Error("Missing fields");
  }

  const isEmail = authenticator.includes("@");

  const hashedPassword = await bcrypt.hash(password, 10);

  // check existing user
  const existing = await sql`
    SELECT userid FROM users
    WHERE email = ${authenticator}
    OR phone = ${authenticator}
    LIMIT 1
  `;

  if (existing.length) {
    throw new Error("User already exists");
  }

  if (isEmail) {
    await sql`
      INSERT INTO users (
        firstname,
        lastname,
        email,
        password,
        role
      )
      VALUES (
        ${firstname},
        ${lastname},
        ${authenticator},
        ${hashedPassword},
        'user'
      )
    `;
  } else {
    await sql`
      INSERT INTO users (
        firstname,
        lastname,
        phone,
        password,
        role
      )
      VALUES (
        ${firstname},
        ${lastname},
        ${authenticator},
        ${hashedPassword},
        'user'
      )
    `;
  }

  return { success: true };
}
