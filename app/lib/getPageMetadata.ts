import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { locales, siteUrl } from "@/i18n/config";

type Props = {
  locale: string;
  page: string;
  path?: string;
};

export async function getPageMetadata({
  locale,
  page,
  path = "",
}: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: `metadata.${page}`,
  });

  const languages = Object.fromEntries(
    locales.map((loc) => [loc, `${siteUrl}/${loc}${path}`]),
  );

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),

    alternates: {
      canonical: `${siteUrl}/${locale}${path}`,
      languages,
    },
  };
}
