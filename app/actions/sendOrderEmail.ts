"use server";

import { OrderEmailTemplate } from "@/app/emails/OrderEmailTemplate";
import sql from "@/app/lib/db";
import { sendEmail } from "@/app/lib/mail";

export async function sendOrderEmail(orderId: number) {
  const order =
    await sql`select totalamount from orders where orderid = ${orderId}`;
  try {
    const html = OrderEmailTemplate(orderId, order[0].totalamount);

    await sendEmail({
      to: "techgoast@gmail.com", // replace with your gmail
      subject: "Exclusive_Order_Progressing",
      html,
    });

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
  }
}
