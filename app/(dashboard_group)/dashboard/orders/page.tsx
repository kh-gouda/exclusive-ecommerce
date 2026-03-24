import { fetchDashBoardOrders } from "@/app/lib/utils";
import OrdersDashBoard from "@ui/dashboard/OrdersDashBoard";

export default async function OrderDashBoardPage() {
  const orders = await fetchDashBoardOrders();
  return <OrdersDashBoard orders={orders} />;
}
