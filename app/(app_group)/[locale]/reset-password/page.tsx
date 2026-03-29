import ResetPasswordForm from "@ui/resetPassword/ResetPasswordForm";
import Container from "@ui/shared/Container";
import SectionTitle from "@ui/shared/SectionTitle";
import { getTranslations } from "next-intl/server";

export default async function ResetPasswordPage() {
  const t = await getTranslations("sectionTitle");
  return (
    <Container>
      <SectionTitle>{t("resetPassword")}</SectionTitle>
      <section className="py-20 flex items-center justify-center">
        <ResetPasswordForm />
      </section>
    </Container>
  );
}
