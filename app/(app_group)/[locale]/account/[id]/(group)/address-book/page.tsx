import EditAddressForm from "@ui/account/EditAddressForm";
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
    page: "addressBook",
    path: "/account/[id]/address-book",
  });
}

export default async function AddressBook() {
  const t = await getTranslations();
  return (
    <>
      <FormTitle>{t("accountManagement.editAddressBook")}</FormTitle>
      <EditAddressForm />
    </>
  );
}
