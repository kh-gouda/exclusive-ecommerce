"use client";

import { useTranslations } from "next-intl";

export function TranslatedDays() {
  const t = useTranslations("timer");
  return <span className="text-xs">{t("days")}</span>;
}

export function TranslatedHours() {
  const t = useTranslations("timer");
  return <span className="text-xs">{t("hours")}</span>;
}

export function TranslatedMinutes() {
  const t = useTranslations("timer");
  return <span className="text-xs">{t("minutes")}</span>;
}

export function TranslatedSeconds() {
  const t = useTranslations("timer");
  return <span className="text-xs">{t("seconds")}</span>;
}
