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
  // Thumbnail strategy: use object-fit cover + object-position to show the correct column.
  // Each column occupies (100/7)% of the image width.
  // object-position x = (dayIdx / (totalCols - 1)) * 100%
  // This tells the browser exactly which part of the image to show — no transform tricks,
  // full native resolution rendering, maximum sharpness.
  // object-position: 0% = leftmost column, 100% = rightmost column
  const objPosX = `${(dayIdx / (totalCols - 1)) * 100}%`;

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

      {/* Image viewport: uses object-fit:cover + object-position to crop to the correct column.
           The container has a 1:1 aspect ratio. The image is 7:1 wide.
           object-position x moves from 0% (col 0) to 100% (col 6) linearly.
           This is the highest-quality cropping method — no scaling artifacts. */}
      <div
        className="relative overflow-hidden cursor-zoom-in flex-shrink-0 bg-[#0a0a0a]"
        style={{ aspectRatio: "1 / 1" }}
        onClick={() => onZoom(fig, dayIdx)}
      >
        <img
          src={fig.src}
          alt={`${fig.title} — ${FUXI_DATES[dayIdx].label}`}
          className="w-full h-full transition-all duration-300 ease-in-out"
          style={{
            objectFit: "cover",
            objectPosition: `${objPosX} center`,
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
// Shows the FULL 7-column image (no cropping) with a highlight overlay on the
// current day's column. This gives maximum clarity and full context.
function Lightbox({
  fig,
  dayIdx,
  onClose,
  onPrevDay,
  onNextDay,
  onSetDay,
}: {
  fig: WeatherFigure;
  dayIdx: number;
  onClose: () => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onSetDay: (i: number) => void;
}) {
  const totalCols = 7;
  // The highlight column overlay: left = dayIdx/7 * 100%, width = 1/7 * 100%
  const highlightLeft = `${(dayIdx / totalCols) * 100}%`;
  const highlightWidth = `${(1 / totalCols) * 100}%`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3 gap-3">
          <div>
            <h3
              className="text-base font-semibold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {fig.title}
            </h3>
            <p className="text-xs font-mono text-yellow-400/80 mt-0.5">
              当前选中：{FUXI_DATES[dayIdx].label} · {fig.variable} · 点击其他列切换日期
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors"
            aria-label="关闭"
          >
            <X size={16} />
          </button>
        </div>

        {/* Full 7-column image with highlight overlay */}
        <div
          className="relative overflow-hidden rounded border border-white/10"
          style={{ aspectRatio: "7 / 1" }}
        >
          {/* Full image — no cropping */}
          <img
            src={fig.src}
            alt={fig.title}
            className="w-full h-full object-cover"
          />
          {/* Dim overlay for non-selected columns */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          {/* Highlight: remove dimming from the selected column */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none transition-all duration-300"
            style={{
              left: highlightLeft,
              width: highlightWidth,
              background: "transparent",
              boxShadow: "inset 0 0 0 2px rgba(245,197,24,0.8)",
              // Clear the dim overlay for this column
              backdropFilter: "brightness(1.3)",
            }}
          />
          {/* Clickable column zones for day switching */}
          {FUXI_DATES.map((_, i) => (
            <button
              key={i}
              onClick={() => onSetDay(i)}
              className="absolute top-0 bottom-0 cursor-pointer"
              style={{
                left: `${(i / totalCols) * 100}%`,
                width: `${(1 / totalCols) * 100}%`,
                background: "transparent",
              }}
              aria-label={`切换到 ${FUXI_DATES[i].label}`}
            />
          ))}
          {/* Date label on highlighted column */}
          <div
            className="absolute bottom-2 pointer-events-none transition-all duration-300"
            style={{
              left: highlightLeft,
              width: highlightWidth,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span className="text-[10px] font-mono bg-yellow-400 text-black px-1.5 py-0.5 rounded font-bold">
              {FUXI_DATES[dayIdx].label}
            </span>
          </div>
          {/* Prev / Next arrows */}
          <button
            onClick={onPrevDay}
            disabled={dayIdx === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-yellow-400/20 hover:border-yellow-400/50 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="上一天"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={onNextDay}
            disabled={dayIdx === 6}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-yellow-400/20 hover:border-yellow-400/50 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="下一天"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day selector dots below image */}
        <div className="flex justify-center gap-1.5 mt-3">
          {FUXI_DATES.map((d, i) => (
            <button
              key={i}
              onClick={() => onSetDay(i)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all ${
                i === dayIdx
                  ? "bg-yellow-400 text-black font-bold"
                  : "text-white/50 hover:text-white border border-white/10 hover:border-white/30"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Explanation */}
        <p className="text-xs text-white/60 leading-relaxed mt-3 border-l-2 border-yellow-400/40 pl-3">
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
          onSetDay={(i) => setLightbox((prev) => prev ? { ...prev, dayIdx: i } : prev)}
        />
      )}

      <Footer />
    </div>
  );
}
