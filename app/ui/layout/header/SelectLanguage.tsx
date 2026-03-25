"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";

export default function SelectLanguage() {
  const locale = useLocale();
  const t = useTranslations("selectLangList");

  const router = useRouter();
  const pathname = usePathname();

  function changeLanguage(locale: string) {
    document.cookie = `locale=${locale}; path=/`;
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  }

  return (
    <Select value={locale} onValueChange={(value) => changeLanguage(value)}>
      <SelectTrigger className="text-white-text border-0 [&_svg]:stroke-white-text cursor-pointer">
        <SelectValue placeholder="Select lang" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t("english")}</SelectItem>
        <SelectItem value="ar">{t("arabic")}</SelectItem>
        <SelectItem value="fr">{t("french")}</SelectItem>
        <SelectItem value="de">{t("german")}</SelectItem>
        <SelectItem value="es">{t("spanish")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
