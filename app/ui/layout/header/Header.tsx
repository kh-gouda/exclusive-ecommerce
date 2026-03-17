import Nav from "@layout/header/Nav";
import HeaderAd from "@layout/header/HeaderAd";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import DashBoarddLink from "@ui/layout/header/DashBoardLink";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="border-b">
      <HeaderAd />
      {session && session.user.role === "admin" ? <DashBoarddLink /> : null}
      <Nav />
    </header>
  );
}
