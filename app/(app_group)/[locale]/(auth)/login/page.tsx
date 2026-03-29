import { authOptions } from "@/app/lib/auth";
import LogoutButton from "@ui/layout/header/LogoutButton";
import LoginForm from "@ui/login/LoginForm";
import SectionTitle from "@ui/shared/SectionTitle";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Login() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("sectionTitle");
  const t2 = await getTranslations("auth");
  return (
    <section className="">
      {session ? (
        <>
          <SectionTitle weight={500}>{t("alreadyIn")}</SectionTitle>
          <div className="flex items-center gap-4">
            <p className="shared-btn shared-btn-solid">
              <LogoutButton />
            </p>
            <Link href="/">{t2("goBackHome")}</Link>
          </div>
        </>
      ) : (
        <>
          <SectionTitle weight={500}>{t("loginTo")}</SectionTitle>
          <p className="text-base">{t2("enterDetails")}</p>
          <LoginForm />
        </>
      )}
    </section>
  );
}
