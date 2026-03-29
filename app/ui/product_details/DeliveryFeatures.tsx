import { ArrowPathIcon, TruckIcon } from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";

export default async function DeliveryFeatures() {
  const t = await getTranslations("deliveryFeatures");
  return (
    <div className="mt-10 py-6 border rounded-sm">
      <div className="flex items-center gap-4 border-b py-6 px-4 font-medium">
        <TruckIcon className="w-10 h-10" />
        <div>
          <h3>{t("feature1")}</h3>
          <p className="text-xs">{t("description1")}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 py-6 px-4 font-medium">
        <ArrowPathIcon className="w-10 h-10" />
        <div>
          <h3>{t("feature2")}</h3>
          <p className="text-xs">{t("description2")}</p>
        </div>
      </div>
    </div>
  );
}
