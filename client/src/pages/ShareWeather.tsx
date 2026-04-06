/**
 * W Studio Lab — /share/weather 独立分享展示页
 * Design: 极客暗夜 / 黑金科技风 (方案A)
 *
 * 定位：以 AI 气象为切入点，展示整体 AI 技术能力的名片式展示页
 * 无全站导航，无返回首页入口，完全独立
 *
 * 结构：
 *   ① 顶部品牌标识（一行，非导航）
 *   ② AI 气象核心展示（完整天气页内容）
 *   ③ 技术能力亮点区（4个方向）
 *   ④ 联系方式 Footer
 */
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, X, Mail, Cpu, Wind, Leaf, Building2, Code2 } from "lucide-react";
import { FUXI_FIGURES, FUXI_DATES, WEATHER_META, WeatherFigure } from "@/lib/mockData";

// Original image dimensions (7-column strip)
const ORIG_W = 4176;
const ORIG_H = 559;
const TOTAL_COLS = 7;
const COL_W = ORIG_W / TOTAL_COLS;
const COL_ASPECT = COL_W / ORIG_H;

// ─── FigureCard (identical logic to Weather.tsx) ──────────────────────────────
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
  const marginLeft = containerW > 0 ? -(dayIdx * containerW) : 0;
  return (
    <div className="wsl-card overflow-hidden group flex flex-col">
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
              transition: "margin-left 0.25s ease-in-out",
            }}
          />
        )}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors pointer-events-none" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="text-[10px] font-mono bg-black/70 text-primary px-2 py-0.5 rounded">
            点击放大
          </span>
        </div>
      </div>
      <div className="px-4 py-3 flex-1">
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {fig.explanation}
        </p>
      </div>
    </div>
  );
}

// ─── Lightbox (identical logic to Weather.tsx) ────────────────────────────────
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const [imgH, setImgH] = useState(0);
  const [colW, setColW] = useState(0);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const h = el.offsetHeight;
      if (h > 0) { setImgH(h); setColW(h * COL_ASPECT); }
    });
    ro.observe(el);
    const h = el.offsetHeight;
    if (h > 0) { setImgH(h); setColW(h * COL_ASPECT); }
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrevDay();
      if (e.key === "ArrowRight") onNextDay();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrevDay, onNextDay]);
  const marginLeft = colW > 0 ? -(dayIdx * colW) : 0;
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col gap-3"
        style={{
          width: colW > 0 ? `${colW}px` : `min(${Math.round(ORIG_H * COL_ASPECT)}px, calc(100vw - 2rem))`,
          maxWidth: "calc(100vw - 2rem)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              className="text-base font-semibold text-white leading-snug"
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
        <div
          ref={wrapRef}
          className="relative overflow-hidden rounded border border-white/10 bg-[#f8f8f8]"
          style={{
            height: `min(${ORIG_H}px, 85vh)`,
            width: colW > 0 ? `${colW}px` : `min(${ORIG_H * COL_ASPECT}px, calc(100vw - 2rem))`,
          }}
        >
          {imgH > 0 && (
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
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="text-xs font-mono bg-yellow-400 text-black px-2 py-1 rounded font-bold shadow-lg">
              {FUXI_DATES[dayIdx].label}
            </span>
          </div>
        </div>
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
        <p className="text-xs text-white/60 leading-relaxed border-l-2 border-yellow-400/40 pl-3 max-h-16 overflow-y-auto">
          {fig.explanation}
        </p>
      </div>
    </div>
  );
}

// ─── Capability card data ─────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    icon: Wind,
    title: "AI 气象预报",
    subtitle: "AI Weather Forecast",
    tags: ["FuXi / Pangu-Weather", "NVIDIA Earth-2", "GFS 初始场", "7天预报"],
    desc: "基于复旦大学 FuXi 大模型与 NVIDIA Earth-2 推理框架，实现 7 天时效、6 变量的华东区域气象预报，推理耗时约 34 分钟，预报精度接近 ECMWF 水平。",
  },
  {
    icon: Leaf,
    title: "能碳 · 新能源",
    subtitle: "Carbon & Renewable Energy",
    tags: ["双碳分析", "风光资源评估", "碳排放核算", "能源结构"],
    desc: "结合气象数据与能源模型，开展风光资源评估、碳排放核算与双碳路径分析，为新能源项目提供数据支撑。",
  },
  {
    icon: Leaf,
    title: "环境保护与监测",
    subtitle: "Environmental Monitoring",
    tags: ["AQI 实时监测", "污染物溯源", "环境数据可视化", "多站点聚合"],
    desc: "整合中国环境监测总站公开接口，实现 AQI、PM2.5、O₃ 等多污染物的实时监测与空间分布可视化，支持污染事件溯源分析。",
  },
  {
    icon: Building2,
    title: "数字城市 · GIS",
    subtitle: "Digital City & GIS",
    tags: ["WebGIS", "空间数据分析", "城市热岛", "三维可视化"],
    desc: "基于 WebGIS 技术栈，开展城市空间数据分析、热岛效应评估与三维城市建模，为城市规划与管理提供决策支持。",
  },
  {
    icon: Code2,
    title: "AI 工程能力",
    subtitle: "AI Engineering",
    tags: ["AI Coding", "全栈部署", "LLM 应用", "Cloud / Docker"],
    desc: "具备从模型推理、数据管线到前端可视化的全链路 AI 工程能力，熟练运用 AI Coding 工具加速开发，独立完成从 0 到 1 的技术产品构建与云端部署。",
  },
];

