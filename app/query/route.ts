import sql from "@/app/lib/db";

async function listStudents() {
  const data = await sql`
    WITH TopSellingProducts AS (
    -- Calculate total quantity sold per product and get top 4
    SELECT 
        productid, 
        SUM(quantity) AS total_sold
    FROM orderitems
    GROUP BY productid
    ORDER BY total_sold DESC
    LIMIT 4
),
RatedProducts AS (
    -- Calculate rating count and the most common rating value
    SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
    FROM productratings
    GROUP BY productid
)
SELECT 
    p.productid,
    p.productname,
    p.productimages,
    p.productprice,
	p.productdiscount,
    tsp.total_sold,
    COALESCE(rp.voters, 0) AS voters,
    rp.stars AS stars
FROM 
    TopSellingProducts tsp
INNER JOIN 
    products p ON tsp.productid = p.productid
LEFT JOIN 
    RatedProducts rp ON tsp.productid = rp.productid
ORDER BY 
    tsp.total_sold DESC;
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
