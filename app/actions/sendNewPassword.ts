"use server";

import { NewPasswordTemplate } from "@/app/emails/NewPasswordEmail";
import sql from "@/app/lib/db";
import { sendEmail } from "@/app/lib/mail";
import bcrypt from "bcryptjs";

export async function sendNewPassword(verificationCode: string, email: string) {
  const existing = await sql`
  select relatedto from verificationcodes where code = ${verificationCode} and relatedto = ${email}
  `;

  if (existing.length) {
    const newPassword = await bcrypt.hash("newPass", 10);

    await sql`
    update users set password = ${newPassword} where email = ${email}
    `;

    const html = NewPasswordTemplate("newPass");

    await sendEmail({
      to: "techgoast@gmail.com", // replace with your gmail
      subject: "Reset Password",
      html,
    });
  } else {
    throw new Error(
      "This Verification Code is Not Correct Or Not Related to This Email",
    );
  }

  return { success: true };
}
