"use client";
import SharedButton from "@ui/shared/SharedButton";
import Image from "next/image";
import { SubmitEvent, useState } from "react";
import { signup } from "@/app/actions/signup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [authenticator, setAuthenticator] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await signup({
        firstname,
        lastname,
        authenticator,
        password,
      });

      // auto login
      await signIn("credentials", {
        authenticator,
        password,
        redirect: false,
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form className="mt-12" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fname"
          id="fname"
          placeholder="First Name"
          className="form-input"
          aria-label="new user first name"
          autoComplete="username"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <input
          type="text"
          name="lname"
          id="lname"
          placeholder="Last Name"
          className="form-input"
          aria-label="new user last name"
          autoComplete="username"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <input
          type="text"
          name="authinticator"
          id="authinticator"
          placeholder="Email or Phone Number"
          className="form-input"
          aria-label="authinticator"
          autoComplete="mobile email"
          value={authenticator}
          onChange={(e) => setAuthenticator(e.target.value)}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="form-input"
          aria-label="new userpassword"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <SharedButton full task="create account">
          Create Account
        </SharedButton>
      </form>

      <div className="mt-4">
        <button
          className="shared-btn shared-btn-transparent w-full"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/",
            })
          }
        >
          <Image
            width={24}
            height={24}
            src="/images/Icon-Google.png"
            alt="google icon"
          />
          Sign up with Google
        </button>
      </div>
    </>
  );
}
