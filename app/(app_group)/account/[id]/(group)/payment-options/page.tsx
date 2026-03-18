import { redirect } from "next/navigation";

export default async function PaymentOptions(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = +params.id;

  redirect(`/account/${id}/profile`);
  return <div>Payment Options</div>;
}
