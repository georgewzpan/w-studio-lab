/**
 * W Studio Lab — /energy 占位页
 * 能碳与新能源
 */
import { useTranslation } from "react-i18next";
import PlaceholderPage from "./PlaceholderPage";

export default function Energy() {
  const { t } = useTranslation();
  return (
    <PlaceholderPage
      moduleId="energy"
      title={t("pages.energy.title")}
      subtitle={t("pages.energy.subtitle")}
      description={t("pages.energy.description")}
      tags={(t("pages.energy.tags", { returnObjects: true }) as string[])}
      status="dev"
      statusLabel={t("modules.energy.statusLabel")}
      externalLink="http://121.89.88.210:3001/login"
      externalLinkLabel={t("pages.energy.externalLinkLabel")}
      externalLinkNote={t("pages.energy.externalLinkNote")}
      comingSoonNote={t("pages.energy.comingSoonNote")}
    />
  );
}
