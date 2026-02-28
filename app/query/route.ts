import sql from "@/app/lib/db";

async function listStudents() {
  const data = await sql`
    select * from ads where adarea = 2 and endtime > now();
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
