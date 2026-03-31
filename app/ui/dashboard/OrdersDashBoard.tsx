"use client";
import { FETCHED_DASHBOARD_ORDERS } from "@/app/lib/typeDefinitions";
import Link from "next/link";
import { ChangeEvent, useEffect, useEffectEvent, useState } from "react";

export default function OrdersDashBoard({
  orders,
}: {
  orders: FETCHED_DASHBOARD_ORDERS[];
}) {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [ordersList, setOrdersList] = useState(orders);
  // const [actionStatus, setActionStatus] = useState("");

  const changeOrderList = useEffectEvent(() => {
    if (selectedStatus === "all") {
      setOrdersList(orders);
    } else {
      const filteredOrders = orders.filter(
        (order) => order.orderstatus === selectedStatus,
      );
      setOrdersList(filteredOrders);
    }
  });

  useEffect(() => {
    changeOrderList();
  }, [selectedStatus]);

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-4 items-center justify-between">
        <div>
          <label htmlFor="status" className="me-4">
            Filter By Order Status
          </label>
          <select
            name="status"
            id="status"
            className="border"
            value={selectedStatus}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSelectedStatus(e.target.value)
            }
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
          </select>
        </div>
        <div>
          Orders Count :-{" "}
          <span className="text-green-600">({ordersList.length}) Orders</span>
        </div>
      </div>
      <ul className="flex items-center gap-2 *:flex-1 *:border *:text-center">
        <li className="overflow-hidden text-ellipsis text-nowrap">OrderId</li>
        <li className="overflow-hidden text-ellipsis text-nowrap">
          Order Status
        </li>
        <li className="overflow-hidden text-ellipsis text-nowrap max-[750px]:hidden">
          Order Date
        </li>
        <li className="overflow-hidden text-ellipsis text-nowrap max-[750px]:hidden">
          Total Amount
        </li>
        <li className="overflow-hidden text-ellipsis text-nowrap max-[750px]:hidden">
          Payment Method
        </li>
        <li className="overflow-hidden text-ellipsis text-nowrap max-[500px]:hidden">
          Payment Status
        </li>
        <li className="overflow-hidden text-ellipsis text-nowrap">
          Confirm Status
        </li>
        <li className="overflow-hidden text-ellipsis text-nowrap">actions</li>
      </ul>
      {ordersList.length ? (
        ordersList.map((order) => (
          <ul
            key={order.orderid}
            className="flex items-center gap-2 *:flex-1 *:text-center my-7.5"
          >
            <li>{order.orderid}</li>
            <li>
              {order.orderstatus === "pending" ||
              order.orderstatus === "cancelled" ||
              order.orderstatus === "returned" ? (
                <span className="text-identity">{order.orderstatus}</span>
              ) : order.orderstatus === "completed" ? (
                <span className="text-green-600">{order.orderstatus}</span>
              ) : (
                <span className="text-blue-600">{order.orderstatus}</span>
              )}
            </li>
            <li className=" max-[750px]:hidden">
              {new Date(order.orderdate).toLocaleDateString()}
            </li>
            <li className=" max-[750px]:hidden">$ {order.totalamount}</li>
            <li className=" max-[750px]:hidden">
              {order.paymentmethod === "bank" ? (
                <span className="text-green-600">{order.paymentmethod}</span>
              ) : (
                <span className="text-identity">{order.paymentmethod}</span>
              )}
            </li>
            <li className="max-[500px]:hidden">
              {order.orderpaid ? (
                <span className="text-green-600">Paid</span>
              ) : (
                <span className="text-identity">Not Paid</span>
              )}
            </li>
            <li>
              {order.orderconfirmed ? (
                <span className="text-green-600">Confirmed</span>
              ) : (
                <span className="text-identity">Not Confirmed</span>
              )}
            </li>
            <li>
              <Link
                href={`/dashboard/orders/${order.orderid}`}
                className="text-blue-600"
              >
                Check Order Details
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <div className="text-center text-identity my-7.5">
          No {selectedStatus !== "all" ? selectedStatus : null} Orders
        </div>
      )}
    </div>
  );
}
