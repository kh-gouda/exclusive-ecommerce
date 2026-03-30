import Container from "@ui/shared/Container";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function DashBoarddLink() {
  const t = await getTranslations("dashboard");

  return (
    <div className="bg-gray-100">
      <Container>
        <div className="py-2 flex items-center justify-end">
          <Link href="/dashboard" className="shared-btn shared-btn-transparent">
            {t("AdminDashbaord")}
          </Link>
        </div>
      </Container>
    </div>
  );
}
