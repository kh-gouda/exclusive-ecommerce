"use client";

import { signIn } from "next-auth/react";
import { SubmitEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const [authenticator, setAuthenticator] = useState("");

  const [password, setPassword] = useState("");

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    await signIn("credentials", {
      authenticator,
      password,
      callbackUrl: "/",
    });
  }
  return (
    <>
      <form className="mt-12" action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="authinticator"
          id="authinticator"
          placeholder="Email or Phone Number"
          className="form-input"
          aria-label="authinticator"
          autoComplete="mobile email"
          onChange={(e) => setAuthenticator(e.target.value)}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="form-input"
          aria-label="userpassword"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="flex items-center justify-between">
          <button className="shared-btn shared-btn-solid">Login</button>

          <Link className="text-identity" href="/reset-password">
            Forget Password?
          </Link>
        </p>
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
          Sign in with Google
        </button>
      </div>
    </>
  );
}
