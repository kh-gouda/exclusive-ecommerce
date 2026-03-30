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
        <SelectItem value="zh">{t("Chinese(Simplified)")}</SelectItem>
        <SelectItem value="zh-TW">{t("Chinese(Traditional)")}</SelectItem>
        <SelectItem value="ja">{t("japanese")}</SelectItem>
        <SelectItem value="ko">{t("korean")}</SelectItem>
        <SelectItem value="pt">{t("portuguese")}</SelectItem>
        <SelectItem value="it">{t("italian")}</SelectItem>
        <SelectItem value="ru">{t("russian")}</SelectItem>
        <SelectItem value="bn">{t("bengali")}</SelectItem>
        <SelectItem value="hi">{t("hindi")}</SelectItem>
        <SelectItem value="tr">{t("turkish")}</SelectItem>
        <SelectItem value="nl">{t("dutch")}</SelectItem>
        <SelectItem value="pl">{t("polish")}</SelectItem>
        <SelectItem value="id">{t("indonesian")}</SelectItem>
        <SelectItem value="th">{t("thai")}</SelectItem>
        <SelectItem value="vi">{t("vietnamese")}</SelectItem>
        <SelectItem value="sv">{t("swedish")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
