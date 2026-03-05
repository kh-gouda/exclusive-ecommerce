import sql from "@/app/lib/db";
import { users_seed } from "@/app/lib/seedUsers";
import bcrypt from "bcryptjs";

async function seedUsers() {
  await sql`
  create table if not exists users (
    userId serial primary key,
    firstName text not null,
    lastName text  not null,
    email text unique,
    phone text unique,
    password text not null,
    address jsonb,
    role text default 'user',
    createdAt timestamp default now(),
    updatedAt timestamp default now()
  )`;

  const insertedUsers = await Promise.all(
    users_seed.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
          INSERT INTO users (firstName, lastName, email, phone, password, address, role)
          VALUES (${user.firstName}, ${user.lastName}, ${user.email}, ${user.phone}, ${hashedPassword}, ${JSON.stringify(user.address)}, ${user.role})
          ON CONFLICT (email) DO NOTHING;
        `;
    }),
  );

  return insertedUsers;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [seedUsers()]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
