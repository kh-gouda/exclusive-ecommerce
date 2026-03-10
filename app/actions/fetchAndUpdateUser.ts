"use server";
import sql from "@/app/lib/db";

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
