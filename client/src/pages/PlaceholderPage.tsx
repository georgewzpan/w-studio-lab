/**
 * W Studio Lab — Placeholder Page Component
 * 占位页面：有标题、一句话描述和技术标签
 * 后续替换为完整页面内容
 */
import { Link } from "wouter";
import { ChevronRight, Construction, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getModuleIcon } from "@/components/ModuleIcons";

interface PlaceholderPageProps {
  moduleId: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  status: "active" | "dev";
  statusLabel: string;
  comingSoonNote?: string;
  externalLink?: string;
  externalLinkLabel?: string;
  externalLinkNote?: string;
}

export default function PlaceholderPage({
  moduleId,
  title,
  subtitle,
  description,
  tags,
  status,
  statusLabel,
  comingSoonNote,
  externalLink,
  externalLinkLabel,
  externalLinkNote,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-28 pb-20">
        <div className="container max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8 font-mono">
            <Link href="/" className="hover:text-foreground transition-colors">
              W Studio Lab
            </Link>
            <ChevronRight size={12} />
            <span className="text-primary">{title}</span>
          </div>

          {/* Icon + status */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded border border-primary/30 bg-primary/5 flex items-center justify-center text-primary">
              {getModuleIcon(moduleId, "text-primary", 28)}
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-full font-mono ${
                status === "dev"
                  ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                  : "bg-primary/10 text-primary border border-primary/20"
              }`}
            >
              {status === "dev" ? "🔄 " : "✅ "}{statusLabel}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl lg:text-5xl font-bold text-foreground mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">{subtitle}</p>

          <div className="wsl-divider mb-8" />

          {/* Description */}
          <p className="text-base text-foreground/80 leading-relaxed mb-6">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {tags.map((tag) => (
              <span key={tag} className="wsl-tag">{tag}</span>
            ))}
          </div>

          {/* External platform link */}
          {externalLink && (
            <div className="mb-8 flex flex-col gap-2">
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 w-fit"
              >
                <ExternalLink size={14} />
                {externalLinkLabel ?? "进入平台"}
              </a>
              {externalLinkNote && (
                <p className="text-xs font-mono text-muted-foreground/60">{externalLinkNote}</p>
              )}
            </div>
          )}

          {/* Coming soon note */}
          {comingSoonNote && (
            <div className="border border-yellow-500/20 bg-yellow-500/5 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <Construction size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-300/80 leading-relaxed">{comingSoonNote}</p>
              </div>
            </div>
          )}

          {/* Placeholder content area */}
          <div className="border border-dashed border-border rounded-lg p-12 text-center">
            <div className="w-16 h-16 rounded border border-border bg-muted/20 flex items-center justify-center mx-auto mb-4 text-muted-foreground/40">
              {getModuleIcon(moduleId, "text-muted-foreground/30", 32)}
            </div>
            <p className="text-sm text-muted-foreground/60 font-mono">
              // 完整页面内容开发中，敬请期待
            </p>
            <p className="text-xs text-muted-foreground/40 mt-2">
              Page content under development
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
