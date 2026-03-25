import { fetchUserOrders } from "@/app/lib/utils";
import Link from "next/link";

export default async function OrdersPending(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = +params.id;

  const orders = await fetchUserOrders(id);

  const pendingOrders = orders.filter(
    (order) => order.orderstatus === "pending",
  );

  return (
    <div>
      <ul className="flex items-center *:flex-1 *:text-center *:border mb-6">
        <li>Order_ID</li>
        <li>Total_Amount</li>
        <li>Order_Date</li>
        <li>Order_paid</li>
        <li>Check Details</li>
      </ul>

      {pendingOrders && pendingOrders.length ? (
        pendingOrders.map((order) => (
          <ul
            key={order.orderid}
            className="flex items-center *:flex-1 *:text-center mb-6"
          >
            <li>{order.orderid}</li>
            <li>{order.totalamount}</li>
            <li>{new Date(order.orderdate).toDateString()}</li>
            <li>{order.orderpaid ? "true" : "false"}</li>
            <li>
              <Link
                href={`/account/${id}/checkout?orderid=${order.orderid}`}
                className="text-green-500"
              >
                Check Details
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <div className="text-identity text-center">
          There Is No Pending Orders
        </div>
      )}
    </div>
  );
}
