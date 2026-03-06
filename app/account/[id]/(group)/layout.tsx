import { authOptions } from "@/app/lib/auth";
import AccountSideNav from "@ui/account/AccountSideNav";
import Container from "@ui/shared/Container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const username = session?.user.name;

  if (!session) {
    redirect("/account/profile");
  }

  return (
    <Container>
      <section className="pt-20 flex items-center justify-between">
        <div>bread crumbs</div>
        <div>
          Welcome! <span className="text-identity text-sm">{username}</span>
        </div>
      </section>
      <main className="flex gap-25 pt-20 pb-35">
        <AccountSideNav />
        <div className="flex-1 shadow p-10 rounded-sm">{children}</div>
      </main>
    </Container>
  );
}
