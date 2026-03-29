/**
 * W Studio Lab — /weather 页面
 * Design: 极客暗夜 / Cyberpunk-Minimal (方案A 黑金科技风)
 *
 * FuXi 7天预报，6变量，日期联动切换器
 * 每张图是7列拼接的完整图片，用CSS overflow裁剪显示对应列
 * 6张图同步联动，点击日期6张图同时切换
 * 单列放大显示，视觉冲击力远强于7列横排
 *
 * 此处后续对接真实API：GET /api/weather/fuxi/latest
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FUXI_FIGURES, FUXI_DATES, WEATHER_META, WeatherFigure } from "@/lib/mockData";

// ─── Single figure card with date-sliced view ─────────────────────────────────
// Each image is a 7-column horizontal strip; we show only 1 column at a time
// using overflow:hidden + translateX to pan to the correct column.
function FigureCard({
  fig,
  dayIdx,
  onZoom,
}: {
  fig: WeatherFigure;
  dayIdx: number;
  onZoom: (fig: WeatherFigure, dayIdx: number) => void;
}) {
  const totalCols = 7;
  // translateX shifts the image left so the correct column is visible.
  // The container is 100% wide and shows 1/7 of the image.
  // Image width = 700% of container, so each column = 100% of container.
  // To show column N: translateX = -(N * 100/7)% of image width
  //                               = -(N * 100/7 / 7)% of container width
  // Simpler: image width = totalCols * 100%, translateX = -(dayIdx * 100/totalCols)%
  const translateXPct = -(dayIdx * (100 / totalCols));

  return (
    <div className="wsl-card overflow-hidden group flex flex-col">
      {/* Figure header */}
      <div className="px-4 pt-4 pb-2 flex items-start justify-between gap-2 flex-shrink-0">
        <div className="min-w-0">
          <h3
            className="text-sm font-semibold text-foreground leading-snug"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {fig.title}
          </h3>
          <p className="text-xs font-mono text-primary/70 mt-0.5">{fig.variable}</p>
        </div>
        <button
          onClick={() => onZoom(fig, dayIdx)}
          className="flex-shrink-0 w-7 h-7 rounded border border-border bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
          title="放大查看"
          aria-label="放大查看"
        >
          <ZoomIn size={13} />
        </button>
      </div>

      {/* Image viewport: shows 1/7 of the full-width strip.
           Each original image is 7 columns wide, each column is ~1:1 square.
           Strategy: fill container height, let width = 7x container height.
           Then translateX by -(dayIdx * containerHeight) to pan to the right column.
           We use CSS: height=100%, width=auto, then translateX in px via a CSS var trick.
           Simpler: set height=100%, width=auto, and use a wrapper that clips.
           The image natural ratio is 7:1, so if height=100% of a 1:1 container,
           width = 700% of container height = 700% of container width (since 1:1).
           translateX = -(dayIdx / 7 * 100%) of image width = -(dayIdx * 100/7)% of image
           But image width = 700% of container, so 1% of image = 7% of container.
           translateX = -(dayIdx * 100/7)% of image = -(dayIdx * 100)% of container / 7
                      = -(dayIdx * 100/7)% of container ... same formula but applied to image.
           Using transform on the img: translateX(-(dayIdx/7 * 100)%) where % is relative to element itself.
           So: translateX(-${dayIdx * 100/7}%) */}
      <div
        className="relative overflow-hidden cursor-zoom-in flex-shrink-0"
        style={{ aspectRatio: "1 / 1", background: "#0a0a0a" }}
        onClick={() => onZoom(fig, dayIdx)}
      >
        <img
          src={fig.src}
          alt={`${fig.title} — ${FUXI_DATES[dayIdx].label}`}
          className="absolute top-0 left-0 transition-transform duration-300 ease-in-out"
          style={{
            height: "100%",
            width: "auto",
            maxWidth: "none",
            transform: `translateX(-${(dayIdx / totalCols) * 100}%)`,
          }}
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors pointer-events-none" />
        {/* Zoom hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-primary/50 bg-background/80 text-primary text-xs font-mono">
            <ZoomIn size={12} />
            点击放大
          </span>
        </div>
      </div>

      {/* Explanation */}
      <div className="px-4 py-3 flex-1">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {fig.explanation}
        </p>
      </div>
    </div>
  );
}

