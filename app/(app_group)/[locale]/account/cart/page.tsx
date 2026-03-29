import Container from "@ui/shared/Container";
import Section from "@ui/shared/Section";
import SectionTitle from "@ui/shared/SectionTitle";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function CartNotAuthorized() {
  const t = await getTranslations("accountNoLogin");
  return (
    <Container>
      <Section>
        <SectionTitle>{t("haveToLogin")} {t("cart")}</SectionTitle>
        <p>
          {t("youCan")}
          <Link href="/login" className="text-identity">
            {t("loginhere")}
          </Link>
        </p>
      </Section>
    </Container>
  );
}
