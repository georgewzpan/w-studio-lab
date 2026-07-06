/**
 * W Studio Lab — Footer
 * 极简页脚，数据来源致谢小字注明
 */
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border mt-20">
      <div className="container py-8">
        <div className="wsl-divider mb-6" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              W Studio Lab
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("footer.tagline")}
            </p>
          </div>
          <div className="text-xs text-muted-foreground space-y-1 text-right">
            <p>{t("footer.dataWeather")}</p>
            <p>{t("footer.dataEnv")}</p>
            <p>{t("footer.dataCity")}</p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
          <p className="text-xs text-muted-foreground/60">
            {t("footer.copyright")}
          </p>
          <p className="text-xs font-mono text-muted-foreground/40">
            v0.1.0-mvp
          </p>
        </div>
      </div>
    </footer>
  );
}