// ─── Main share page ──────────────────────────────────────────────────────────
export default function ShareWeather() {
  const [dayIdx, setDayIdx] = useState(0);
  const [lightbox, setLightbox] = useState<{ fig: WeatherFigure; dayIdx: number } | null>(null);
  const openLightbox = (fig: WeatherFigure, d: number) => setLightbox({ fig, dayIdx: d });
  const closeLightbox = () => setLightbox(null);
  const lightboxPrevDay = () =>
    setLightbox((prev) => prev && prev.dayIdx > 0 ? { ...prev, dayIdx: prev.dayIdx - 1 } : prev);
  const lightboxNextDay = () =>
    setLightbox((prev) => prev && prev.dayIdx < 6 ? { ...prev, dayIdx: prev.dayIdx + 1 } : prev);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ① Brand header — no navigation, no links */}
      <header className="border-b border-border/60 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded bg-primary flex items-center justify-center text-black font-bold text-sm flex-shrink-0"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              W
            </div>
            <div>
              <p
                className="text-sm font-bold text-foreground leading-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                W Studio Lab
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-mono tracking-wide">
                独立技术实验室 · 气候 × 城市 × AI
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[10px] font-mono text-primary/60 tracking-widest uppercase">
              AI Weather Showcase
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </header>

      {/* ② AI 气象核心展示 */}
      <div className="pt-10 pb-8 border-b border-border">
        <div className="container">
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
              <p className="text-sm text-muted-foreground mt-2 max-w-xl leading-relaxed">
                基于FuXi（伏羲，复旦大学）大模型，NVIDIA Earth-2 框架推理，
                {WEATHER_META.initTime} 起报，预报时效7天，输出6个变量。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["FuXi", "Earth-2", "7天预报", "6变量", "华东"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-1 rounded border border-border text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Date selector */}
      <div className="border-b border-border bg-muted/5">
        <div className="container py-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground font-mono mr-1">选择日期：</span>
            <button
              onClick={() => setDayIdx((prev) => Math.max(0, prev - 1))}
              disabled={dayIdx === 0}
              className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="上一天"
            >
              <ChevronLeft size={14} />
            </button>
            {FUXI_DATES.map((d, i) => (
              <button
                key={i}
                onClick={() => setDayIdx(i)}
                className={`text-xs font-mono px-3 py-1.5 rounded transition-all ${
                  i === dayIdx
                    ? "bg-primary text-black font-bold"
                    : "text-muted-foreground hover:text-foreground border border-border hover:border-primary/50"
                }`}
              >
                {d.label}
              </button>
            ))}
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

      {/* Figure grid */}
      <section className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FUXI_FIGURES.map((fig) => (
              <FigureCard key={fig.id} fig={fig} dayIdx={dayIdx} onZoom={openLightbox} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical pipeline */}
      <section className="py-12 bg-muted/5 border-t border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="wsl-divider flex-1" />
            <span className="text-xs font-mono text-primary tracking-widest uppercase px-3">
              Technical Pipeline
            </span>
            <div className="wsl-divider flex-1" />
          </div>
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
                <span key={i} className="text-primary/40 text-lg font-mono">→</span>
              ) : (
                <div key={i} className="wsl-card px-4 py-3 text-center min-w-[110px]">
                  <div className="text-xs font-mono text-primary mb-1">{item.step}</div>
                  <div className="text-sm font-semibold text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                </div>
              )
            )}
          </div>
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

      {/* ③ 技术能力亮点区 */}
      <section className="py-16 border-t border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="wsl-divider flex-1" />
            <span className="text-xs font-mono text-primary tracking-widest uppercase px-3">
              Research & Capabilities
            </span>
            <div className="wsl-divider flex-1" />
          </div>
          <p className="text-center text-sm text-muted-foreground mb-10 font-mono">
            AI 气象只是其中一个切面 · 以下是更广泛的研究与工程方向
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="wsl-card p-5 flex flex-col gap-3 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h4
                        className="text-sm font-semibold text-foreground leading-snug"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {cap.title}
                      </h4>
                      <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                        {cap.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {cap.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted/30 border border-border/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ④ Footer with contact */}
      <footer className="border-t border-border mt-4">
        <div className="container py-8">
          <div className="wsl-divider mb-6" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p
                className="text-sm font-semibold text-foreground"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                W Studio Lab
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                跨领域科学计算 × AI工程应用 — 独立技术实验室
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                气候 × 城市 × AI · 用数据理解蓝星，用技术服务城市
              </p>
            </div>
            {/* Contact */}
            <div className="flex flex-col gap-2">
              <p
                className="text-sm font-semibold text-foreground"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Wenzhuo Pan
              </p>
              <a
                href="mailto:wenzhuopan26@gmail.com"
                className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors font-mono"
              >
                <Mail size={12} />
                wenzhuopan26@gmail.com
              </a>
            </div>
            <div className="text-xs text-muted-foreground space-y-1 text-right">
              <p>气象数据：NOAA GFS 公开数据 · AI推理：NVIDIA Earth-2 / FuXi</p>
              <p>环境数据：中国环境监测总站公开接口</p>
              <p>城市数据致谢：SJTU-IRCAHC</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
            <p className="text-xs text-muted-foreground/60">
              © 2026 W Studio Lab · 工具换了，但一直在研究同一件事
            </p>
            <p className="text-xs font-mono text-muted-foreground/40">
              v0.1.0-mvp
            </p>
          </div>
        </div>
      </footer>

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
    </div>
  );
}
