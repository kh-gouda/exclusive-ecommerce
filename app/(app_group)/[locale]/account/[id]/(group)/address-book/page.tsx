import EditAddressForm from "@ui/account/EditAddressForm";
import FormTitle from "@ui/account/FormTitle";
import { getTranslations } from "next-intl/server";

export default async function AddressBook() {
  const t = await getTranslations();
  return (
    <>
      <FormTitle>{t("accountManagement.editAddressBook")}</FormTitle>
      <EditAddressForm />
    </>
  );
}
