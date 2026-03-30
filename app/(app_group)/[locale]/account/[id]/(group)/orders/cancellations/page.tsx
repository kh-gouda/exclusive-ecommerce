import { fetchUserOrders } from "@/app/lib/utils";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function OrdersCancellations(props: {
  params: Promise<{ id: string }>;
}) {
  const t = await getTranslations("accountOrders");

  const params = await props.params;
  const id = +params.id;

  const orders = await fetchUserOrders(id);

  const cancelledOrders = orders.filter(
    (order) => order.orderstatus === "cancelled",
  );

  return (
    <div>
      <ul className="flex items-center *:flex-1 *:text-center *:border mb-6">
        <li>{t("orderId")}</li>
        <li>{t("totalAmount")}</li>
        <li>{t("orderDate")}</li>
        <li>{t("orderPaid")}</li>
        <li>{t("checkDetails")}</li>
      </ul>

      {cancelledOrders && cancelledOrders.length ? (
        cancelledOrders.map((order) => (
          <ul
            key={order.orderid}
            className="flex items-center *:flex-1 *:text-center mb-6"
          >
            <li>{order.orderid}</li>
            <li>{order.totalamount}</li>
            <li>{new Date(order.orderdate).toDateString()}</li>
            <li>{order.orderpaid ? t("true") : t("false")}</li>
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
        <div className="text-identity text-center">{t("noCancelled")}</div>
      )}
    </div>
  );
}
