/**
 * W Studio Lab — Home Page (Landing Page)
 * Design: 极客暗夜 / Cyberpunk-Minimal (方案A 黑金科技风)
 *
 * Sections:
 * 1. Hero — 全宽 ≥80vh，左文字右图片
 * 2. 六模块能力矩阵 — 3×2 卡片网格
 * 3. 最新产出 — 3张横排卡片
 * 4. About — 极简个人介绍
 */
import { useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ExternalLink, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getModuleIcon } from "@/components/ModuleIcons";
import { MODULES, RECENT_OUTPUTS } from "@/lib/mockData";

// Hero background image (generated)
const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/hero_bg-jSvvRMAd4fHwd353MgLC6G.webp";

// fig_A used as hero right-side visual (500hPa weather map)
const FIG_A_CDN =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fig_A_final_77f3008c.webp";

export default function Home() {
  const matrixRef = useRef<HTMLElement>(null);

  const scrollToMatrix = () => {
    matrixRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
          全宽 ≥80vh，左文字右图片，背景为生成的气象等压线图
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
                  Independent Tech Lab
                </span>
              </div>

              {/* Main title */}
              <div className="space-y-2">
                <h1
                  className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  W Studio Lab
                </h1>
                <p className="text-lg text-muted-foreground font-light tracking-wide">
                  工作室实验室
                </p>
              </div>

              {/* Tagline */}
              <p className="text-xl text-foreground/80 leading-relaxed max-w-lg">
                AI · 气象模式 · 城市科学
                <br />
                <span className="text-primary font-medium">独立技术实验室</span>
              </p>

              {/* Divider */}
              <div className="w-16 h-px bg-primary/60" />

              {/* Quote */}
              <blockquote className="text-sm text-muted-foreground italic border-l-2 border-primary/40 pl-4 max-w-md">
                跑过WRF，写过标书，现在用Earth-2预报华东天气。
              </blockquote>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/weather" className="btn-gold">
                  探索气象预报
                  <ArrowRight size={16} />
                </Link>
                <button onClick={scrollToMatrix} className="btn-ghost">
                  查看全部作品
                </button>
              </div>

              {/* Tech stack hint */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["Pangu-Weather", "Earth-2", "WRF", "WebGIS", "FastAPI"].map((tag) => (
                  <span key={tag} className="wsl-tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Right: Weather map visual */}
            <div className="hidden lg:block relative">
              <div
                className="relative rounded-lg overflow-hidden border border-primary/20"
                style={{
                  boxShadow: "0 0 40px oklch(0.82 0.17 87 / 0.15), 0 0 80px oklch(0.82 0.17 87 / 0.05)",
                }}
              >
                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/40 z-10 pointer-events-none" />
                <img
                  src={FIG_A_CDN}
                  alt="华东500hPa位势高度场分析图 — Pangu-Weather"
                  className="w-full object-cover"
                  style={{ maxHeight: "420px", objectPosition: "center" }}
                />
                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-gradient-to-t from-background/90 to-transparent">
                  <p className="text-xs font-mono text-primary/80">
                    500hPa Geopotential Height · Init: 2026-03-27 12UTC
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Pangu-Weather / NVIDIA Earth-2
                  </p>
                </div>
              </div>
              {/* Decorative corner */}
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          六模块能力矩阵
          ══════════════════════════════════════════════════════ */}
      <section ref={matrixRef} className="py-20" id="modules">
        <div className="container">
          {/* Section header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="wsl-divider flex-1" />
              <span className="text-xs font-mono text-primary tracking-widest uppercase px-3">
                Research Modules
              </span>
              <div className="wsl-divider flex-1" />
            </div>
            <h2 className="section-title text-3xl">六大研究方向</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              跨领域科学计算与AI工程应用，从大气模式到城市数字孪生
            </p>
          </div>

          {/* 3×2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map((mod, i) => (
              <Link key={mod.id} href={mod.href}>
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
                      {mod.status === "dev" ? "🔄 开发中" : "✅ " + mod.statusLabel}
                    </span>
                  </div>

                  {/* Module name */}
                  <h3
                    className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {mod.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {mod.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {mod.tags.map((tag) => (
                      <span key={tag} className="wsl-tag">{tag}</span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-1 text-xs text-primary/70 group-hover:text-primary transition-colors mt-auto">
                    <span>进入</span>
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          最新产出
          ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/5">
        <div className="container">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="wsl-divider flex-1" />
              <span className="text-xs font-mono text-primary tracking-widest uppercase px-3">
                Recent Outputs
              </span>
              <div className="wsl-divider flex-1" />
            </div>
            <h2 className="section-title text-3xl">最新产出</h2>
            <p className="text-muted-foreground mt-2">近期分析图与项目成果</p>
          </div>

          {/* 此处后续对接真实API：GET /api/posts/recent?limit=3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {RECENT_OUTPUTS.map((item) => (
              <Link key={item.id} href={item.href}>
                <div className="wsl-card group cursor-pointer overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative h-44 overflow-hidden bg-muted">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    {/* Module tag */}
                    <span className="absolute top-3 left-3 wsl-tag text-[10px]">
                      {item.module}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3
                      className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-snug"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-mono text-muted-foreground/60">
                        {item.date}
                      </span>
                      <ExternalLink size={12} className="text-primary/50 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          About
          ══════════════════════════════════════════════════════ */}
      <section className="py-20" id="about">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="wsl-divider flex-1" />
              <span className="text-xs font-mono text-primary tracking-widest uppercase px-3">
                About
              </span>
              <div className="wsl-divider flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Left: avatar placeholder */}
              <div className="flex justify-center md:justify-start">
                <div
                  className="w-24 h-24 rounded border border-primary/30 flex items-center justify-center bg-muted/20"
                  style={{ boxShadow: "0 0 20px oklch(0.82 0.17 87 / 0.1)" }}
                >
                  <span
                    className="text-3xl font-bold text-primary"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    W
                  </span>
                </div>
              </div>

              {/* Right: bio */}
              <div className="md:col-span-2 space-y-4">
                <h2 className="section-title text-2xl">关于</h2>
                <blockquote className="text-base text-foreground/80 italic border-l-2 border-primary/40 pl-4 leading-relaxed">
                  从探空气球到盘古大模型，从GIS测绘老建筑到AI出图，从超算机房到云GPU——工具换了，但一直在研究同一件事：如何让数据说出它本来想说的话。
                </blockquote>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  W Studio Lab 是一个独立技术实验室，专注于跨领域科学计算与AI工程应用。
                  核心方向包括AI气象大模型推理、新能源功率预测、城市数字孪生与工程AI实践。
                  技术说话，不过度包装。
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    "气象数值模式",
                    "AI大模型推理",
                    "GIS空间分析",
                    "新能源预测",
                    "全栈工程",
                  ].map((skill) => (
                    <span key={skill} className="wsl-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
