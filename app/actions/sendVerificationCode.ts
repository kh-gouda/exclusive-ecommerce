"use server";

import { VerificationEmailTemplate } from "@/app/emails/VerificationEmail";
import sql from "@/app/lib/db";
import { sendEmail } from "@/app/lib/mail";

export async function sendVerificationCode(email: string) {
  const existing = await sql`
  select email from users where email = ${email}
  `;

  if (existing.length) {
    const insertedCode = await sql`
    insert into verificationcodes (relatedto) values (${email}) returning code
    `;

    const verificationCode = insertedCode[0].code;
    const html = VerificationEmailTemplate(verificationCode);

    await sendEmail({
      to: "techgoast@gmail.com", // replace with your gmail
      subject: "Verification Code",
      html,
    });
  } else {
    throw new Error("This Email Is Not Registered");
  }

  return { success: true };
}
