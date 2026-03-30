"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { ChangeEvent, SubmitEvent, useState } from "react";
import { toast } from "react-toastify";

export default function SubscribeForm() {
  const t = useTranslations("footer");
  const t2 = useTranslations("placeHolders");

  const [email, setEmail] = useState("");
  const notifySubscribe = () => toast.success("Subsceibed Successfully");
  const notifySubscribeError = () => toast.error("Please enter valid email");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      email &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      notifySubscribe();
      setEmail("");
    } else {
      notifySubscribeError();
    }
  };

  const handleIconClick = () => {
    if (
      email &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      notifySubscribe();
      setEmail("");
    } else {
      notifySubscribeError();
    }
  };
  return (
    <>
      <h3 className="text-white-text font-medium text-xl my-6">
        {t("subscribe")}
      </h3>
      <p className="text-white-text text-base my-6">{t("subscribeOffer")}</p>
      <form
        action=""
        className="relative w-55 max-w-full group"
        onSubmit={(e: SubmitEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <input
          type="email"
          name="subscribe-email"
          id="subscribe-email"
          className="border border-white-text rounded-sm py-3 ps-4 text-white-text text-base placeholder:text-white-text placeholder:text-sm"
          placeholder={t2("enterEmail")}
          value={email ? email : ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleEmailChange(e)}
        />
        <PaperAirplaneIcon
          className="w-5 h-5 text-white-text absolute top-1/2 end-0 group-rtl/layoutdir:end-3 group-rtl/layoutdir:rotate-180 -translate-1/2 cursor-pointer"
          role="button"
          onClick={handleIconClick}
        />
      </form>
    </>
  );
}
