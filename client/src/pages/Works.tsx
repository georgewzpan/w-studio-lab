/**
 * W Studio Lab — /works 占位页
 * 工程AI作品集（脱敏展示）
 */
import { useTranslation } from "react-i18next";
import PlaceholderPage from "./PlaceholderPage";

export default function Works() {
  const { t } = useTranslation();
  return (
    <PlaceholderPage
      moduleId="works"
      title={t("pages.works.title")}
      subtitle={t("pages.works.subtitle")}
      description={t("pages.works.description")}
      tags={(t("pages.works.tags", { returnObjects: true }) as string[])}
      status="active"
      statusLabel={t("modules.works.statusLabel")}
    />
  );
}
