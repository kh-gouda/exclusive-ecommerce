import { resend } from "./resend";

type SendEmailProps = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailProps) {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });

    return data;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
}
