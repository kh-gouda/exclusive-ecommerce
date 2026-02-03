import Downloadlinks from "@ui/layout/footer/DownloadLinks";
import FooterList from "@ui/layout/footer/FooterList";
import SubscribeForm from "@ui/layout/footer/SubscribeForm";
import Container from "@ui/shared/Container";
import LogoText from "@ui/shared/LogoText";

const SUPPORT_LIST = [
  "111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.",
  "exclusive@gmail.com",
  "+88015-88888-9999",
];

const ACCOUNT_LIST = [
  { name: "My Account", link: "/my-account" },
  { name: "Login / Register", link: "/login" },
  { name: "Cart", link: "/cart" },
  { name: "Wishlist", link: "/wishlist" },
  { name: "Shop", link: "/shop" },
];

const QUICK_LINKS_LIST = [
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Terms Of Use", link: "/terms" },
  { name: "FAQ", link: "/faq" },
  { name: "Contact", link: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-black-color py-20">
      <Container>
        <div className="flex gap-20 *:flex-1">
          <div>
            <LogoText parent="footer" />
            <SubscribeForm />
          </div>
          <FooterList listHeading="Support" listItems={SUPPORT_LIST} />
          <FooterList listHeading="Account" listItems={ACCOUNT_LIST} />
          <FooterList listHeading="Quick Links" listItems={QUICK_LINKS_LIST} />
          <Downloadlinks />
        </div>
      </Container>
    </footer>
  );
}
