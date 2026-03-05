import { authOptions } from "@/app/lib/auth";
import LogoutButton from "@ui/layout/header/LogoutButton";
import LoginForm from "@ui/login/LoginForm";
import SectionTitle from "@ui/shared/SectionTitle";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Login() {
  const session = await getServerSession(authOptions);
  return (
    <section className="">
      {session ? (
        <>
          <SectionTitle weight={500}>You Have Already Logged In</SectionTitle>
          <p className="flex items-center gap-4">
            <p className="shared-btn shared-btn-solid">
              <LogoutButton />
            </p>
            <Link href="/">Or Go Back Home</Link>
          </p>
        </>
      ) : (
        <>
          <SectionTitle weight={500}>Log in to Exclusive</SectionTitle>
          <p className="text-base">Enter your details below</p>
          <LoginForm />
        </>
      )}
    </section>
  );
}
