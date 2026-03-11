"use server";
import sql from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export async function fetchUserById(userId: number) {
  const user = await sql`
  select * from users where userid = ${userId}
  `;

  return user;
}

export async function fetchUserByEmail(userEmail: string) {
  const user = await sql`
  select * from users where email = ${userEmail}
  `;

  return user;
}

export async function updateUserProfile(newUserData: {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  await sql`
  update users set
  firstname = ${newUserData.firstName},
  lastname = ${newUserData.lastName},
  email = ${newUserData.email}
  where userid = ${newUserData.userId}
  `;
  revalidatePath(`/account/${newUserData.userId}/profile`);
  return { success: true };
}

export async function updateUserProfileAndPassword(newUserData: {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  await sql`
  update users set
  firstname = ${newUserData.firstName},
  lastname = ${newUserData.lastName},
  email = ${newUserData.email},
  password = ${newUserData.password}
  where userid = ${newUserData.userId}
  `;

  return { success: true };
}

export async function updateUserAddress(
  userId: number,
  newAddress: {
    city: string;
    street: string;
    country: string;
    building: string;
  },
) {
  await sql`
  update users set address = ${JSON.stringify(newAddress)}::jsonb
  where userid = ${userId}
  `;

  await sql`
  UPDATE users
SET address = (address #>> '{}')::jsonb
WHERE jsonb_typeof(address) = 'string';
  `;

  return { success: true };
}
