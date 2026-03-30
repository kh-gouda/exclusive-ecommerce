import { authOptions } from "@/app/lib/auth";
import Downloadlinks from "@ui/layout/footer/DownloadLinks";
import FooterList from "@ui/layout/footer/FooterList";
import SubscribeForm from "@ui/layout/footer/SubscribeForm";
import Container from "@ui/shared/Container";
import LogoText from "@ui/shared/LogoText";
import { getServerSession } from "next-auth";

export default async function Footer() {
  const session = await getServerSession(authOptions);
  const id = session?.user.id || "";

  const SUPPORT_LIST = ["supportAddress", "supportEmail", "supportPhone"];

  const ACCOUNT_LIST = [
    { name: "accountListN1", link: `/account/${id}/profile` },
    { name: "accountListN2", link: "/login" },
    { name: "accountListN3", link: `/account/${id}/cart` },
    { name: "accountListN4", link: `/account/${id}/wishlist` },
    { name: "accountListN5", link: "/shop" },
  ];

  const QUICK_LINKS_LIST = [
    { name: "quickListN1", link: "/privacy-policy" },
    { name: "quickListN2", link: "/terms" },
    { name: "quickListN3", link: "/faq" },
    { name: "quickListN4", link: "/contact" },
  ];

  return (
    <footer className="bg-black-color py-20">
      <Container>
        <div className="flex gap-20 *:flex-1 flex-wrap">
          <div>
            <LogoText parent="footer" />
            <SubscribeForm />
          </div>
          <FooterList listHeading="supportHeading" listItems={SUPPORT_LIST} />
          <FooterList listHeading="accountHeading" listItems={ACCOUNT_LIST} />
          <FooterList listHeading="quickHeading" listItems={QUICK_LINKS_LIST} />
          <Downloadlinks />
        </div>
      </Container>
    </footer>
  );
}
