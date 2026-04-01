import ContactForm from "@ui/contact/ContactForm";
import ContactInfo from "@ui/contact/ContactInfo";
import BreadCrumbs from "@ui/shared/BreadCrumbs";
import Container from "@ui/shared/Container";

export default function Contact() {
  const breadCrumbs = [{ label: "contact", href: "/contact" }];
  return (
    <Container>
      <div className="pt-20">
        <BreadCrumbs breadCrumbs={breadCrumbs} />
      </div>
      <div className="pt-20 pb-35 flex gap-7.5 max-[1235px]:flex-col">
        <ContactInfo />
        <ContactForm />
      </div>
    </Container>
  );
}
