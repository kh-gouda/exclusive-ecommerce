import SectionTitle from "@ui/shared/SectionTitle";
import SharedButton from "@ui/shared/SharedButton";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <section className="w-92.5 max-w-full">
      <SectionTitle weight="medium">Create an account</SectionTitle>
      <p className="text-base">Enter your details below</p>

      <form className="mt-12" action="">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="form-input"
          aria-label="new username"
          autoComplete="username"
        />

        <input
          type="text"
          name="authinticator"
          id="authinticator"
          placeholder="Email or Phone Number"
          className="form-input"
          aria-label="new useremail"
          autoComplete="email"
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="form-input"
          aria-label="new userpassword"
          autoComplete="current-password"
        />

        <SharedButton full task="create account">
          Create Account
        </SharedButton>
        <div className="mt-4">
          <SharedButton transparent full task="create account">
            <Image
              width={24}
              height={24}
              src="/images/Icon-Google.png"
              alt="google icon"
            />
            Sign up with Google
          </SharedButton>
        </div>
      </form>
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
