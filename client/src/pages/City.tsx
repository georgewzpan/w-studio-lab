/**
 * W Studio Lab — /city 占位页
 * 城市数字实验室
 */
import { useTranslation } from "react-i18next";
import PlaceholderPage from "./PlaceholderPage";

export default function City() {
  const { t } = useTranslation();
  return (
    <PlaceholderPage
      moduleId="city"
      title={t("pages.city.title")}
      subtitle={t("pages.city.subtitle")}
      description={t("pages.city.description")}
      tags={(t("pages.city.tags", { returnObjects: true }) as string[])}
      status="active"
      statusLabel={t("modules.city.statusLabel")}
      externalLink="https://pudongviz-lsnmlvkw.manus.space/"
      externalLinkLabel={t("pages.city.externalLinkLabel")}
    />
  );
}
