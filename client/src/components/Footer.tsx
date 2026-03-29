/**
 * W Studio Lab — Footer
 * 极简页脚，数据来源致谢小字注明
 */
export default function Footer() {
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
              跨领域科学计算 × AI工程应用 — 独立技术实验室
            </p>
          </div>
          <div className="text-xs text-muted-foreground space-y-1 text-right">
            <p>气象数据：NOAA GFS 公开数据 · AI推理：NVIDIA Earth-2 / Pangu-Weather</p>
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
  );
}
