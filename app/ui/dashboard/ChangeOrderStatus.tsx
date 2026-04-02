"use client";
import { updateOrderStatus } from "@/app/actions/addOrder";
import { sendOrderEmail } from "@/app/actions/sendOrderEmail";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

export default function ChangeOrderStatus({
  orderId,
  orderStatus,
  orderConfirmed,
}: {
  orderId: number;
  orderStatus: string;
  orderConfirmed: boolean;
}) {
  const router = useRouter();
  const notifySuccess = () =>
    toast.success("Order Status Updated Successfully");
  const notifyError = (error: string) => toast.error(error);

  const [status, setStatus] = useState(orderStatus);
  const [isChanged, setIsChanged] = useState(false);

  const handleSaveClick = async () => {
    try {
      if (
        (status === "in-progress" || status === "completed") &&
        !orderConfirmed
      ) {
        throw new Error(
          "You Cant Change Order Status Until User Confirm The Order",
        );
      }
      await updateOrderStatus(orderId, status);
      if (status === "in-progress") {
        await sendOrderEmail(orderId);
      }
      notifySuccess();
      router.push("/dashboard/orders");
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
  };
  return (
    <>
      <select
        className="border me-4"
        name="set-status"
        id="set-status"
        value={status}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setStatus(e.target.value);
          if (e.target.value !== orderStatus) {
            setIsChanged(true);
          } else {
            setIsChanged(false);
          }
        }}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
        <option value="returned">Returned</option>
      </select>
      {isChanged ? (
        <button
          className="text-green-600 cursor-pointer"
          onClick={handleSaveClick}
        >
          Save Changes
        </button>
      ) : null}
    </>
  );
}
