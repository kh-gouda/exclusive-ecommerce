import Nav from "@layout/header/Nav";
import HeaderAd from "@layout/header/HeaderAd";

export default function Header() {
  return (
    <header className="border-b">
      <HeaderAd />
      <Nav />
    </header>
  );
}
