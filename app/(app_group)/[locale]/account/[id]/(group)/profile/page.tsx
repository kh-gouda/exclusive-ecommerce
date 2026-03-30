import EditProfileForm from "@ui/account/EditProfileForm";
import FormTitle from "@ui/account/FormTitle";
import { getTranslations } from "next-intl/server";

export default async function Account() {
  const t = await getTranslations("accountManagement");
  return (
    <>
      <FormTitle>{t("editProfile")}</FormTitle>
      <EditProfileForm />
    </>
  );
}
