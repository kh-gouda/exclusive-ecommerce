import AccountSideNav from "@ui/account/AccountSideNav";
import Container from "@ui/shared/Container";
import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <main className="flex gap-25 pt-20 pb-35">
        <AccountSideNav />
        <div className="flex-1 shadow p-10 rounded-sm">{children}</div>
      </main>
    </Container>
  );
}
