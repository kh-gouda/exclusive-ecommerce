import ContactForm from "@ui/contact/ContactForm";
import ContactInfo from "@ui/contact/ContactInfo";
import Container from "@ui/shared/Container";

export default function Contact() {
  return (
    <Container>
      <main className="pt-20 pb-35 flex gap-7.5">
        <ContactInfo />
        <ContactForm />
      </main>
    </Container>
  );
}
