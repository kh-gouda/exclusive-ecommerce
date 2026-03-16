"use server";

import { AdEmailTemplate } from "@/app/emails/AdEmailTemplate";
import sql from "@/app/lib/db";
import { sendEmail } from "@/app/lib/mail";

export async function sendAdEmail(adId: number, duration: number) {
  const ad = await sql`select adpaid from ads where adid = ${adId}`;

  if (ad.length && ad[0].adpaid) {
    const html = AdEmailTemplate(adId, duration);

    await sendEmail({
      to: "techgoast@gmail.com", // replace with your gmail
      subject: "Exclusive_AD_Preservation",
      html,
    });

    return { success: true };
  } else {
    throw new Error("Payment failed");
  }
}
