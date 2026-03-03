import sql from "@/app/lib/db";

async function listStudents() {
  const data = await sql`
SELECT 
    employeeid as id,
    employeename as name,
    employeeimage as image,
    employeejobtitle as jobTitle,
    employeesociallinks as socialLinks
  FROM 
    staff 
  WHERE 
    employeestatus = 'active';
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
