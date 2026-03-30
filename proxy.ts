import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: [
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
  ],
  defaultLocale: "en",
  localeDetection: true,
});

export const config = {
  matcher: ["/((?!api|_next|dashboard|.*\\..*).*)"],
};
