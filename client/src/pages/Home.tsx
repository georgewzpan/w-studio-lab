/**
 * W Studio Lab — Home Page (Landing Page)
 * Design: 极客暗夜 / Cyberpunk-Minimal (方案A 黑金科技风)
 *
 * Sections:
 * 1. Hero — 全宽 ≥80vh，左文字右轮播图（fig_A/B/C 自动轮播，3秒间隔）
 * 2. 探索研究方向 — 3×2 卡片网格
 * 3. 最新产出 — 3张横排卡片
 * 4. About — 极简个人介绍
 */
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getModuleIcon } from "@/components/ModuleIcons";
import { MODULES, RECENT_OUTPUTS, HERO_SLIDES } from "@/lib/mockData";
import { useTranslation } from "react-i18next";

// Helper: detect external URLs
const isExternal = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://");

// Hero background image (generated dark tech pattern)
const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/hero_bg-jSvvRMAd4fHwd353MgLC6G.webp";

export default function Home() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const matrixRef = useRef<HTMLElement>(null);
  // Hero carousel state
  const [slideIdx, setSlideIdx] = useState(0);
  const slideCount = HERO_SLIDES.length;

  // Auto-advance every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % slideCount);
    }, 3000);
    return () => clearInterval(timer);
  }, [slideCount]);

  const prevSlide = () => setSlideIdx((prev) => (prev - 1 + slideCount) % slideCount);
  const nextSlide = () => setSlideIdx((prev) => (prev + 1) % slideCount);

  const scrollToMatrix = () => {
    matrixRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
          全宽 ≥80vh，左文字右轮播图（fig_A/B/C 自动轮播）
          ══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[85vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/75" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="container relative z-10 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-primary/30 bg-primary/5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono text-primary tracking-widest uppercase">
                  {t("home.badge")}
                </span>
              </div>

              {/* Main title */}
              <div className="space-y-1">
                <h1
                  className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  W Studio Lab
                </h1>
                {/* Subtitle */}
                <p className="text-base text-muted-foreground font-light tracking-widest">
                  {t("home.subtitle")}
                </p>
              </div>

              {/* Tagline */}
              <p
                className="text-2xl font-semibold leading-snug"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="text-primary">{t("home.tagline")}</span>
              </p>
              <p className="text-base text-foreground/70 leading-relaxed max-w-lg -mt-3">
                {t("home.desc")}
              </p>

              {/* Divider */}
              <div className="w-16 h-px bg-primary/60" />

              {/* Quote */}
              <blockquote className="text-sm text-muted-foreground italic border-l-2 border-primary/40 pl-4 max-w-md">
                {t("home.quote")}
              </blockquote>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button onClick={scrollToMatrix} className="btn-gold">
                  {t("home.cta1")}
                  <ArrowRight size={16} />
                </button>
                <Link href="/weather" className="btn-ghost">
                  {t("home.cta2")}
                </Link>
              </div>

              {/* Tags: two rows */}
              <div className="space-y-2 pt-1">
                {/* Row 1: domain tags */}
                <div className="flex flex-wrap gap-2">
                  {(t("home.domainTags", { returnObjects: true }) as string[]).map((tag: string) => (
                    <span key={tag} className="wsl-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Row 2: tech tool tags (mostly English, no translation needed) */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Earth-2",
                    "Pangu-Weather",
                    "FuXi",
                    "WebGIS",
                    "Dify",
                    "Cloud Deploy",
                    "OPC全栈",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="wsl-tag"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Hero carousel (fig_A / fig_B / fig_C, auto-play 3s) */}
            <div className="hidden lg:block relative">
              <div
                className="relative rounded-lg overflow-hidden border border-primary/20"
                style={{
                  boxShadow:
                    "0 0 40px oklch(0.82 0.17 87 / 0.15), 0 0 80px oklch(0.82 0.17 87 / 0.05)",
                }}
              >
                {/* Slides */}
                <div className="relative w-full" style={{ aspectRatio: "16/7" }}>
                  {HERO_SLIDES.map((slide, i) => (
                    <img
                      key={i}
                      src={slide.src}
                      alt={slide.caption}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                      style={{ opacity: i === slideIdx ? 1 : 0 }}
                    />
                  ))}
                  {/* Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/40 z-10 pointer-events-none" />
                </div>

                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-gradient-to-t from-background/90 to-transparent">
                  <p className="text-xs font-mono text-primary/80">
                    {HERO_SLIDES[slideIdx].caption}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {HERO_SLIDES[slideIdx].sub}
                  </p>
                </div>

                {/* Prev / Next arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-background/60 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  aria-label={t("home.prevSlide")}
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-background/60 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  aria-label={t("home.nextSlide")}
                >
                  <ChevronRight size={14} />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-10 right-3 z-30 flex gap-1.5">
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIdx(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === slideIdx ? "bg-primary w-4" : "bg-primary/30"
                      }`}
                      aria-label={t("home.slideN", { n: i + 1 })}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative corners */}
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          探索研究方向（六模块矩阵）
          ══════════════════════════════════════════════════════ */}
      <section ref={matrixRef} className="py-20" id="modules">
        <div className="container">
          {/* Section header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="wsl-divider flex-1" />
              <span className="text-xs font-mono text-primary tracking-widest uppercase px-3">
                {t("home.researchModules")}
              </span>
              <div className="wsl-divider flex-1" />
            </div>
            <h2 className="section-title text-3xl">{t("home.researchTitle")}</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              {t("home.researchDesc")}
            </p>
          </div>

          {/* 3×2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map((mod, i) => {
              const ModWrapper = ({ children }: { children: React.ReactNode }) =>
                isExternal(mod.href) ? (
                  <a
                    href={mod.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {children}
                  </a>
                ) : (
                  <Link href={mod.href} className="block h-full">
                    {children}
                  </Link>
                );
              return (
                <ModWrapper key={mod.id}>
                  <div
                    className="wsl-card p-6 h-full group cursor-pointer"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {/* Top row: icon + status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded border border-border bg-muted/30 flex items-center justify-center text-primary group-hover:border-primary/50 transition-colors">
                        {getModuleIcon(mod.id, "text-primary", 24)}
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                          mod.status === "dev"
                            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            : "bg-primary/10 text-primary border border-primary/20"
                        }`}
                      >
                        {mod.status === "dev" ? t("home.statusDev") : "✅ " + t(`modules.${mod.id}.statusLabel`)}
                      </span>
                    </div>

                    {/* Module name */}
                    <h3
                      className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {t(`modules.${mod.id}.name`)}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {t(`modules.${mod.id}.description`)}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {mod.tags.map((tag) => (
                        <span key={tag} className="wsl-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-1 text-xs text-primary/70 group-hover:text-primary transition-colors mt-auto">
                      <span>{t("home.enter")}</span>
                      <ChevronRight
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </ModWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          最新产出
          ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/5 border-t border-border">
        <div className="container">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="wsl-divider flex-1" />
              <span className="text-xs font-mono text-primary tracking-widest uppercase px-3">
                {t("home.recentOutputs")}
              </span>
              <div className="wsl-divider flex-1" />
            </div>
            <h2 className="section-title text-3xl">{t("home.recentTitle")}</h2>
            <p className="text-muted-foreground mt-2">{t("home.recentDesc")}</p>
          </div>

          {/* 此处后续对接真实API：GET /api/posts/recent?limit=3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {RECENT_OUTPUTS.map((item) => {
              const ItemWrapper = ({ children }: { children: React.ReactNode }) =>
                isExternal(item.href) ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {children}
                  </a>
                ) : (
                  <Link href={item.href} className="block">
                    {children}
                  </Link>
                );
              return (
                <ItemWrapper key={item.id}>
                  <div className="wsl-card group cursor-pointer overflow-hidden">
                    {/* Thumbnail */}
                    <div className="relative h-44 overflow-hidden bg-muted">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      <span className="absolute top-3 left-3 text-xs px-2 py-0.5 rounded bg-primary/90 text-primary-foreground font-mono">
                        {item.module}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-muted-foreground">
                          {item.date}
                        </span>
                        <span className="text-xs text-primary/70 group-hover:text-primary transition-colors flex items-center gap-1">
                          {t("home.view")}
                          <ChevronRight size={10} />
                        </span>
                      </div>
                    </div>
                  </div>
                </ItemWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ABOUT SECTION
          ══════════════════════════════════════════════════════ */}
      <section className="py-20" id="about">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="wsl-divider flex-1" />
            <span className="text-xs font-mono text-primary tracking-widest uppercase px-3">
              About
            </span>
            <div className="wsl-divider flex-1" />
          </div>

          <div className="max-w-3xl mx-auto">
            {/* W monogram */}
            <div
              className="w-16 h-16 rounded border border-primary/30 flex items-center justify-center mb-8 mx-auto"
              style={{ background: "oklch(from var(--wsl-gold) l c h / 0.06)" }}
            >
              <span
                className="text-2xl font-bold text-primary"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                W
              </span>
            </div>

            <h2 className="section-title text-3xl text-center mb-8">{t("home.about.title")}</h2>

            {/* Main quote */}
            <blockquote className="text-base text-foreground/80 leading-relaxed border-l-2 border-primary/40 pl-6 mb-6">
              {t("home.about.quote")}
            </blockquote>

            {/* WSL name note */}
            <p className="text-sm text-muted-foreground pl-6 mb-6 italic">
              {t("home.about.wslNote")}
            </p>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed pl-6">
              {t("home.about.description")}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
