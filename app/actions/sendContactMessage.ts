"use server";

import { ContactEmailTemplate } from "@/app/emails/ContactEmail";
import sql from "@/app/lib/db";
import { sendEmail } from "@/app/lib/mail";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function sendContactMessage(data: ContactFormData) {
  await sql`
  insert into contactmessages (contactname, contactemail, contactphone, contactmessage)
  values (${data.name}, ${data.email}, ${data.phone}, ${data.message})
  `;

  const html = ContactEmailTemplate(data);

  await sendEmail({
    to: "techgoast@gmail.com", // replace with your gmail
    subject: "New Contact Message",
    html,
  });

  return { success: true };
}
