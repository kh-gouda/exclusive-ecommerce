import sql from "@/app/lib/db";

async function listStudents() {
  const data = await sql`
SELECT
    o.orderid,
	  o.userid,
    u.phone,
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
            'productimages', p.productimages
        )
    ) AS orderitems
FROM
    orders o
JOIN
    users u ON o.userid = u.userid
JOIN
    orderitems oi ON o.orderid = oi.orderid
JOIN
    products p ON oi.productid = p.productid
where o.orderid = 18
GROUP BY
    o.orderid, u.phone; 
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
