import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = [
  "en",
  "ar",
  "fr",
  "de",
  "es",
  "zh",
  "zh-TW",
  "ja",
  "ko",
  "pt",
  "it",
  "ru",
  "bn",
  "hi",
  "tr",
  "nl",
  "pl",
  "id",
  "th",
  "vi",
  "sv",
];
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
