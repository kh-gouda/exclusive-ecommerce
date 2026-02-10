import LogoText from "@shared/LogoText";
import Container from "@shared/Container";
import NavLinks from "@layout/header/NavLinks";
import SearchBar from "@layout/header/SearchBar";
import UserLinks from "@ui/layout/header/AccountLinks";

export default function Nav() {
  return (
    <nav className="mt-10 mb-4">
      <Container>
        <div className="flex justify-between items-center py-1.75">
          <LogoText parent="header" />
          <NavLinks />
          <SearchBar />
          <UserLinks />
        </div>
      </Container>
    </nav>
  );
}
