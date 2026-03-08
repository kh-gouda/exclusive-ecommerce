import { authOptions } from "@/app/lib/auth";
import LogoutButton from "@ui/layout/header/LogoutButton";
import SectionTitle from "@ui/shared/SectionTitle";
import SignupForm from "@ui/signup/SignupForm";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Signup() {
  const session = await getServerSession(authOptions);
  return (
    <section className="">
      {session ? (
        <>
          <SectionTitle weight={500}>You Have Already Logged In</SectionTitle>
          <div className="flex items-center gap-4">
            <p className="shared-btn shared-btn-solid">
              <LogoutButton />
            </p>
            <Link href="/">Or Go Back Home</Link>
          </div>
        </>
      ) : (
        <>
          <SectionTitle weight={500}>Create an account</SectionTitle>
          <p className="text-base">Enter your details below</p>

          <SignupForm />

          <p className="mt-8.5 text-center">
            <span>Already have account?</span>
            <Link
              className="font-medium border-b border-gray-300 ml-2 pb-1"
              href="/login"
            >
              Login
            </Link>
          </p>
        </>
      )}
    </section>
  );
}
