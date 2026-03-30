import sql from "@/app/lib/db";

async function listStudents() {
  const data = await sql`
    SELECT p.productid,
        p.productname,
        p.productimages,
        p.productprice,
        p.productdiscount,
        r.ratingvalue
    FROM products AS p
    join productratings AS pr on p.productid = pr.productid
    join ratings AS r on pr.ratingid = r.ratingid
    join users AS u on pr.userid = u.userid
    WHERE u.userid = 2
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
