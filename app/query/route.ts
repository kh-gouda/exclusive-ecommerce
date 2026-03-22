import sql from "@/app/lib/db";

async function listStudents() {
  const data = await sql`
  with ProductStock AS (
      -- Aggregate stock data into a JSON array of objects
      SELECT 
          s.productid, jsonb_agg(
              jsonb_build_object(
          'colorid', c.colorid,
                  'color', c.colorhex,
          'sizeid', sz.sizeid,
          'size', sz.size,
          'quantity', s.quantity
              )
          ) AS stock_array
      FROM stock s
      JOIN colors c ON s.colorid = c.colorid
      JOIN sizes sz ON s.sizeid = sz.sizeid
      GROUP BY s.productid
  ), productCategory as (
  select
  categoryid, productid, subcategoryid from productcategories pc
  )
  SELECT 
      p.productid, 
        p.productname,
        p.productdescription,
        p.productimages, 
        p.productprice, 
        p.productdiscount,
        p.newproduct,
        p.editable,
        pc.categoryid,
        pc.subcategoryid, 
    COALESCE(ps.stock_array,'[]'::jsonb) AS stock
  FROM products p
  LEFT JOIN ProductStock ps ON p.productid = ps.productid
  left join productcategories pc on pc.productid = p.productid
  where p.productid = 1`;

  return data;
}

export async function GET() {
  try {
    return Response.json(await listStudents());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
