"use client";

import { sendNewPassword } from "@/app/actions/sendNewPassword";
import { sendVerificationCode } from "@/app/actions/sendVerificationCode";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, SubmitEvent, useState } from "react";
import { toast } from "react-toastify";

export default function ResetPasswordForm() {
  const t = useTranslations("placeHolders");
  const t2 = useTranslations("general");

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const notifySuccess = (msg: string) => toast.success(msg);

  const notifyError = (error: string) => toast.error(error);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  async function handleSendEmail(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!email) {
        throw new Error("Email Cant be Empty");
      }
      await sendVerificationCode(email);
      notifySuccess("Check Your Email for Your Verification Code");
      setIsEmailSent(true);
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
  }

  async function handleVerifyEmail(e: SubmitEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (!verificationCode) {
        throw new Error("Verification Code Cant be Empty");
      }
      await sendNewPassword(verificationCode, email);
      setIsEmailVerified(true);
      if (isEmailVerified) {
        notifySuccess("Check Your Email for Your New Password");
        router.push("/login");
      } else {
        throw new Error("Wrong (Email Or Verification Code)");
      }
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
  }

  return (
    <div className="w-full max-w-150">
      <form
        action=""
        onSubmit={(e: SubmitEvent<HTMLFormElement>) => handleSendEmail(e)}
      >
        <input
          className="form-input"
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder={t("typeEmail")}
          onChange={handleEmailChange}
        />
        <button
          className={`shared-btn ${isEmailSent ? "shared-btn-disabled" : "shared-btn-solid"}`}
          disabled={isEmailSent}
        >
          {t2("sendEmail")}
        </button>
      </form>
      {isEmailSent ? (
        <form
          className="mt-10"
          action=""
          onSubmit={(e: SubmitEvent<HTMLFormElement>) => handleVerifyEmail(e)}
        >
          <input
            className="form-input"
            type="text"
            name="verification-code"
            id="verification-code"
            value={verificationCode}
            placeholder={t("typeVerificationCode")}
            onChange={handleVerificationCodeChange}
          />
          <button
            className={`shared-btn ${!isEmailSent ? "shared-btn-disabled" : "shared-btn-solid"}`}
            disabled={!isEmailSent}
          >
            {t2("verifyEmail")}
          </button>
        </form>
      ) : null}
    </div>
  );
}
