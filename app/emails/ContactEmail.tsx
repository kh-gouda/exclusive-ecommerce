type ContactEmailProps = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export function ContactEmailTemplate({
  name,
  email,
  phone,
  message,
}: ContactEmailProps) {
  return `
    <h2>New Contact Message</h2>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>

    <h3>Message</h3>
    <p>${message}</p>
  `;
}
