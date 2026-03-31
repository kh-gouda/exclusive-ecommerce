import { fetchUserOrders } from "@/app/lib/utils";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function OrdersInProgress(props: {
  params: Promise<{ id: string }>;
}) {
  const t = await getTranslations("accountOrders");

  const params = await props.params;
  const id = +params.id;

  const orders = await fetchUserOrders(id);

  const inProgressOrders = orders.filter(
    (order) => order.orderstatus === "in-progress",
  );

  return (
    <div>
      <ul className="flex items-center *:flex-1 *:text-center *:border mb-6">
        <li>{t("orderId")}</li>
        <li className="max-[400px]:hidden">{t("totalAmount")}</li>
        <li className="max-[950px]:hidden">{t("orderDate")}</li>
        <li className="max-[950px]:hidden">{t("orderPaid")}</li>
        <li>{t("checkDetails")}</li>
      </ul>

      {inProgressOrders && inProgressOrders.length ? (
        inProgressOrders.map((order) => (
          <ul
            key={order.orderid}
            className="flex items-center *:flex-1 *:text-center mb-6"
          >
            <li>{order.orderid}</li>
            <li className="max-[400px]:hidden">{order.totalamount}</li>
            <li className="max-[950px]:hidden">
              {new Date(order.orderdate).toDateString()}
            </li>
            <li className="max-[950px]:hidden">
              {order.orderpaid ? t("true") : t("false")}
            </li>
            <li>
              <Link
                href={`/account/${id}/checkout?orderid=${order.orderid}`}
                className="text-green-500"
              >
                {t("checkDetails")}
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <div className="text-identity text-center">{t("noInProgress")}</div>
      )}
    </div>
  );
}
