import { fetchOrderById } from "@/app/lib/utils";
import ShoppingCartImage from "@ui/cart/ShoppingCartImage";
import ChangeOrderStatus from "@ui/dashboard/ChangeOrderStatus";

export default async function DashBoardOrderDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const orderId = +params.id;

  const fetchedOrder = await fetchOrderById(orderId);
  const order = fetchedOrder[0];

  return (
    <div>
      <p className="mb-6">
        <span className="text-identity">Order Date :-</span>{" "}
        {new Date(order.orderdate).toLocaleDateString()}
      </p>
      <div className="mb-12 flex items-center *:flex-1">
        <p>
          <span className="text-identity">Payment Method :-</span>{" "}
          {order.paymentmethod}
        </p>
        <p>
          <span className="text-identity">Payment Status :-</span>{" "}
          {order.orderpaid ? "Paid" : "Not Paid"}
        </p>
        <p>
          <span className="text-identity">Confirm Status :-</span>{" "}
          {order.orderconfirmed ? "Confirmed" : "Not Confirmed"}
        </p>
      </div>
      <div className="mb-12 flex items-center *:flex-1">
        <p>
          <span className="text-identity">Order Status :-</span>{" "}
          {order.orderstatus}
        </p>
        <div>
          <span className="text-identity">Set Order Status As :- </span>
          <ChangeOrderStatus
            orderId={order.orderid}
            orderStatus={order.orderstatus}
            orderConfirmed={order.orderconfirmed}
          />
        </div>
      </div>
      <ul className="flex items-center gap-4 *:flex-1 *:border *:text-center">
        <li>Product</li>
        <li className="text-center">Price</li>
        <li className="text-center">Quantity</li>
        <li className="text-right">Subtotal</li>
      </ul>
      {order.orderitems.map((item) => (
        <ul
          key={item.productid}
          className="flex items-center gap-4 *:flex-1 *:text-center my-7.5"
        >
          <li className="flex items-center gap-1">
            <span className="w-12.5 h-12.5 block">
              <ShoppingCartImage productImage={item.productimages[0]} />
            </span>
            {item.productname}
          </li>
          <li>{item.unit_price}</li>
          <li>{item.quantity}</li>
          <li>{item.quantity * item.unit_price}</li>
        </ul>
      ))}
    </div>
  );
}
