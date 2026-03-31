import SectionTitle from "@ui/shared/SectionTitle";
import { getTranslations } from "next-intl/server";

export default async function AboutMain() {
  const t = await getTranslations("sectionTitle");
  const t2 = await getTranslations("aboutPage");
  return (
    <div className="flex *:flex-1 flex-wrap min-h-176.25 gap-25 pt-20 pb-35 max-[1190px]:px-2 max-[950px]:gap-10 max-[900px]:pt-10 max-[900px]:pb-20 max-[900px]:min-h-auto">
      <div className="flex items-center justify-end max-[900px]:justify-center">
        <div className="max-w-131.25">
          <SectionTitle size="54px" weight={500}>
            {t("ourStory")}
          </SectionTitle>
          <p className="mt-10 mb-6">{t2("p1")}</p>
          <p>{t2("p2")}</p>
        </div>
      </div>
      <div className="bg-about-area rounded-s-sm max-[900px]:hidden"></div>
    </div>
  );
}
