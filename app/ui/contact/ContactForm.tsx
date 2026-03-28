"use client";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ContactForm() {
  const t = useTranslations("placeHolders");
  const t2 = useTranslations("general");

  const router = useRouter();

  const notifySuccess = () => toast.success("Your Message Sent Successfully");
  const notifyError = (error: string) => toast.error(error);

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
      };

      if (!data.name || !data.email || !data.phone || !data.message) {
        throw new Error("You Have To Fill All Fields");
      }

      await sendContactMessage(data);
      notifySuccess();
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) notifyError(error.message);
    }
  };

  return (
    <form action={handleSubmit} className="p-10 shadow flex-1">
      <div className="flex items-center gap-4 *:flex-1">
        <input
          type="text"
          name="name"
          id="name"
          placeholder={t("yourName")}
          className="bg-gray-bg rounded-sm p-4"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder={t("yourEmail")}
          className="bg-gray-bg rounded-sm p-4"
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder={t("yourPhone")}
          className="bg-gray-bg rounded-sm p-4"
        />
      </div>
      <textarea
        name="message"
        id="message"
        className="my-8 w-full h-57.75 rounded-sm resize-none bg-gray-bg p-4"
      ></textarea>
      <div className="flex items-center justify-end">
        <button className="shared-btn shared-btn-solid">
          {t2("sendMessage")}
        </button>
      </div>
    </form>
  );
}
