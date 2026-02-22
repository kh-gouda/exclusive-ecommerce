import sql from "@/app/lib/db";

async function listStudents() {
  const data = await sql`
    SELECT firstName, lastName, email, address
    FROM users
    where role = 'admin'
  `;

  const dataModified = data.map((user) => ({
    ...user,
    address: JSON.parse(user.address),
  }));

  return dataModified;
}

export async function GET() {
  try {
    return Response.json(await listStudents());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
