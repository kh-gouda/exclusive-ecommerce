import sql from "@/app/lib/db";

async function listStudents() {
  const data = sql`
  WITH ProductRatings AS (
    -- Calculate total voters and most common rating (mode) per product
    SELECT 
        pr.productid, COUNT(pr.userid) AS voters, -- MODE() returns the most frequent value
        MODE() WITHIN GROUP (ORDER BY r.ratingvalue) AS stars 
    FROM productratings pr
    JOIN ratings r ON pr.ratingid = r.ratingid
    GROUP BY pr.productid
), ProductStock AS (
    -- Aggregate stock data into a JSON array of objects
    SELECT 
        s.productid, jsonb_agg(
            jsonb_build_object(
                'color', c.colorhex,
				'size', sz.size,
				'quantity', s.quantity
            )
        ) AS stock_array
    FROM stock s
    JOIN colors c ON s.colorid = c.colorid
    JOIN sizes sz ON s.sizeid = sz.sizeid
    GROUP BY s.productid
)
SELECT 
    p.productid, 
      p.productname,
      p.productdescription,
      p.productimages, 
      p.productprice, 
      p.productdiscount,
      p.newproduct,
    COALESCE(pr.voters, 0) AS voters, COALESCE(pr.stars, 0) AS stars, COALESCE(ps.stock_array,'[]'::jsonb) AS stock
FROM products p
LEFT JOIN ProductRatings pr ON p.productid = pr.productid
LEFT JOIN ProductStock ps ON p.productid = ps.productid
where p.productid = 1

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
