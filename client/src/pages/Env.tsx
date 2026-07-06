/**
 * W Studio Lab — /env 占位页
 * 环境监测
 */
import { useTranslation } from "react-i18next";
import PlaceholderPage from "./PlaceholderPage";

export default function Env() {
  const { t } = useTranslation();
  return (
    <PlaceholderPage
      moduleId="env"
      title={t("pages.env.title")}
      subtitle={t("pages.env.subtitle")}
      description={t("pages.env.description")}
      tags={(t("pages.env.tags", { returnObjects: true }) as string[])}
      status="active"
      statusLabel={t("modules.env.statusLabel")}
      externalLink="https://changzhouaqi-8tepdfcr.manus.space/"
      externalLinkLabel={t("pages.env.externalLinkLabel")}
    />
  );
}
