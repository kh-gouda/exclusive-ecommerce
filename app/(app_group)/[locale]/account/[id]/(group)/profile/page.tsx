import EditProfileForm from "@ui/account/EditProfileForm";
import FormTitle from "@ui/account/FormTitle";
import { getTranslations } from "next-intl/server";
import { getPageMetadata } from "@/app/lib/getPageMetadata";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const param = await params;
  return getPageMetadata({
    locale: param.locale,
    page: "profile",
    path: "/account/[id]/profile",
  });
}
export default async function Account() {
  const t = await getTranslations("accountManagement");
  return (
    <>
      <FormTitle>{t("editProfile")}</FormTitle>
      <EditProfileForm />
    </>
  );
}
