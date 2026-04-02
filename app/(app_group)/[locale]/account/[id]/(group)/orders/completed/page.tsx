import { fetchUserOrders } from "@/app/lib/utils";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getPageMetadata } from "@/app/lib/getPageMetadata";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const param = await params;
  return getPageMetadata({
    locale: param.locale,
    page: "completedOrders",
    path: "/account/[id]/orders/completed",
  });
}
export default async function OrdersCompleted(props: {
  params: Promise<{ id: string }>;
}) {
  const t = await getTranslations("accountOrders");

  const params = await props.params;
  const id = +params.id;

  const orders = await fetchUserOrders(id);

  const completedOrders = orders.filter(
    (order) => order.orderstatus === "completed",
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

      {completedOrders && completedOrders.length ? (
        completedOrders.map((order) => (
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
        <div className="text-identity text-center">{t("noCompleted")}</div>
      )}
    </div>
  );
}
