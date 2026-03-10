import sql from "@/app/lib/db";

async function listStudents() {
  const data = await sql`
SELECT *
          FROM users
          WHERE email = 'techgoast@gmail.com'
          LIMIT 1
`;
  return data;
}

export async function GET() {
  try {
    return Response.json(await listStudents());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
