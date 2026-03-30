import LogoText from "@shared/LogoText";
import Container from "@shared/Container";
import NavLinks from "@layout/header/NavLinks";
import SearchBar from "@layout/header/SearchBar";
import UserLinks from "@ui/layout/header/AccountLinks";

export default function Nav() {
  return (
    <nav className="mt-10 mb-4">
      <Container>
        <div className="flex items-center py-1.75 gap-2 max-[900px]:flex-col max-[900px]:gap-4">
          <div className="flex-3 flex justify-between items-center gap-2 max-[900px]:w-full relative">
            <LogoText parent="header" />
            <NavLinks />
          </div>
          <div className="flex-2 flex justify-between items-center gap-2 max-[900px]:w-full max-[900px]:justify-center max-[370px]:flex-col max-[370px]:gap-4">
            <SearchBar />
            <UserLinks />
          </div>
        </div>
      </Container>
    </nav>
  );
}
