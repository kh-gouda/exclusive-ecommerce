import SectionTitle from "@ui/shared/SectionTitle";
import SignupForm from "@ui/signup/SignupForm";
import Link from "next/link";

export default function Signup() {
  return (
    <section className="">
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
    </section>
  );
}
