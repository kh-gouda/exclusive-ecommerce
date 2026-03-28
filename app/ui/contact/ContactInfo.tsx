import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";

export default async function ContactInfo() {
  const t = await getTranslations("contactPage");

  return (
    <div className="p-10 shadow">
      <div className="w-65.5">
        <h3 className="flex items-center gap-4">
          <div className="w-10 h-10 bg-identity rounded-full flex items-center justify-center">
            <PhoneIcon className="w-6 h-6 text-white-color" />
          </div>
          <span className="font-medium">{t("callUs")}</span>
        </h3>
        <p className="mt-6 mb-4">{t("availability")}</p>
        <p>{t("phone")}</p>
      </div>
      <hr className="my-8" />
      <div className="w-65.5">
        <h3 className="flex items-center gap-4">
          <div className="w-10 h-10 bg-identity rounded-full flex items-center justify-center">
            <EnvelopeIcon className="w-6 h-6 text-white-color" />
          </div>
          <span className="font-medium">{t("writeToUs")}</span>
        </h3>
        <p className="mt-6">{t("fillForm")}</p>
        <p className="my-4">{t("emails")}</p>
        <p className="my-4">{t("emails1")}</p>
        <p>{t("emails2")}</p>
      </div>
    </div>
  );
}
