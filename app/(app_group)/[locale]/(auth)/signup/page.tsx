import { authOptions } from "@/app/lib/auth";
import LogoutButton from "@ui/layout/header/LogoutButton";
import SectionTitle from "@ui/shared/SectionTitle";
import SignupForm from "@ui/signup/SignupForm";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Signup() {
  const t = await getTranslations("sectionTitle");
  const t2 = await getTranslations("auth");
  const session = await getServerSession(authOptions);
  return (
    <section className="">
      {session ? (
        <>
          <SectionTitle weight={500}>{t("alreadyIn")}</SectionTitle>
          <div className="flex items-center gap-4">
            <p className="shared-btn shared-btn-solid">
              <LogoutButton />
            </p>
            <Link href="/">{t2("orBackHome")}</Link>
          </div>
        </>
      ) : (
        <>
          <SectionTitle weight={500}>{t("createAccount")}</SectionTitle>
          <p className="text-base">{t2("enterDetails")}</p>

          <SignupForm />

          <p className="mt-8.5 text-center">
            <span>{t2("haveAccount?")}</span>
            <Link
              className="font-medium border-b border-gray-300 ms-2 pb-1"
              href="/login"
            >
              {t2("login")}
            </Link>
          </p>
        </>
      )}
    </section>
  );
}
