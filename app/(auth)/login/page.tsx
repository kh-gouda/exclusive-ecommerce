import SectionTitle from "@ui/shared/SectionTitle";
import SharedButton from "@ui/shared/SharedButton";
import Link from "next/link";

export default function Login() {
  return (
    <section className="">
      <SectionTitle weight="medium">Log in to Exclusive</SectionTitle>
      <p className="text-base">Enter your details below</p>

      <form className="mt-12" action="">
        <input
          type="text"
          name="authinticator"
          id="authinticator"
          placeholder="Email or Phone Number"
          className="form-input"
          aria-label="authinticator"
          autoComplete="mobile email"
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="form-input"
          aria-label="userpassword"
          autoComplete="current-password"
        />

        <p className="flex items-center justify-between">
          <SharedButton task="Login">Login</SharedButton>

          <Link className="text-identity" href="/reset-password">
            Forget Password?
          </Link>
        </p>
      </form>
    </section>
  );
}
