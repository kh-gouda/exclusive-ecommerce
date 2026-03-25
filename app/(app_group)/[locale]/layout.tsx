import Header from "@layout/header/Header";
import Footer from "@ui/layout/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
//.....................
import { NextIntlClientProvider, useLocale } from "next-intl";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <NextIntlClientProvider>
        <Header />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
