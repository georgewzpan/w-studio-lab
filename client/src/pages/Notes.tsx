/**
 * W Studio Lab — /notes 技术笔记页
 * 极简博客列表，时间线风格
 * 此处后续对接真实API：GET /api/notes/list 或读取 markdown 文件
 */
import { Link } from "wouter";
import { ChevronRight, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NOTES_MOCK } from "@/lib/mockData";

export default function Notes() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-28 pb-20">
        <div className="container max-w-2xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8 font-mono">
            <Link href="/" className="hover:text-foreground transition-colors">
              W Studio Lab
            </Link>
            <ChevronRight size={12} />
            <span className="text-primary">技术笔记</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded border border-primary/30 bg-primary/5 flex items-center justify-center text-primary">
                <FileText size={20} />
              </div>
              <span className="text-xs px-3 py-1 rounded-full font-mono bg-primary/10 text-primary border border-primary/20">
                ✅ 持续更新
              </span>
            </div>
            <h1
              className="text-4xl font-bold text-foreground mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              技术笔记
            </h1>
            <p className="text-muted-foreground">
              随笔与思考，不定期发布。看起来随意，其实不然。
            </p>
          </div>

          <div className="wsl-divider mb-10" />

          {/* Notes list — 此处后续对接真实API：GET /api/notes/list */}
          <div className="space-y-6">
            {NOTES_MOCK.map((note) => (
              <article
                key={note.id}
                className="group border-b border-border/50 pb-6 last:border-0 cursor-pointer hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center mt-1.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    <div className="w-px flex-1 bg-border/50 mt-2 min-h-[40px]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-muted-foreground/60">
                        {note.date}
                      </span>
                    </div>
                    <h2
                      className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {note.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {note.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {note.tags.map((tag) => (
                        <span key={tag} className="wsl-tag text-[10px]">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Placeholder for more notes */}
          <div className="mt-10 border border-dashed border-border rounded-lg p-8 text-center">
            <p className="text-sm text-muted-foreground/60 font-mono">
              // 更多笔记持续更新中
            </p>
            <p className="text-xs text-muted-foreground/40 mt-1">
              后续通过 markdown 文件添加内容
            </p>
          </div>

          {/* Back link */}
          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-primary/70 hover:text-primary transition-colors"
            >
              <ChevronRight size={14} className="rotate-180" />
              返回首页
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
