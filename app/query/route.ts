import sql from "@/app/lib/db";

async function listStudents() {
  const data = await sql`
WITH RatedProducts AS (
    -- Calculate rating count and the most common (max counted) rating value
    SELECT 
        productid, 
        COUNT(ratingid) AS voters,
        -- MODE() WITHIN GROUP calculates the most frequent value
        MODE() WITHIN GROUP (ORDER BY ratingid) AS stars
    FROM productratings
    GROUP BY productid
  )
    SELECT 
      wl.productid,
      p.productid,
      p.productname,
      p.productimages,
      p.productprice,
      COALESCE(rp.voters, 0) AS voters,
      rp.stars AS stars
    FROM  
      products p 
    INNER JOIN 
      wishlist wl ON wl.productid = p.productid
    INNER JOIN 
      RatedProducts rp ON p.productid = rp.productid
    WHERE 
      wl.userid = 2
    ORDER BY 
    p.productid ASC;
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