// ─── Lightbox modal ───────────────────────────────────────────────────────────
function Lightbox({
  fig,
  dayIdx,
  onClose,
  onPrevDay,
  onNextDay,
}: {
  fig: WeatherFigure;
  dayIdx: number;
  onClose: () => void;
  onPrevDay: () => void;
  onNextDay: () => void;
}) {
  const totalCols = 7;
  const translateXPct = -(dayIdx * (100 / totalCols));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/96 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3 gap-3">
          <div>
            <h3
              className="text-base font-semibold text-foreground"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {fig.title}
            </h3>
            <p className="text-xs font-mono text-primary/70 mt-0.5">
              {FUXI_DATES[dayIdx].label} · {fig.variable}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            aria-label="关闭"
          >
            <X size={16} />
          </button>
        </div>

        {/* Image */}
        <div
          className="relative overflow-hidden rounded border border-primary/20"
          style={{ aspectRatio: "1 / 1" }}
        >
          <img
            src={fig.src}
            alt={fig.title}
            className="absolute top-0 left-0 h-full transition-transform duration-300"
            style={{
              width: `${totalCols * 100}%`,
              transform: `translateX(${translateXPct}%)`,
            }}
          />
          {/* Prev day arrow */}
          <button
            onClick={onPrevDay}
            disabled={dayIdx === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/70 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="上一天"
          >
            <ChevronLeft size={16} />
          </button>
          {/* Next day arrow */}
          <button
            onClick={onNextDay}
            disabled={dayIdx === 6}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/70 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="下一天"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {FUXI_DATES.map((d, i) => (
            <button
              key={i}
              onClick={() => {
                // propagate day change to parent via onPrevDay/onNextDay is complex;
                // instead we expose a direct setter via a callback trick
                const diff = i - dayIdx;
                if (diff > 0) for (let k = 0; k < diff; k++) onNextDay();
                else if (diff < 0) for (let k = 0; k < -diff; k++) onPrevDay();
              }}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all ${
                i === dayIdx
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Explanation */}
        <p className="text-xs text-muted-foreground leading-relaxed mt-3 border-l-2 border-primary/30 pl-3">
          {fig.explanation}
        </p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Weather() {
  // Shared day index: all 6 figures sync to this
  const [dayIdx, setDayIdx] = useState(0);

  // Lightbox state
  const [lightbox, setLightbox] = useState<{
    fig: WeatherFigure;
    dayIdx: number;
  } | null>(null);

  const openLightbox = (fig: WeatherFigure, d: number) =>
    setLightbox({ fig, dayIdx: d });
  const closeLightbox = () => setLightbox(null);
  const lightboxPrevDay = () =>
    setLightbox((prev) =>
      prev && prev.dayIdx > 0 ? { ...prev, dayIdx: prev.dayIdx - 1 } : prev
    );
  const lightboxNextDay = () =>
    setLightbox((prev) =>
      prev && prev.dayIdx < 6 ? { ...prev, dayIdx: prev.dayIdx + 1 } : prev
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── Page header ── */}
      <div className="pt-24 pb-8 border-b border-border">
        <div className="container">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-6 font-mono"
          >
            <ArrowLeft size={12} />
            返回首页
          </Link>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-primary/30 bg-primary/5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono text-primary tracking-widest uppercase">
                  AI Weather Forecast · FuXi
                </span>
              </div>
              <h1
                className="text-3xl lg:text-4xl font-bold text-foreground"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                华东7天天气形势分析
              </h1>
              <p className="text-muted-foreground mt-2 text-sm max-w-xl leading-relaxed">
                基于<span className="text-foreground font-medium">FuXi（伏羲，复旦大学）</span>大模型，
                NVIDIA Earth-2 框架推理，2026-03-29 00UTC 起报，预报时效7天，输出6个变量。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["FuXi", "Earth-2", "7天预报", "6变量", "华东"].map((tag) => (
                <span key={tag} className="wsl-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky date selector (synchronized across all 6 figures) ── */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border py-3">
        <div className="container">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
              选择日期：
            </span>
            {/* Prev arrow */}
            <button
              onClick={() => setDayIdx((prev) => Math.max(0, prev - 1))}
              disabled={dayIdx === 0}
              className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="上一天"
            >
              <ChevronLeft size={14} />
            </button>
            {/* Date buttons */}
            {FUXI_DATES.map((d, i) => (
              <button
                key={i}
                onClick={() => setDayIdx(i)}
                className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                  i === dayIdx
                    ? "bg-primary text-primary-foreground border border-primary"
                    : "border border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                {d.label}
              </button>
            ))}
            {/* Next arrow */}
            <button
              onClick={() => setDayIdx((prev) => Math.min(6, prev + 1))}
              disabled={dayIdx === 6}
              className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="下一天"
            >
              <ChevronRight size={14} />
            </button>
            <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
              · 6张图同步联动 · 点击图片可放大
            </span>
          </div>
        </div>
      </div>

      {/* ── 6 Figure cards (2×3 grid) ── */}
      {/* 此处后续对接真实API：GET /api/weather/fuxi/latest */}
      <section className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FUXI_FIGURES.map((fig) => (
              <FigureCard
                key={fig.id}
                fig={fig}
                dayIdx={dayIdx}
                onZoom={openLightbox}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical pipeline ── */}
      <section className="py-12 bg-muted/5 border-t border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="wsl-divider flex-1" />
            <span className="text-xs font-mono text-primary tracking-widest uppercase px-3">
              Technical Pipeline
            </span>
            <div className="wsl-divider flex-1" />
          </div>

          {/* Pipeline steps */}
          <div className="flex flex-wrap items-center gap-2 justify-center mb-10">
            {[
              { step: "01", label: "GFS 0.25°", sub: "NOAA 全球分析场" },
              null,
              { step: "02", label: "FuXi 推理", sub: "约34分钟" },
              null,
              { step: "03", label: "zarr 输出", sub: "6变量存储" },
              null,
              { step: "04", label: "6变量可视化", sub: "Python matplotlib" },
            ].map((item, i) =>
              item === null ? (
                <span key={i} className="text-primary/40 text-lg font-mono">
                  →
                </span>
              ) : (
                <div key={i} className="wsl-card px-4 py-3 text-center min-w-[110px]">
                  <div className="text-xs font-mono text-primary mb-1">{item.step}</div>
                  <div className="text-sm font-semibold text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                </div>
              )
            )}
          </div>

          {/* Technical parameters table */}
          {/* 此处后续对接真实API：GET /api/weather/fuxi/meta */}
          <div className="max-w-2xl mx-auto">
            <h3
              className="text-base font-semibold text-foreground mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              技术参数
            </h3>
            <div className="wsl-card overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {(
                    [
                      ["模型", WEATHER_META.model],
                      ["推理框架", WEATHER_META.framework],
                      ["初始场", WEATHER_META.initData],
                      ["空间分辨率", WEATHER_META.resolution],
                      ["预报时效", WEATHER_META.forecastHours],
                      ["预报区域", WEATHER_META.region],
                      ["推理耗时", WEATHER_META.inferenceTime],
                      ["输出变量", WEATHER_META.outputVars],
                      ["起报时间", WEATHER_META.initTime],
                      ["技术管线", WEATHER_META.pipeline],
                    ] as [string, string][]
                  ).map(([key, val], i) => (
                    <tr key={key} className={i % 2 === 0 ? "bg-muted/10" : ""}>
                      <td className="px-4 py-2.5 font-mono text-xs text-primary/80 whitespace-nowrap w-28 align-top">
                        {key}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-foreground/80 leading-relaxed">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          fig={lightbox.fig}
          dayIdx={lightbox.dayIdx}
          onClose={closeLightbox}
          onPrevDay={lightboxPrevDay}
          onNextDay={lightboxNextDay}
        />
      )}

      <Footer />
    </div>
  );
}
