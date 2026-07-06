/**
 * W Studio Lab — Navbar
 * Design: 黑金科技风 — 顶部固定导航，左侧品牌名，中间导航链接，右侧 A/B/C 配色切换器
 * 背景：半透明深黑 + blur，滚动后加深
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe } from "lucide-react";
import { useTheme, type ColorTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

// Theme switcher button config (labels are single letters, titles use i18n)
const THEMES: { id: ColorTheme; label: string; dot: string; titleKey: string }[] = [
  { id: "a", label: "A", dot: "#F5C518", titleKey: "nav.themeA" },
  { id: "b", label: "B", dot: "#FF6B35", titleKey: "nav.themeB" },
  { id: "c", label: "C", dot: "#0ABAB5", titleKey: "nav.themeC" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { colorTheme, setColorTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const isEn = i18n.language === "en";

  const toggleLang = () => {
    const next = isEn ? "zh" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  };

  const NAV_LINKS = [
    { href: "/weather", label: t("nav.weather") },
    { href: "/energy", label: t("nav.energy") },
    { href: "/env", label: t("nav.env") },
    { href: "/city", label: t("nav.city") },
    { href: "/works", label: t("nav.works") },
    { href: "/notes", label: t("nav.notes") },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-8 h-8 rounded flex items-center justify-center border border-primary/40 group-hover:border-primary transition-colors">
            <span className="text-primary font-mono font-bold text-sm">W</span>
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-foreground font-bold text-sm tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              W Studio Lab
            </span>
            <span className="text-muted-foreground text-[10px] tracking-widest uppercase">
              {t("nav.brandSubtitle")}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                location === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Lang + Theme switcher + mobile toggle */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* Language Switcher — prominent pill */}
          <button
            onClick={toggleLang}
            title={t("nav.langSwitchTitle")}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-primary/60 bg-primary/10 hover:bg-primary/20 hover:border-primary transition-all duration-200 text-primary font-mono font-bold text-xs tracking-wider shadow-sm hover:shadow-primary/20 hover:shadow-md"
          >
            <Globe size={13} className="flex-shrink-0" />
            <span>{t("nav.langSwitch")}</span>
          </button>

          {/* A/B/C Theme Switcher */}
          <div
            className="hidden md:flex items-center gap-1 px-2 py-1 rounded border border-border bg-muted/20"
            title={t("nav.colorScheme")}
          >
            {THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => setColorTheme(th.id)}
                title={t(th.titleKey)}
                aria-label={t(th.titleKey)}
                className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all duration-200 ${
                  colorTheme === th.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: th.dot, opacity: colorTheme === th.id ? 1 : 0.6 }}
                />
                {th.label}
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border">
          <nav className="container py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm rounded transition-colors ${
                  location === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile lang + theme switcher */}
            <div className="mt-3 pt-3 border-t border-border">
              <button
                onClick={() => { toggleLang(); setMobileOpen(false); }}
                className="flex items-center gap-2 px-3 py-2 w-full text-sm rounded border-2 border-primary/60 bg-primary/10 text-primary font-mono font-bold mb-3 hover:bg-primary/20 transition-colors"
              >
                <Globe size={14} />
                {t("nav.langSwitchFull")}
              </button>
              <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest mb-2 px-3">
                {t("nav.colorScheme")}
              </p>
              <div className="flex gap-2 px-3">
                {THEMES.map((th) => (
                  <button
                    key={th.id}
                    onClick={() => {
                      setColorTheme(th.id);
                      setMobileOpen(false);
                    }}
                    title={t(th.titleKey)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold border transition-all duration-200 ${
                      colorTheme === th.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "text-muted-foreground border-border hover:text-foreground hover:border-primary/40"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: th.dot }}
                    />
                    {th.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
