/**
 * W Studio Lab — /weather 页面
 * Design: 极客暗夜 / Cyberpunk-Minimal (方案A 黑金科技风)
 *
 * FuXi 7天预报，6变量，日期联动切换器
 * 原图尺寸：4176×559px，7列拼接，每列约 596×559px（宽高比 ~1.066:1）
 *
 * 缩略图策略：
 *   - 容器固定高度，宽度 = 高度 × (596/559)，overflow:hidden
 *   - 图片 height:100%; width:auto; max-width:none（保持原始宽高比，不拉伸）
 *   - margin-left 负值精确像素偏移，每列 = 容器宽度
 *   - 图片只缩小不放大，清晰度等于原图缩放清晰度
 *
 * Lightbox 策略：
 *   - 容器高度 = min(原图高度559px, 80vh)，宽度 = 高度 × (596/559)
 *   - 图片 height:100%; width:auto; max-width:none
 *   - margin-left 负值精确像素偏移
 *   - 图片以接近原始分辨率显示，最大清晰度
 *
 * 此处后续对接真实API：GET /api/weather/fuxi/latest
 */
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FUXI_FIGURES, FUXI_DATES, WEATHER_META, WeatherFigure } from "@/lib/mockData";

// Original image dimensions (7-column strip)
const ORIG_W = 4176; // total width px
const ORIG_H = 559;  // height px
const TOTAL_COLS = 7;
const COL_W = ORIG_W / TOTAL_COLS; // ~596.57px per column
const COL_ASPECT = COL_W / ORIG_H; // ~1.0672 — width:height ratio of one column

// ─── Single figure card with date-sliced view ─────────────────────────────────
// Container has a fixed height; width = height × COL_ASPECT.
// img: height:100%; width:auto; max-width:none — renders at native aspect ratio, only scaled down.
// margin-left = -(dayIdx × containerWidth) — pixel-perfect column selection.
function FigureCard({
  fig,
  dayIdx,
  onZoom,
}: {
  fig: WeatherFigure;
  dayIdx: number;
  onZoom: (fig: WeatherFigure, dayIdx: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth));
    ro.observe(el);
    setContainerW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // margin-left shifts the full-width image left by dayIdx columns
  const marginLeft = containerW > 0 ? -(dayIdx * containerW) : 0;

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

      {/* Image viewport:
           - Container: width fills card, height = width / COL_ASPECT (matches one column's aspect ratio)
           - overflow:hidden clips to exactly one column
           - img: height:100%; width:auto; max-width:none — native aspect ratio, only downscaled
           - margin-left: -(dayIdx × containerWidth) — pixel-perfect column pan */}
      <div
        ref={containerRef}
        className="relative overflow-hidden cursor-zoom-in flex-shrink-0 bg-[#f8f8f8] w-full"
        style={{ aspectRatio: `${COL_ASPECT} / 1` }}
        onClick={() => onZoom(fig, dayIdx)}
      >
        {containerW > 0 && (
          <img
            src={fig.src}
            alt={`${fig.title} — ${FUXI_DATES[dayIdx].label}`}
            style={{
              height: "100%",
              width: "auto",
              maxWidth: "none",
              display: "block",
              marginLeft: `${marginLeft}px`,
              transition: "margin-left 0.3s ease-in-out",
            }}
            loading="lazy"
          />
        )}
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
// Shows the current day's column at maximum resolution.
// Container height = min(ORIG_H px, 80vh); width = height × COL_ASPECT.
// img: height:100%; width:auto; max-width:none — renders at native resolution (no upscale).
// margin-left = -(dayIdx × containerWidth) — pixel-perfect column selection.
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth));
    ro.observe(el);
    setContainerW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const marginLeft = containerW > 0 ? -(dayIdx * containerW) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col gap-3 w-full"
        style={{ maxWidth: `${ORIG_H * COL_ASPECT * 1.05}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              className="text-base font-semibold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {fig.title}
            </h3>
            <p className="text-xs font-mono text-yellow-400/80 mt-0.5">
              {FUXI_DATES[dayIdx].label} · {fig.variable}
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

        {/* Image container:
             - height = min(ORIG_H, 80vh) so image is never upscaled beyond native resolution
             - width = height × COL_ASPECT (one column's aspect ratio)
             - overflow:hidden clips to exactly one column
             - img: height:100%; width:auto; max-width:none — native aspect ratio
             - margin-left pixel offset selects the correct column */}
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded border border-white/10 bg-[#f8f8f8] mx-auto w-full"
          style={{
            aspectRatio: `${COL_ASPECT} / 1`,
            maxHeight: `min(${ORIG_H}px, 80vh)`,
          }}
        >
          {containerW > 0 && (
            <img
              src={fig.src}
              alt={`${fig.title} — ${FUXI_DATES[dayIdx].label}`}
              style={{
                height: "100%",
                width: "auto",
                maxWidth: "none",
                display: "block",
                marginLeft: `${marginLeft}px`,
                transition: "margin-left 0.3s ease-in-out",
              }}
            />
          )}
          {/* Prev / Next arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrevDay(); }}
            disabled={dayIdx === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-yellow-400/20 hover:border-yellow-400/50 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="上一天"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNextDay(); }}
            disabled={dayIdx === 6}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-yellow-400/20 hover:border-yellow-400/50 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="下一天"
          >
            <ChevronRight size={20} />
          </button>
          {/* Date badge top-left */}
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="text-xs font-mono bg-yellow-400 text-black px-2 py-1 rounded font-bold shadow-lg">
              {FUXI_DATES[dayIdx].label}
            </span>
          </div>
        </div>

        {/* Day selector */}
        <div className="flex justify-center gap-1.5 flex-wrap">
          {FUXI_DATES.map((d, i) => (
            <button
              key={i}
              onClick={() => onSetDay(i)}
              className={`text-[11px] font-mono px-2.5 py-1 rounded transition-all ${
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
        <p className="text-xs text-white/60 leading-relaxed border-l-2 border-yellow-400/40 pl-3 max-h-16 overflow-y-auto">
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
