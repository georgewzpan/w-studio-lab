/**
 * W Studio Lab — /weather 页面
 * Design: 极客暗夜 / Cyberpunk-Minimal
 *
 * Sections:
 * 1. 页头区：标题 + 介绍
 * 2. 技术路线图（横向箭头流程）
 * 3. 三张分析图展示（4时次横排，可点击放大）
 * 4. 技术参数表
 */
import { useState } from "react";
import { X, ZoomIn, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WEATHER_FIGURES, WEATHER_META } from "@/lib/mockData";

// Lightbox component for fullscreen image view
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 p-2 rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
        onClick={onClose}
        aria-label="关闭"
      >
        <X size={20} />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain rounded border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

// Tech pipeline step
function PipelineStep({
  label,
  sub,
  isLast,
}: {
  label: string;
  sub: string;
  isLast?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center">
        <div className="px-3 py-2 rounded border border-primary/30 bg-primary/5 text-center min-w-[100px]">
          <p className="text-xs font-semibold text-primary" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {label}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{sub}</p>
        </div>
      </div>
      {!isLast && (
        <ChevronRight size={16} className="text-primary/40 flex-shrink-0" />
      )}
    </div>
  );
}

export default function Weather() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          Page Header
          ══════════════════════════════════════════════════════ */}
      <section className="pt-28 pb-12">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 font-mono">
            <span>W Studio Lab</span>
            <ChevronRight size={12} />
            <span className="text-primary">AI气象·模式预报</span>
          </div>

          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-primary/30 bg-primary/5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-primary tracking-widest uppercase">
                AI Weather Forecast · Active
              </span>
            </div>

            <h1
              className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              AI气象·模式预报
            </h1>

            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                基于<span className="text-foreground font-medium">盘古气象大模型（Pangu-Weather）</span>的华东地区72小时天气预报系统。
                盘古大模型由华为云研发，2023年发表于 Nature，是首个在中期天气预报精度上超越传统数值模式的AI模型。
              </p>
              <p>
                推理框架采用<span className="text-foreground font-medium">NVIDIA Earth-2 / earth2studio 0.9.0</span>，
                初始场数据来自 NOAA GFS 0.25° 全球分析场（公开免费实时获取）。
                每次推理耗时约60秒（NVIDIA P100 GPU），输出72小时、每24小时一个时次的预报产品。
              </p>
              <p>
                预报区域覆盖华东（105-130°E，22-45°N），叠加省级行政边界，输出变量包括
                500hPa位势高度场、850hPa风场、10m近地面风场及海平面气压。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          技术路线图
          ══════════════════════════════════════════════════════ */}
      <section className="py-10 border-y border-border bg-muted/5">
        <div className="container">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-6">
            // Technical Pipeline
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <PipelineStep label="GFS实时数据" sub="NOAA · 0.25° · 6h更新" />
            <PipelineStep label="Pangu24推理" sub="Earth-2框架 · ~60s" />
            <PipelineStep label="zarr格式输出" sub="72h · 4时次" />
            <PipelineStep label="Python可视化" sub="Matplotlib · CMA风格" />
            <PipelineStep label="华东分析图" sub="含省界 · 三变量" isLast />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          三张分析图展示
          ══════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="wsl-divider flex-1" />
              <span className="text-xs font-mono text-primary tracking-widest uppercase px-3">
                Analysis Figures
              </span>
              <div className="wsl-divider flex-1" />
            </div>
            <h2
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              气象分析图
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              4时次横排（起报 / +24h / +48h / +72h），点击图片可放大查看高清版
            </p>
          </div>

          {/* 此处后续对接真实API：GET /api/weather/figures?init=2026-03-27T12Z */}
          <div className="space-y-16">
            {WEATHER_FIGURES.map((fig, idx) => (
              <div key={fig.id} className="space-y-5">
                {/* Figure header */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded border border-primary/30 bg-primary/5 flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-primary">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold text-foreground"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {fig.title}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground/70 mt-0.5">
                      {fig.variable}
                    </p>
                  </div>
                </div>

                {/* Figure image — 4 time steps in one wide image */}
                <div
                  className="relative group cursor-pointer rounded-lg overflow-hidden border border-border hover:border-primary/40 transition-colors"
                  onClick={() => setLightbox({ src: fig.cdnUrl, alt: fig.title })}
                >
                  <img
                    src={fig.cdnUrl}
                    alt={fig.title}
                    className="w-full object-contain bg-muted/10"
                    style={{ maxHeight: "320px" }}
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 px-4 py-2 rounded border border-primary/50 bg-background/80 text-primary text-sm font-medium">
                      <ZoomIn size={16} />
                      点击放大
                    </div>
                  </div>
                  {/* Time labels overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-3">
                    <div className="flex justify-around">
                      {fig.timeLabels.map((label) => (
                        <span key={label} className="text-[9px] font-mono text-muted-foreground/80 text-center">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Meteorological explanation */}
                <div className="border-l-2 border-primary/30 pl-4 bg-muted/5 rounded-r py-3 pr-4">
                  <p className="text-xs font-mono text-primary/70 mb-1.5 uppercase tracking-wider">
                    // 气象学解释
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {fig.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          技术参数表
          ══════════════════════════════════════════════════════ */}
      <section className="py-16 border-t border-border bg-muted/5">
        <div className="container">
          <h2
            className="text-xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            技术参数
          </h2>
          {/* 此处后续对接真实API：GET /api/weather/meta */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {Object.entries({
                  "AI模型": WEATHER_META.model,
                  "推理框架": WEATHER_META.framework,
                  "初始场数据": WEATHER_META.initData,
                  "空间分辨率": WEATHER_META.resolution,
                  "预报时效": WEATHER_META.forecastHours,
                  "预报区域": WEATHER_META.region,
                  "推理耗时": WEATHER_META.inferenceTime,
                  "输出变量": WEATHER_META.outputVars,
                  "起报时间": WEATHER_META.initTime,
                }).map(([key, val]) => (
                  <tr key={key} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                    <td className="py-3 pr-6 font-mono text-xs text-primary/80 whitespace-nowrap w-32">
                      {key}
                    </td>
                    <td className="py-3 text-muted-foreground text-sm">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Data source note */}
          <p className="text-xs text-muted-foreground/50 mt-6 font-mono">
            数据来源：NOAA GFS 公开数据 · AI推理：NVIDIA Earth-2 / Pangu-Weather (Nature 2023)
          </p>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
