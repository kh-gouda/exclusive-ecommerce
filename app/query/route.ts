import sql from "@/app/lib/db";

async function listStudents() {
  const data = await sql`
SELECT
    o.orderid,
	  o.userid,
    o.orderstatus,
    o.orderdate,
    o.paymentmethod,
    o.appliedcoupon,
    o.appliedcoupondiscount,
    o.orderpaid,
    o.orderconfirmed,
    json_agg(
        json_build_object(
            'productid', oi.productid,
            'quantity', oi.quantity,
            'unit_price', oi.unitprice,
            'productname', p.productname,
            'productimage', p.productimages
        )
    ) AS orderitems
FROM
    orders o
JOIN
    orderitems oi ON o.orderid = oi.orderid
JOIN
    products p ON oi.productid = p.productid
where o.orderid = 14
GROUP BY
    o.orderid; 
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
