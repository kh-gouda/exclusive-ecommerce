import { fetchOrderById } from "@/app/lib/utils";
import Container from "@ui/shared/Container";
import SectionTitle from "@ui/shared/SectionTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import CheckoutForm from "@ui/checkout/CheckoutForm";
import { ORDER_DETAILS_TYPE } from "@/app/lib/typeDefinitions";
import { confirmOrder, confirmPayment } from "@/app/actions/addOrder";
import BreadCrumbs from "@ui/shared/BreadCrumbs";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default async function Checkout(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const orderId = Number(searchParams.orderid);
  const paymentSuccess = searchParams.success;

  if (paymentSuccess) {
    await confirmPayment(orderId, true);
    await confirmOrder(orderId, true);
  }

  const session = await getServerSession(authOptions);
  const user = session?.user;

  const order = await fetchOrderById(orderId);

  if (!order.length) {
    return (
      <div className="pt-20 pb-35">
        <Container>
          <SectionTitle weight={500}>Billing Details</SectionTitle>
          <div className="text-identity">No Order Meet This OrderId</div>
        </Container>
      </div>
    );
  }

  const orderDetails: ORDER_DETAILS_TYPE = {
    ...order[0],
    userData: {
      name: user?.name || "",
      email: user?.email || "",
      phone: order[0].phone,
      image: user?.image || "",
      id: user?.id || "",
      role: user?.role || "",
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      address: {
        city: user?.address?.city || "",
        street: user?.address?.street || "",
        country: user?.address?.country || "",
        building: user?.address?.building || "",
      },
    },
  };

  return (
    <div className="pt-20 pb-35">
      <Container>
        <BreadCrumbs />
        <SectionTitle weight={500}>Billing Details</SectionTitle>
        <CheckoutForm orderDetails={orderDetails} />
      </Container>
    </div>
  );
}
